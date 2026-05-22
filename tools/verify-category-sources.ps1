$ErrorActionPreference = 'Continue'

$root = Split-Path -Parent $PSScriptRoot
$widgetDir = Join-Path $root 'widgets'
$reportFile = Join-Path $root 'category-verification-report.json'
$headers = @{
  'User-Agent'='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  'Accept'='text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
  'Accept-Language'='en-US,en;q=0.9'
}

$nodeScript = @'
const fs=require("fs");
const path=require("path");
const {extractWidgetMetadata}=require("./ForwardWidgetSource");
const widgets=fs.readdirSync("./widgets").filter(f=>f.endsWith(".js")).sort();
const out=[];
for(const file of widgets){
  const content=fs.readFileSync(path.join("./widgets",file),"utf8");
  const {metadata}=extractWidgetMetadata(content,{filename:file});
  const cat=metadata.modules.find(m=>m.id==="category-videos");
  if(!cat) continue;
  const preset=cat.params.find(p=>p.name==="categoryPreset" || p.name==="typePreset");
  out.push({
    file,
    title: metadata.title,
    version: metadata.version,
    options: preset ? preset.enumOptions : []
  });
}
console.log(JSON.stringify(out));
'@
$metadata = $nodeScript | node - | ConvertFrom-Json

function Read-SiteConfig {
  param([string]$fileName)
  $script = @"
const fs=require('fs');
const vm=require('vm');
const content=fs.readFileSync('./widgets/$fileName','utf8');
console.log(JSON.stringify(vm.runInNewContext(content + '\nSITE;', {console})));
"@
  return ($script | node - | ConvertFrom-Json)
}

function Normalize-Url {
  param([string]$value, [string]$baseUrl, [int]$page)
  $raw = [string]$value
  if ($raw -match '^(?i:https?://)') { $url = $raw } elseif ($raw.StartsWith('/')) { $url = $baseUrl.TrimEnd('/') + $raw } else { $url = $baseUrl.TrimEnd('/') + '/' + $raw.TrimStart('/') }
  if ($page -le 1 -or $url -match '[?&]page=') { return $url }
  if ($url.Contains('?')) { return $url + '&page=' + $page }
  return $url + '?page=' + $page
}

function Count-VideoCandidates {
  param([string]$html, [object]$site)
  $count = 0
  $seen = @{}
  foreach ($m in [regex]::Matches($html, '<a\b(?<attrs>[^>]*)>(?<body>.*?)</a>', 'IgnoreCase,Singleline')) {
    $attrs = $m.Groups['attrs'].Value
    $href = ''
    $m1 = [regex]::Match($attrs, 'href\s*=\s*"([^"]*)"', 'IgnoreCase')
    if ($m1.Success) { $href = $m1.Groups[1].Value }
    if (-not $href) {
      $m2 = [regex]::Match($attrs, "href\s*=\s*'([^']*)'", 'IgnoreCase')
      if ($m2.Success) { $href = $m2.Groups[1].Value }
    }
    if (-not $href) { continue }
    if ($href.StartsWith('//')) { $href = 'https:' + $href }
    elseif ($href.StartsWith('/')) { $href = $site.baseUrl.TrimEnd('/') + $href }
    elseif ($href -notmatch '^(?i:https?://)') { $href = $site.baseUrl.TrimEnd('/') + '/' + $href.TrimStart('/') }
    if ($seen.ContainsKey($href)) { continue }
    $matched = $false
    foreach ($keyword in $site.videoPathKeywords) {
      if ($href.ToLowerInvariant().Contains([string]$keyword.ToLowerInvariant())) { $matched = $true; break }
    }
    if (-not $matched -and $site.numericVideoPaths -and $href -match '^https?://[^/]+/\d+(?:[/?#]|$)') { $matched = $true }
    if ($matched) {
      $seen[$href] = $true
      $count++
    }
  }
  return $count
}

$reports = New-Object System.Collections.Generic.List[object]
foreach ($item in $metadata) {
  $report = [ordered]@{
    file = $item.file
    title = $item.title
    version = $item.version
    totalCategories = @($item.options).Count
    checked = @()
    status = 'ok'
  }

  if ($item.file -eq 'vod.js') {
    foreach ($opt in @($item.options | Select-Object -First 3)) {
      try {
        $url = 'https://91md.me/api.php/provide/vod?ac=detail&out=json&t=' + $opt.value + '&pg=1'
        $response = Invoke-WebRequest -Uri $url -Headers $headers -UseBasicParsing -TimeoutSec 20
        $json = $response.Content | ConvertFrom-Json
        $list = @($json.list)
        $report.checked += [pscustomobject]@{
          title = $opt.title
          value = $opt.value
          status = $response.StatusCode
          videoCount = $list.Count
        }
      } catch {
        $report.checked += [pscustomobject]@{
          title = $opt.title
          value = $opt.value
          status = 'error'
          error = $_.Exception.Message
        }
      }
    }
  } else {
    $site = Read-SiteConfig -fileName $item.file
    foreach ($opt in @($item.options | Select-Object -First 3)) {
      try {
        $url = Normalize-Url -value ([string]$opt.value) -baseUrl ([string]$site.baseUrl) -page 1
        $response = Invoke-WebRequest -Uri $url -Headers $headers -UseBasicParsing -TimeoutSec 20 -MaximumRedirection 5
        $videoCount = Count-VideoCandidates -html $response.Content -site $site
        $report.checked += [pscustomobject]@{
          title = $opt.title
          value = $opt.value
          status = $response.StatusCode
          videoCount = $videoCount
        }
      } catch {
        $report.checked += [pscustomobject]@{
          title = $opt.title
          value = $opt.value
          status = 'error'
          error = $_.Exception.Message
        }
      }
    }
  }

  if (-not (@($report.checked | Where-Object { $_.videoCount -gt 0 }).Count)) {
    $report.status = 'blocked'
  }
  $reports.Add([pscustomobject]$report)
  $okCount = @($report.checked | Where-Object { $_.videoCount -gt 0 }).Count
  Write-Output "$($item.title): $okCount/$(@($report.checked).Count) ok"
}

$reports | ConvertTo-Json -Depth 6 | Set-Content -Encoding UTF8 $reportFile
Write-Output "wrote $reportFile"

$ErrorActionPreference = 'Continue'

$root = Split-Path -Parent $PSScriptRoot
$widgetDir = Join-Path $root 'widgets'
$outFile = Join-Path $root 'category-options-scan.json'

$headers = @{
  'User-Agent'='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  'Accept'='text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
  'Accept-Language'='en-US,en;q=0.9'
}

$sites = @(
  @{ file='91porn.js'; key='91porn'; baseUrl='https://91porn.com'; mode='manual'; options=@(
      @{ title='Latest'; value='/v.php' },
      @{ title='Refined'; value='/v.php?category=rf' },
      @{ title='Hot'; value='/v.php?category=hot' },
      @{ title='Long'; value='/v.php?category=long' },
      @{ title='Monthly Hot'; value='/v.php?category=md' }
    )},
  @{ file='jable.js'; key='jable'; baseUrl='https://jable.tv'; mode='html'; url='https://jable.tv/categories/'; patterns=@('^/categories/','^/tags/','^/models/','^/latest-updates/') },
  @{ file='javday.js'; key='javday'; baseUrl='https://javday.tv'; mode='html'; url='https://javday.tv/'; patterns=@('^/label/','^/category/') },
  @{ file='javrate.js'; key='javrate'; baseUrl='https://javrate.com'; mode='manual'; options=@(
      @{ title='Home'; value='/' },
      @{ title='Censored'; value='/category/censored/' },
      @{ title='Uncensored'; value='/category/uncensored/' },
      @{ title='JAV'; value='/jav/' },
      @{ title='Movie'; value='/movie/' },
      @{ title='Latest'; value='/?orderby=date' }
    )},
  @{ file='pornhub.js'; key='pornhub'; baseUrl='https://www.pornhub.com'; mode='html'; url='https://www.pornhub.com/categories'; patterns=@('^/categories/','^/channels/'); prepend=@(
      @{ title='Recommended'; value='/recommended' },
      @{ title='Categories'; value='/categories' },
      @{ title='Channels'; value='/channels' }
    )},
  @{ file='redtube.js'; key='redtube'; baseUrl='https://www.redtube.com'; mode='html'; url='https://www.redtube.com/categories?cc=jp'; patterns=@('^/redtube/','^/channels?/'); prepend=@(
      @{ title='Newest'; value='/newest' },
      @{ title='All Categories'; value='/categories?cc=jp' }
    )},
  @{ file='spankbang.js'; key='spankbang'; baseUrl='https://spankbang.com'; mode='manual'; options=@(
      @{ title='Latest'; value='/new_videos/' },
      @{ title='Popular'; value='/s/popular/' },
      @{ title='Amateur'; value='/category/amateur/' },
      @{ title='Anal'; value='/category/anal/' },
      @{ title='Asian'; value='/category/asian/' },
      @{ title='Big Tits'; value='/category/big-tits/' },
      @{ title='Blowjob'; value='/category/blowjob/' },
      @{ title='Creampie'; value='/category/creampie/' },
      @{ title='Hentai'; value='/category/hentai/' },
      @{ title='MILF'; value='/category/milf/' },
      @{ title='POV'; value='/category/pov/' },
      @{ title='Teen'; value='/category/teen/' }
    )},
  @{ file='tube8.js'; key='tube8'; baseUrl='https://www.tube8.com'; mode='html'; url='https://www.tube8.com/categories.html'; patterns=@('^/cat/'); prepend=@(
      @{ title='Newest'; value='/newest.html' },
      @{ title='All Categories'; value='/categories.html' }
    )},
  @{ file='xhamster.js'; key='xhamster'; baseUrl='https://xhamster.com'; mode='manual'; options=@(
      @{ title='Newest'; value='/newest' },
      @{ title='All Categories'; value='/categories' },
      @{ title='Amateur'; value='/categories/amateur' },
      @{ title='Anal'; value='/categories/anal' },
      @{ title='Asian'; value='/categories/asian' },
      @{ title='BBW'; value='/categories/bbw' },
      @{ title='Big Tits'; value='/categories/big-tits' },
      @{ title='Blowjob'; value='/categories/blowjob' },
      @{ title='Creampie'; value='/categories/creampie' },
      @{ title='Hentai'; value='/categories/hentai' },
      @{ title='Interracial'; value='/categories/interracial' },
      @{ title='Lesbian'; value='/categories/lesbian' },
      @{ title='MILF'; value='/categories/milf' },
      @{ title='POV'; value='/categories/pov' },
      @{ title='Teen'; value='/categories/teen' }
    )},
  @{ file='xvideos.js'; key='xvideos'; baseUrl='https://www.xvideos.com'; mode='html'; url='https://www.xvideos.com/tags'; patterns=@('^/c/'); prepend=@(
      @{ title='Newest'; value='/new' },
      @{ title='Best'; value='/best' },
      @{ title='Tags'; value='/tags' },
      @{ title='Channels'; value='/channels-index' },
      @{ title='Pornstars'; value='/pornstars-index' }
    )},
  @{ file='youporn.js'; key='youporn'; baseUrl='https://www.youporn.com'; mode='html'; url='https://www.youporn.com/categories/'; patterns=@('^/category/'); prepend=@(
      @{ title='Newest'; value='/browse/time/' },
      @{ title='All Categories'; value='/categories/' }
    )},
  @{ file='vod.js'; key='vod'; baseUrl='https://91md.me'; mode='vod' }
)

function Clean([string]$value) {
  return (($value -replace '(?is)<script.*?</script>',' ' -replace '(?is)<style.*?</style>',' ' -replace '(?is)<[^>]+>',' ' -replace '\s+',' ').Trim())
}

function Add-UniqueOption {
  param(
    [System.Collections.Generic.List[object]]$List,
    [hashtable]$Seen,
    [string]$Title,
    [string]$Value
  )
  if ([string]::IsNullOrWhiteSpace($Title) -or [string]::IsNullOrWhiteSpace($Value)) { return }
  if ($Seen.ContainsKey($Value)) { return }
  $Seen[$Value] = $true
  $List.Add([pscustomobject]@{ title=$Title.Trim(); value=$Value.Trim() })
}

$result = New-Object System.Collections.Generic.List[object]

foreach ($site in $sites) {
  $items = New-Object 'System.Collections.Generic.List[object]'
  $seen = @{}

  if ($site.prepend) {
    foreach ($option in $site.prepend) {
      Add-UniqueOption -List $items -Seen $seen -Title $option.title -Value $option.value
    }
  }

  if ($site.mode -eq 'manual') {
    foreach ($option in $site.options) {
      Add-UniqueOption -List $items -Seen $seen -Title $option.title -Value $option.value
    }
  } elseif ($site.mode -eq 'vod') {
    try {
      $response = Invoke-WebRequest -Uri 'https://91md.me/api.php/provide/vod?ac=list&out=json' -Headers $headers -UseBasicParsing -TimeoutSec 25
      $json = $response.Content | ConvertFrom-Json
      $classes = @($json.class)
      if ($classes.Count -eq 0 -and $json.list) {
        $classes = @($json.list | Group-Object type_id | ForEach-Object { $_.Group[0] })
      }
      foreach ($item in $classes) {
        Add-UniqueOption -List $items -Seen $seen -Title ([string]$item.type_name) -Value ([string]$item.type_id)
      }
    } catch {
      Write-Output "vod ERR $($_.Exception.Message)"
    }
  } else {
    try {
      $response = Invoke-WebRequest -Uri $site.url -Headers $headers -UseBasicParsing -TimeoutSec 25 -MaximumRedirection 5
      $matches = [regex]::Matches($response.Content, '<a\b(?<attrs>[^>]*)>(?<body>.*?)</a>', 'IgnoreCase,Singleline')
      foreach ($m in $matches) {
        $attrs = $m.Groups['attrs'].Value
        $body = $m.Groups['body'].Value
        $href = ''
        $m1 = [regex]::Match($attrs, 'href\s*=\s*"([^"]*)"', 'IgnoreCase')
        if ($m1.Success) { $href = $m1.Groups[1].Value }
        if (-not $href) {
          $m2 = [regex]::Match($attrs, "href\s*=\s*'([^']*)'", 'IgnoreCase')
          if ($m2.Success) { $href = $m2.Groups[1].Value }
        }
        if (-not $href) { continue }
        $relative = $href
        if ($relative.StartsWith($site.baseUrl)) {
          $relative = $relative.Substring($site.baseUrl.Length)
        }
        $matched = $false
        foreach ($pattern in $site.patterns) {
          if ($relative -match $pattern) { $matched = $true; break }
        }
        if (-not $matched) { continue }
        $title = Clean $body
        if (-not $title) {
          $m3 = [regex]::Match($attrs, 'title\s*=\s*"([^"]*)"', 'IgnoreCase')
          if ($m3.Success) { $title = $m3.Groups[1].Value }
        }
        if ($title -match '\b\d[\d,]*\s+Videos?\b') {
          $title = ($title -replace '\b\d[\d,]*\s+Videos?\b', '').Trim()
        }
        if ($title.Length -gt 60) { continue }
        Add-UniqueOption -List $items -Seen $seen -Title $title -Value $relative
      }
    } catch {
      Write-Output "$($site.key) ERR $($_.Exception.Message)"
      if ($site.options) {
        foreach ($option in $site.options) {
          Add-UniqueOption -List $items -Seen $seen -Title $option.title -Value $option.value
        }
      }
    }
  }

  $result.Add([pscustomobject]@{
    file = $site.file
    options = @($items.ToArray())
  })
  Write-Output "$($site.file): $($items.Count)"
}

$result | ConvertTo-Json -Depth 6 | Set-Content -Encoding UTF8 $outFile
Write-Output "wrote $outFile"

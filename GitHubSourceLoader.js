const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { buildHeaders, delay } = require('./utils');
const platformRegistry = require('./platformRegistry');

const DEFAULT_TIMEOUT = 30000;
const SOURCE_SCHEMA_VERSION = 1;
const MANIFEST_SCHEMA_VERSION = 1;

function isHttpUrl(value) {
  return typeof value === 'string' && /^https?:\/\//i.test(value);
}

function buildGitHubRawUrl(ref) {
  if (!ref || !ref.owner || !ref.repo || !ref.path) {
    throw new Error('GitHub source ref must include owner, repo and path');
  }

  const branch = ref.branch || 'main';
  return `https://raw.githubusercontent.com/${ref.owner}/${ref.repo}/${branch}/${ref.path}`;
}

function encodeTemplateValue(value) {
  if (value === undefined || value === null) {
    return '';
  }

  return encodeURIComponent(String(value));
}

function fillTemplate(template, values) {
  return String(template || '').replace(/\{(\w+)\}/g, (_, key) => encodeTemplateValue(values[key]));
}

function normalizeTimeout(config) {
  if (config && Number.isFinite(config.timeout)) {
    return config.timeout;
  }

  return DEFAULT_TIMEOUT;
}

async function loadText(resource, requestConfig = {}) {
  if (isHttpUrl(resource)) {
    const response = await axios.get(resource, {
      timeout: normalizeTimeout(requestConfig),
      headers: buildHeaders(requestConfig.headers || {})
    });
    return response.data;
  }

  return fs.readFileSync(resource, 'utf8');
}

async function loadJson(resource, requestConfig = {}) {
  const raw = await loadText(resource, requestConfig);
  return typeof raw === 'string' ? JSON.parse(raw) : raw;
}

function resolveBaseContext(resource) {
  if (isHttpUrl(resource)) {
    return {
      type: 'http',
      base: resource.endsWith('/') ? resource : resource.slice(0, resource.lastIndexOf('/') + 1)
    };
  }

  return {
    type: 'file',
    base: path.dirname(path.resolve(resource))
  };
}

function resolveChildResource(reference, baseContext) {
  if (reference.rawUrl) {
    return reference.rawUrl;
  }

  if (reference.github) {
    return buildGitHubRawUrl(reference.github);
  }

  if (!reference.path) {
    throw new Error(`Source "${reference.name || 'unknown'}" is missing path/rawUrl/github`);
  }

  if (baseContext.type === 'http') {
    return new URL(reference.path, baseContext.base).toString();
  }

  return path.resolve(baseContext.base, reference.path);
}

function validateManifest(manifest) {
  if (!manifest || typeof manifest !== 'object') {
    throw new Error('Manifest must be an object');
  }

  if ((manifest.version || MANIFEST_SCHEMA_VERSION) !== MANIFEST_SCHEMA_VERSION) {
    throw new Error(`Unsupported manifest version: ${manifest.version}`);
  }

  if (!Array.isArray(manifest.sources) || manifest.sources.length === 0) {
    throw new Error('Manifest must contain a non-empty sources array');
  }
}

function validateSourceConfig(config) {
  if (!config || typeof config !== 'object') {
    throw new Error('Source config must be an object');
  }

  if ((config.version || SOURCE_SCHEMA_VERSION) !== SOURCE_SCHEMA_VERSION) {
    throw new Error(`Unsupported source config version: ${config.version}`);
  }

  if (!config.name || typeof config.name !== 'string') {
    throw new Error('Source config must define a name');
  }

  if (!config.baseUrl || typeof config.baseUrl !== 'string') {
    throw new Error(`Source "${config.name}" must define baseUrl`);
  }

  const sections = ['search', 'extractVideo', 'getVideoInfo'];
  for (const sectionName of sections) {
    if (!config[sectionName] || typeof config[sectionName] !== 'object') {
      throw new Error(`Source "${config.name}" must define ${sectionName}`);
    }
  }

  if (!config.search.itemSelector || !config.search.fields) {
    throw new Error(`Source "${config.name}" search config must include itemSelector and fields`);
  }
}

function absolutizeUrl(baseUrl, value) {
  if (!value || typeof value !== 'string') {
    return value || '';
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return new URL(value, baseUrl).toString();
}

function applyRegex(value, rule) {
  if (!rule.regex || typeof value !== 'string') {
    return value;
  }

  const matcher = new RegExp(rule.regex, rule.flags || '');
  const match = value.match(matcher);
  if (!match) {
    return '';
  }

  const groupIndex = Number.isInteger(rule.group) ? rule.group : 1;
  return match[groupIndex] || '';
}

function finalizeValue(value, rule, baseUrl) {
  let nextValue = value;

  if (typeof nextValue === 'string' && rule.trim !== false) {
    nextValue = nextValue.trim();
  }

  nextValue = applyRegex(nextValue, rule);

  if (rule.decodeURIComponent && typeof nextValue === 'string') {
    nextValue = decodeURIComponent(nextValue);
  }

  if (rule.absolute) {
    nextValue = absolutizeUrl(baseUrl, nextValue);
  }

  if ((nextValue === undefined || nextValue === null || nextValue === '') && rule.default !== undefined) {
    nextValue = rule.default;
  }

  return nextValue;
}

function getScope($, root, selector) {
  if (!selector) {
    return root || $.root();
  }

  if (!root) {
    return $(selector);
  }

  return root.find(selector);
}

function extractFromScript($, rule, baseUrl) {
  const scripts = $('script').toArray();
  for (const script of scripts) {
    const content = $(script).html() || '';
    if (rule.contains && !content.includes(rule.contains)) {
      continue;
    }

    const nextValue = finalizeValue(content, rule, baseUrl);
    if (nextValue) {
      return nextValue;
    }
  }

  return rule.default !== undefined ? rule.default : '';
}

function extractRuleValue($, rule, baseUrl, root = null) {
  if (!rule) {
    return '';
  }

  if (rule.constant !== undefined) {
    return rule.constant;
  }

  if (rule.script) {
    return extractFromScript($, rule.script, baseUrl);
  }

  const collection = getScope($, root, rule.selector);
  if (!collection || collection.length === 0) {
    return rule.default !== undefined ? rule.default : rule.list ? [] : '';
  }

  if (rule.list) {
    const listValues = collection
      .map((_, element) => {
        const node = $(element);
        const rawValue = rule.attr ? node.attr(rule.attr) : node.text();
        return finalizeValue(rawValue, rule, baseUrl);
      })
      .get()
      .filter((value) => value !== '');
    return listValues;
  }

  const index = Number.isInteger(rule.index) ? rule.index : 0;
  const target = collection.eq(index);
  const rawValue = rule.attr ? target.attr(rule.attr) : rule.html ? target.html() : target.text();
  return finalizeValue(rawValue, rule, baseUrl);
}

function collectFields($, fields, baseUrl, root = null) {
  return Object.entries(fields).reduce((result, [fieldName, rule]) => {
    result[fieldName] = extractRuleValue($, rule, baseUrl, root);
    return result;
  }, {});
}

function buildRequestConfig(config, overrideHeaders) {
  return {
    timeout: normalizeTimeout(config.request),
    headers: buildHeaders({
      ...(config.request && config.request.headers ? config.request.headers : {}),
      ...(overrideHeaders || {})
    })
  };
}

async function applyConfiguredDelay(config) {
  if (!config.request || config.request.delayMs === undefined) {
    return;
  }

  if (Array.isArray(config.request.delayMs) && config.request.delayMs.length === 2) {
    const min = Number(config.request.delayMs[0]) || 0;
    const max = Number(config.request.delayMs[1]) || min;
    const duration = min + Math.random() * Math.max(0, max - min);
    await delay(duration);
    return;
  }

  await delay(Number(config.request.delayMs) || 0);
}

function buildUrl(baseUrl, endpointConfig, values) {
  const template = endpointConfig.url || endpointConfig.path;
  if (!template) {
    throw new Error('Endpoint config must define url or path');
  }

  return new URL(fillTemplate(template, values), baseUrl).toString();
}

function createPlatformFromConfig(config) {
  validateSourceConfig(config);

  const baseUrl = config.baseUrl;
  const platformName = config.name;

  async function fetchPage(url, overrideHeaders) {
    await applyConfiguredDelay(config);
    const response = await axios.get(url, buildRequestConfig(config, overrideHeaders));
    return cheerio.load(response.data);
  }

  async function search(keyword, options = {}) {
    const page = options.page || 1;
    const requestUrl = buildUrl(baseUrl, config.search, {
      keyword,
      page,
      ...options
    });
    const $ = await fetchPage(requestUrl, options.headers);

    const results = [];
    $(config.search.itemSelector).each((_, element) => {
      const root = $(element);
      const item = collectFields($, config.search.fields, baseUrl, root);
      results.push({
        ...item,
        url: item.url ? absolutizeUrl(baseUrl, item.url) : '',
        platform: platformName
      });
    });

    return results.filter((item) => item.title || item.url);
  }

  async function extractVideo(url, options = {}) {
    const $ = await fetchPage(url, options.headers);
    const item = collectFields($, config.extractVideo.fields, baseUrl);
    return {
      ...item,
      url: item.url ? absolutizeUrl(baseUrl, item.url) : '',
      platform: platformName,
      originalUrl: url
    };
  }

  async function getVideoInfo(url, options = {}) {
    const $ = await fetchPage(url, options.headers);
    return {
      ...collectFields($, config.getVideoInfo.fields, baseUrl),
      platform: platformName,
      originalUrl: url
    };
  }

  function match(url) {
    if (config.match && Array.isArray(config.match.domains)) {
      return config.match.domains.some((domain) => url.includes(domain));
    }

    return url.startsWith(baseUrl);
  }

  return {
    name: platformName,
    baseUrl,
    match,
    search,
    extractVideo,
    getVideoInfo
  };
}

async function readManifestReference(manifestRef, requestConfig = {}) {
  if (typeof manifestRef === 'string') {
    return {
      manifest: await loadJson(manifestRef, requestConfig),
      baseContext: resolveBaseContext(manifestRef)
    };
  }

  if (manifestRef && manifestRef.sources) {
    return {
      manifest: manifestRef,
      baseContext: null
    };
  }

  if (manifestRef && manifestRef.owner && manifestRef.repo && manifestRef.path) {
    const resource = buildGitHubRawUrl(manifestRef);
    return {
      manifest: await loadJson(resource, requestConfig),
      baseContext: resolveBaseContext(resource)
    };
  }

  throw new Error('Unsupported manifest reference');
}

async function loadSourceManifest(manifestRef, options = {}) {
  const { manifest, baseContext } = await readManifestReference(manifestRef, options.request);
  validateManifest(manifest);

  const sources = [];
  for (const sourceRef of manifest.sources) {
    const sourceConfig = sourceRef.config
      ? sourceRef.config
      : await loadJson(resolveChildResource(sourceRef, baseContext), options.request);
    validateSourceConfig(sourceConfig);
    sources.push({
      name: sourceConfig.name,
      config: sourceConfig,
      platform: createPlatformFromConfig(sourceConfig)
    });
  }

  return { manifest, sources };
}

async function registerSourcesFromManifest(manifestRef, options = {}) {
  const { sources } = await loadSourceManifest(manifestRef, options);
  const overwrite = options.overwrite !== false;

  sources.forEach(({ name, platform }) => {
    platformRegistry.registerPlatform(name, platform, { overwrite });
  });

  return sources.map((source) => source.name);
}

module.exports = {
  SOURCE_SCHEMA_VERSION,
  MANIFEST_SCHEMA_VERSION,
  buildGitHubRawUrl,
  createPlatformFromConfig,
  loadSourceManifest,
  registerSourcesFromManifest,
  validateSourceConfig,
  validateManifest
};

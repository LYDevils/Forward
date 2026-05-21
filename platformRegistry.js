const builtInPlatforms = {
  '91porn': require('./platforms/91porn'),
  'pornhub': require('./platforms/pornhub'),
  'javday': require('./platforms/javday'),
  'javrate': require('./platforms/javrate'),
  'jable': require('./platforms/jable'),
  'xvideos': require('./platforms/xvideos'),
  'youporn': require('./platforms/prdcast')
};

const builtInPlatformMeta = {
  '91porn': { baseUrl: 'https://91porn.com' },
  'pornhub': { baseUrl: 'https://www.pornhub.com' },
  'javday': { baseUrl: 'https://www.javlibrary.com' },
  'javrate': { baseUrl: 'https://javrate.com' },
  'jable': { baseUrl: 'https://jable.tv' },
  'xvideos': { baseUrl: 'https://www.xvideos.com' },
  'youporn': { baseUrl: 'https://www.youporn.com' }
};

const REQUIRED_METHODS = ['extractVideo', 'search', 'getVideoInfo'];
const registry = new Map();

function validatePlatform(name, platform) {
  if (!platform || typeof platform !== 'object') {
    throw new Error(`Platform "${name}" must be an object`);
  }

  const missingMethods = REQUIRED_METHODS.filter((methodName) => typeof platform[methodName] !== 'function');
  if (missingMethods.length > 0) {
    throw new Error(
      `Platform "${name}" is missing required methods: ${missingMethods.join(', ')}`
    );
  }

  const platformBaseUrl = platform.baseUrl || (builtInPlatformMeta[name] && builtInPlatformMeta[name].baseUrl) || '';

  return {
    ...platform,
    name: platform.name || name,
    baseUrl: platformBaseUrl,
    match: platform.match || ((url) => Boolean(platformBaseUrl) && url.startsWith(platformBaseUrl))
  };
}

function registerPlatform(name, platform, options = {}) {
  const { overwrite = false } = options;
  if (!overwrite && registry.has(name)) {
    throw new Error(`Platform "${name}" is already registered`);
  }

  const normalizedPlatform = validatePlatform(name, platform);
  registry.set(name, normalizedPlatform);
  return normalizedPlatform;
}

function registerPlatforms(platformMap, options = {}) {
  return Object.entries(platformMap).reduce((registered, [name, platform]) => {
    registered[name] = registerPlatform(name, platform, options);
    return registered;
  }, {});
}

function unregisterPlatform(name) {
  return registry.delete(name);
}

function getPlatform(name) {
  return registry.get(name) || null;
}

function getPlatforms() {
  return Object.fromEntries(registry.entries());
}

function getSupportedPlatforms() {
  return Array.from(registry.keys());
}

function findPlatformByUrl(url) {
  for (const [name, platform] of registry.entries()) {
    if (typeof platform.match === 'function' && platform.match(url)) {
      return { name, platform };
    }

    if (typeof platform.baseUrl === 'string' && url.startsWith(platform.baseUrl)) {
      return { name, platform };
    }
  }

  return null;
}

function resetRegistry() {
  registry.clear();
  registerPlatforms(builtInPlatforms, { overwrite: true });
}

resetRegistry();

module.exports = {
  builtInPlatforms,
  registerPlatform,
  registerPlatforms,
  unregisterPlatform,
  getPlatform,
  getPlatforms,
  getSupportedPlatforms,
  findPlatformByUrl,
  resetRegistry
};

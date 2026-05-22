const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DEFAULT_WIDGET_ORDER = [
  'lydevils.jable',
  'lydevils.91porn',
  'lydevils.pornhub',
  'lydevils.javday',
  'lydevils.javrate',
  'lydevils.xvideos',
  'lydevils.redtube',
  'lydevils.youporn',
  'lydevils.spankbang',
  'lydevils.xhamster',
  'lydevils.tube8',
  'lydevils.vod',
  'lydevils.vodmax',
  'lydevils.podcast',
  'lydevils.live-tv',
  'lydevils.tv-stations'
];

function isHttpUrl(value) {
  return typeof value === 'string' && /^https?:\/\//i.test(value);
}

async function loadText(resource) {
  if (isHttpUrl(resource)) {
    if (typeof fetch !== 'function') {
      throw new Error('Global fetch is not available in this Node runtime');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    let response;
    try {
      response = await fetch(resource, { signal: controller.signal });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      throw new Error(`Failed to load ${resource}: ${response.status} ${response.statusText}`);
    }

    return response.text();
  }

  return fs.readFileSync(resource, 'utf8');
}

async function loadJson(resource) {
  const content = await loadText(resource);
  return typeof content === 'string' ? JSON.parse(content) : content;
}

function validateSourceIndex(index) {
  if (!index || typeof index !== 'object') {
    throw new Error('Source index must be an object');
  }

  if (!index.title || typeof index.title !== 'string') {
    throw new Error('Source index must include title');
  }

  if (!Array.isArray(index.widgets)) {
    throw new Error('Source index must include widgets array');
  }

  index.widgets.forEach((widget, indexValue) => {
    const requiredFields = ['id', 'title', 'version', 'requiredVersion', 'author', 'url'];
    const missingFields = requiredFields.filter((fieldName) => !widget[fieldName]);
    if (missingFields.length > 0) {
      throw new Error(
        `Widget entry at index ${indexValue} is missing fields: ${missingFields.join(', ')}`
      );
    }
  });

  return index;
}

function validateWidgetMetadata(metadata) {
  if (!metadata || typeof metadata !== 'object') {
    throw new Error('WidgetMetadata must be an object');
  }

  const requiredFields = ['id', 'title', 'version', 'requiredVersion', 'modules'];
  const missingFields = requiredFields.filter((fieldName) => !metadata[fieldName]);
  if (missingFields.length > 0) {
    throw new Error(`WidgetMetadata is missing fields: ${missingFields.join(', ')}`);
  }

  if (!Array.isArray(metadata.modules)) {
    throw new Error('WidgetMetadata.modules must be an array');
  }

  metadata.modules.forEach((moduleItem, moduleIndex) => {
    if (!moduleItem.id || !moduleItem.functionName || !moduleItem.title) {
      throw new Error(`WidgetMetadata.modules[${moduleIndex}] must include id, title and functionName`);
    }
  });

  return metadata;
}

function createSandbox() {
  const sandbox = {
    console,
    module: { exports: {} },
    exports: {},
    require() {
      throw new Error('require is disabled while parsing WidgetMetadata');
    },
    Widget: {
      http: {
        get() {
          throw new Error('Widget.http.get is not available while parsing WidgetMetadata');
        },
        post() {
          throw new Error('Widget.http.post is not available while parsing WidgetMetadata');
        }
      },
      html: {
        load() {
          throw new Error('Widget.html.load is not available while parsing WidgetMetadata');
        }
      },
      dom: {
        parse() {
          throw new Error('Widget.dom.parse is not available while parsing WidgetMetadata');
        },
        select() {
          throw new Error('Widget.dom.select is not available while parsing WidgetMetadata');
        }
      },
      storage: {
        get() {
          return null;
        },
        set() {
          return null;
        }
      }
    }
  };

  let capturedMetadata = null;
  Object.defineProperty(sandbox, 'WidgetMetadata', {
    configurable: true,
    enumerable: true,
    get() {
      return capturedMetadata;
    },
    set(value) {
      capturedMetadata = value;
    }
  });

  return {
    sandbox,
    getCapturedMetadata() {
      return capturedMetadata;
    }
  };
}

function extractWidgetMetadata(scriptContent, options = {}) {
  const normalizedContent = String(scriptContent || '');
  if (normalizedContent.trim().startsWith('FWENC1')) {
    return {
      encrypted: true,
      metadata: null
    };
  }

  const { sandbox, getCapturedMetadata } = createSandbox();
  vm.runInNewContext(normalizedContent, sandbox, {
    timeout: options.timeout || 1000,
    filename: options.filename || 'widget.js'
  });

  const metadata = getCapturedMetadata();
  if (!metadata) {
    throw new Error(`No WidgetMetadata found in ${options.filename || 'widget.js'}`);
  }

  return {
    encrypted: false,
    metadata: validateWidgetMetadata(metadata)
  };
}

async function loadSourceIndex(resource) {
  return validateSourceIndex(await loadJson(resource));
}

async function loadWidgetScript(resource) {
  const content = await loadText(resource);
  return {
    resource,
    content: typeof content === 'string' ? content : String(content)
  };
}

async function inspectWidget(resource) {
  const { content } = await loadWidgetScript(resource);
  const inspection = extractWidgetMetadata(content, { filename: resource });
  return {
    resource,
    ...inspection
  };
}

async function buildWidgetEntryFromFile(filePath, options = {}) {
  const scriptContent = fs.readFileSync(filePath, 'utf8');
  const inspection = extractWidgetMetadata(scriptContent, { filename: filePath });
  if (inspection.encrypted) {
    throw new Error(`Cannot generate widget entry from encrypted file: ${filePath}`);
  }

  const metadata = inspection.metadata;
  const fileName = path.basename(filePath);
  const baseScriptUrl = String(options.baseScriptUrl || '').replace(/\/$/, '');
  if (!baseScriptUrl) {
    throw new Error('baseScriptUrl is required to generate widget entry');
  }

  return {
    id: metadata.id,
    title: metadata.title,
    description: metadata.description || '',
    requiredVersion: metadata.requiredVersion,
    version: metadata.version,
    author: metadata.author || '',
    url: `${baseScriptUrl}/${fileName}`
  };
}

async function generateSourceIndex(options = {}) {
  const widgetsDir = path.resolve(options.widgetsDir || path.join(__dirname, 'widgets'));
  const outputFile = path.resolve(options.outputFile || path.join(__dirname, 'forward-widgets.fwd'));
  const widgets = fs.existsSync(widgetsDir)
    ? fs.readdirSync(widgetsDir)
      .filter((fileName) => fileName.endsWith('.js'))
      .map((fileName) => path.join(widgetsDir, fileName))
    : [];

  const widgetEntries = [];
  for (const widgetFile of widgets) {
    widgetEntries.push(await buildWidgetEntryFromFile(widgetFile, options));
  }

  const orderIndex = new Map(DEFAULT_WIDGET_ORDER.map((widgetId, index) => [widgetId, index]));
  widgetEntries.sort((left, right) => {
    const leftOrder = orderIndex.has(left.id) ? orderIndex.get(left.id) : Number.MAX_SAFE_INTEGER;
    const rightOrder = orderIndex.has(right.id) ? orderIndex.get(right.id) : Number.MAX_SAFE_INTEGER;
    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return String(left.title).localeCompare(String(right.title));
  });

  const index = {
    title: options.title || 'LYDevils 模块库',
    description: options.description || 'LYDevils Forward 模块源',
    icon: options.icon || '',
    widgets: widgetEntries
  };

  validateSourceIndex(index);
  fs.writeFileSync(outputFile, JSON.stringify(index, null, 2));
  return { outputFile, index };
}

module.exports = {
  buildWidgetEntryFromFile,
  extractWidgetMetadata,
  generateSourceIndex,
  inspectWidget,
  loadJson,
  loadSourceIndex,
  loadText,
  validateSourceIndex,
  validateWidgetMetadata
};

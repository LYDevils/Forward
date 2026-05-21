# Forward GitHub Source Format

The screenshots show that Forward loads module sources from a remote `.fwd` index file.

That means a Forward-compatible source is not a site scraper registry. It is:

1. A `.fwd` JSON index file
2. One or more `widgets/*.js` module files
3. Public URLs, usually GitHub Raw URLs or your own CDN

## Reference shape

The official repository shown in the app uses the same structure:

- GitHub repository: `InchStudio/ForwardWidgets`
- index file: `forward-widgets.fwd`
- widget scripts: `widgets/*.js`

## `.fwd` index format

```json
{
  "title": "Forward Widgets",
  "description": "Forward widget source",
  "icon": "https://example.com/icon.png",
  "widgets": [
    {
      "id": "forward.jable",
      "title": "Jable",
      "description": "Jable video module",
      "requiredVersion": "0.0.1",
      "version": "1.0.6",
      "author": "Forward",
      "url": "https://raw.githubusercontent.com/your-org/your-repo/main/widgets/jable.js"
    }
  ]
}
```

## Widget file format

Each widget file exposes a global `WidgetMetadata` object and one or more async functions.

Required metadata fields:

- `id`
- `title`
- `version`
- `requiredVersion`
- `modules`

Typical optional fields:

- `description`
- `author`
- `site`
- `detailCacheDuration`
- `search`
- `categories`

Category lists should be fetched at runtime through `getCategories()`.
Use it to parse the site's homepage or navigation bar and return normalized category entries.

## Suggested repository layout

```text
your-forward-source/
  widgets/
    jable.js
    91porn.js
    pornhub.js
    javday.js
    javrate.js
    xvideos.js
    vod.js
    podcast.js
    live-tv.js
    tv-stations.js
  forward-widgets.fwd
  generate-widget-index.js
```

## Publish flow

1. Write each module under `widgets/*.js`
2. Keep all widget metadata complete and versioned
3. Generate `forward-widgets.fwd`
4. Publish both the index and widget files to GitHub
5. In Forward, add the `.fwd` file URL as the module source

## Files added in this repository

- `ForwardWidgetSource.js`: parse, inspect and validate widget sources
- `generate-widget-index.js`: build a `.fwd` file from local widgets
- `widgets/*.js`: 10 Forward-compatible widget examples
- `forwardSourceTest.js`: local validation script

## Commands

Generate a `.fwd` file:

```bash
node generate-widget-index.js --base-url https://raw.githubusercontent.com/your-org/your-repo/main/widgets
```

Run validation:

```bash
node forwardSourceTest.js
```

## Practical recommendation

Use GitHub only as the source-of-truth for published widget files and the `.fwd` index.
Do not hardcode module lists in the app side. The app should read the remote `.fwd` file and then load each widget by its `url`.

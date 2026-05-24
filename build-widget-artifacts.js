const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, 'widget-sources');
const OUTPUT_DIR = path.join(__dirname, 'widgets');
const ENCRYPT_ENDPOINT = 'https://widgetencrypt.inchmade.ai';

async function encryptWidget(content) {
  const response = await fetch(ENCRYPT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream'
    },
    body: content
  });

  if (!response.ok) {
    throw new Error(`Encrypt request failed: ${response.status} ${response.statusText}`);
  }

  const encryptedContent = await response.text();
  if (!encryptedContent.startsWith('FWENC1')) {
    throw new Error('Encrypt endpoint returned unexpected content');
  }

  return encryptedContent;
}

async function buildArtifacts() {
  const widgetFiles = fs.existsSync(SOURCE_DIR)
    ? fs.readdirSync(SOURCE_DIR).filter((fileName) => fileName.endsWith('.js'))
    : [];

  for (const fileName of widgetFiles) {
    const sourcePath = path.join(SOURCE_DIR, fileName);
    const outputPath = path.join(OUTPUT_DIR, fileName);
    const sourceContent = fs.readFileSync(sourcePath, 'utf8');

    try {
      const encryptedContent = await encryptWidget(sourceContent);
      fs.writeFileSync(outputPath, encryptedContent);
      console.log(`Encrypted ${fileName}`);
    } catch (error) {
      fs.writeFileSync(outputPath, sourceContent);
      console.warn(`Fell back to plain widget for ${fileName}: ${error.message}`);
    }
  }
}

buildArtifacts().catch((error) => {
  console.error('Failed to build widget artifacts:', error.message);
  process.exitCode = 1;
});

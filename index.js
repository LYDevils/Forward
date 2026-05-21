const ForwardPlayer = require('./ForwardPlayer');
const platformRegistry = require('./platformRegistry');
const gitHubSourceLoader = require('./GitHubSourceLoader');
const forwardWidgetSource = require('./ForwardWidgetSource');

module.exports = {
  ForwardPlayer,
  platformRegistry,
  gitHubSourceLoader,
  forwardWidgetSource,
  get platforms() {
    return platformRegistry.getPlatforms();
  }
};

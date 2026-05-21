const platformRegistry = require('./platformRegistry');
const { registerSourcesFromManifest } = require('./GitHubSourceLoader');

class ForwardPlayer {
  constructor(options = {}) {
    this.registry = options.registry || platformRegistry;
    this.currentPlatform = null;
    this.currentPlatformName = null;
    this.currentVideo = null;
    this.videoUrl = null;
    this.onError = options.onError || (() => {});
    this.onReady = options.onReady || (() => {});
    this.onProgress = options.onProgress || (() => {});
  }

  setPlatform(platformName) {
    const platform = this.registry.getPlatform(platformName);
    if (platform) {
      this.currentPlatform = platform;
      this.currentPlatformName = platformName;
      return true;
    }
    throw new Error(`Platform ${platformName} not supported`);
  }

  setPlatformByUrl(url) {
    const matched = this.registry.findPlatformByUrl(url);
    if (!matched) {
      throw new Error(`No platform matched URL: ${url}`);
    }

    this.currentPlatform = matched.platform;
    this.currentPlatformName = matched.name;
    return matched.name;
  }

  async loadVideo(url) {
    if (!this.currentPlatform) {
      throw new Error('No platform selected');
    }

    try {
      const videoData = await this.currentPlatform.extractVideo(url);
      this.currentVideo = videoData;
      this.videoUrl = videoData.url;
      this.onReady(videoData);
      return videoData;
    } catch (error) {
      this.onError(error);
      throw error;
    }
  }

  async search(keyword, options = {}) {
    if (!this.currentPlatform) {
      throw new Error('No platform selected');
    }

    try {
      const results = await this.currentPlatform.search(keyword, options);
      return results;
    } catch (error) {
      this.onError(error);
      throw error;
    }
  }

  async getVideoInfo(url) {
    if (!this.currentPlatform) {
      throw new Error('No platform selected');
    }

    try {
      const info = await this.currentPlatform.getVideoInfo(url);
      return info;
    } catch (error) {
      this.onError(error);
      throw error;
    }
  }

  async loadSourcesFromManifest(manifestRef, options = {}) {
    const registeredNames = await registerSourcesFromManifest(manifestRef, options);
    return registeredNames;
  }

  static getSupportedPlatforms() {
    return platformRegistry.getSupportedPlatforms();
  }

  static getPlatform(platformName) {
    return platformRegistry.getPlatform(platformName);
  }

  static getPlatforms() {
    return platformRegistry.getPlatforms();
  }

  static async registerSourcesFromManifest(manifestRef, options = {}) {
    return registerSourcesFromManifest(manifestRef, options);
  }
}

module.exports = ForwardPlayer;

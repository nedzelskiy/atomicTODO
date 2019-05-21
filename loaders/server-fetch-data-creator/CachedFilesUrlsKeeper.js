class CachedFilesUrlsKeeper {
  constructor() {
    this.clearCache();
  }

  isExistUrl(url) {
    return typeof this.cachedFilesUrls[url] !== 'undefined';
  }

  removeUrl(url) {
    delete this.cachedFilesUrls[url];
  }

  setUrl(url, value) {
    this.cachedFilesUrls[url] = value;
  }

  getUrls() {
    return this.cachedFilesUrls;
  }

  clearCache() {
    this.cachedFilesUrls = {};
  }
}

module.exports = new CachedFilesUrlsKeeper();

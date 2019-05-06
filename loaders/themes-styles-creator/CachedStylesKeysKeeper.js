class CachedStylesKeysKeeper {
  constructor() {
    this.clearKeys();
  }

  addKey(key) {
    this.cachedStylesKeys.push(key);
  }

  getKeys() {
    return this.cachedStylesKeys;
  }

  clearKeys() {
    this.cachedStylesKeys = [];
  }
}

module.exports = new CachedStylesKeysKeeper();

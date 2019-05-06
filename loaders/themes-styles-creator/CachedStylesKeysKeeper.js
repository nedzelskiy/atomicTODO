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

export default CachedStylesKeysKeeper;

export const cachedStylesKeysKeeper = new CachedStylesKeysKeeper();

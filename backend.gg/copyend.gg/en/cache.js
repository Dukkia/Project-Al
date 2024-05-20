const NodeCache = require('node-cache');

const translationCache = new NodeCache({ stdTTL: 86400 });

const cacheText = (text, translatedText) => {
  translationCache.set(text, translatedText, (err, success) => {
    if (!err && success) {
      console.log(`Cached translation for "${text}"`);
    } else {
      console.error(`Failed to cache translation for "${text}"`);
    }
  });
};

const getCachedTranslation = (text) => {
  const cachedTranslation = translationCache.get(text);
  if (cachedTranslation) {
    console.log(`Translation found in cache for "${text}"`);
    return cachedTranslation;
  }
  return null;
};

module.exports = {
  cacheText,
  getCachedTranslation,
  translationCache
};

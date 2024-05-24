// cache.js
const axios = require('axios');
const NodeCache = require('node-cache');

const translationCache = new NodeCache({ stdTTL: 2592000 });

const translateText = async (text) => {
  const cachedTranslation = translationCache.get(text);
  if (cachedTranslation) {
    console.log(`Translation found in cache for "${text}"`);
    return cachedTranslation;
  }
  try {
    const response = await axios.post(
      'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation',
      {
        source: 'en',
        target: 'ja',
        text: text,
        glossaryKey: 'c9e14462-1549-4216-ae38-ec65a0997869'
      },
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': 'tl35fbwl8i',
          'X-NCP-APIGW-API-KEY': 'R9VMF466TYFA2enPzk7eOhQuRx1XJTJYveUSnhLv',
          'Content-Type': 'application/json'
        }
      }
    );
    const translatedText = response.data.message.result.translatedText;
    translationCache.set(text, translatedText, (err, success) => {
      if (!err && success) {
        console.log(`Cached translation for "${text}"`);
      } else {
        console.error(`Failed to cache translation for "${text}"`);
      }
    });
    console.log(`Translation retrieved and cached for "${text}"`);
    return translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    return text;
  }
};

module.exports = {
  translateText,
  translationCache
};

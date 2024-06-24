const axios = require('axios');
const NodeCache = require('node-cache');

const translationCache = new NodeCache({ stdTTL: 2592000 });

const translateText = async (text, targetLang) => {
    const cacheKey = `${text}-${targetLang}`;
    const cachedTranslation = translationCache.get(cacheKey);
    if (cachedTranslation) {
        console.log(`Translation found in cache for "${text}" in ${targetLang}`);
        return cachedTranslation;
    }
    try {
        const response = await axios.post(
            'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation',
            {
                source: 'en',
                target: targetLang,
                text: text,
                glossaryKey: 'c9e14462-1549-4216-ae38-ec65a0997869'
            },
            {
                headers: {
                    'X-NCP-APIGW-API-KEY-ID': '70gknw92gy',
                    'X-NCP-APIGW-API-KEY': 'Y5VjpEoL8bIFsKzOAftW7bR54V7WiMCGntMPuJQl',
                    'Content-Type': 'application/json'
                }
            }
        );
        const translatedText = response.data.message.result.translatedText;
        translationCache.set(cacheKey, translatedText, (err, success) => {
            if (!err && success) {
                console.log(`Cached translation for "${text}" in ${targetLang}`);
            } else {
                console.error(`Failed to cache translation for "${text}" in ${targetLang}`);
            }
        });
        console.log(`Translation retrieved and cached for "${text}" in ${targetLang}`);
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

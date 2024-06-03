const NodeCache = require('node-cache');

const translationCache = new NodeCache({ stdTTL: 2592000 });

module.exports = {
  translationCache
};

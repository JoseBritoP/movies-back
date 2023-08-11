const getExpeditious = require('express-expeditious');
const MemoryEngine = require('expeditious-engine-memory');

const defaultOptions = {
  namespace: 'expresscache',
  defaultTtl: '1 minute', // 60*1000
  statusCodeExpires: {
    404: '5 minutes',
    500: 0,
  },
  engine: new MemoryEngine({
    limit: 10000, // Límite de entradas en caché
    maxAge: 60 * 60 * 1000, 
  })
};

const cacheInit = getExpeditious(defaultOptions);

module.exports = {
  cacheInit
};

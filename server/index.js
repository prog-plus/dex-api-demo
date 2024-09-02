import Fastify from 'fastify';

import loadEnv from './helpers/loadEnv.js';
import loadPlugins from './helpers/loadPlugins.js';
import loadRoutes from './helpers/loadRoutes.js';
import runServer from './helpers/runServer.js';

const logger_level = process.env.NODE_ENV === 'production' ? 'info' : 'debug'
const fastify = Fastify({
  logger: {
    level: logger_level,
  }
});

(async () => {
  await loadEnv(fastify);
  await loadPlugins(fastify);
  await loadRoutes(fastify);

  await runServer(fastify);
})();

export default fastify;

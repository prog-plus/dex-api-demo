import Swagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';
import fp from 'fastify-plugin';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { description, version } = JSON.parse(readFileSync(join(__dirname, '../../package.json')));

async function swaggerGenerator(fastify) {
  await fastify.register(Swagger, {
    swagger: {
      info: {
        title: 'DEX API Demo',
        description,
        version,
      },
    },
    exposeRoute: fastify.config.NODE_ENV !== 'production',
  });

  if (fastify.config.NODE_ENV !== 'production') {
    await fastify.register(SwaggerUI, {
      routePrefix: '/docs',
    });
  }
}

export default fp(swaggerGenerator, {
  name: 'swaggerGenerator',
});

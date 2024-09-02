import AutoLoad from '@fastify/autoload'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export default async function loadPlugins(fastify) {
  console.info('INFO: Loading plug-ins...');

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  await fastify.register(AutoLoad, {
    dir: join(__dirname, '../plugins'),
  });
}

import AutoLoad from '@fastify/autoload'
import { existsSync, readdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function loadRoutes(fastify) {
  console.info('INFO: Loading routes...');

  const modules_path = join(__dirname, '../../modules') // Путь к директории с модулями
  const module_dirs = readdirSync(modules_path, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name)

  for (const moduleDir of module_dirs) {
    const routes_dir = join('/', modules_path, moduleDir, 'routes')

    if (!existsSync(routes_dir)) {
      continue;
    }

    try {
      await fastify.register(AutoLoad, {
        dir: routes_dir,
        options: { prefix: fastify.config.ROUTE_PREFIX || '' }
      });
    } catch (err) {
      console.error(`ERROR: Failed to load routes from ${routes_dir}`, err)
    }
  }
}

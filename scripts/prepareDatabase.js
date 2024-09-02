import dotenv from 'dotenv';
import { existsSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

(async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const modules_path = join(__dirname, '../modules');
  const module_dirs = readdirSync(modules_path, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);

  for (const module_dir of module_dirs) {
    const models_dir = join('/', modules_path, module_dir, 'models');

    if (!existsSync(models_dir)) {
      continue;
    }

    const models = readdirSync(models_dir, { withFileTypes: true })
      .filter(model => !model.isDirectory())
      .map(model => model.name)

    for (const model_file of models) {
      const model_path = join(models_dir, model_file);
      const model = (await import(model_path)).default;

      await model.sync({ force: true });
      await insertData(model);
    }
  }
})();

async function insertData(model) {
  const { name } = model;

  if (name === 'asset') {
    await insertAssets(model);
  }
  else if (name === 'client') {
    await insertClients(model);
  }
  else if (name === 'platform_balance') {
    await insertPlatformBalance(model);
  }
}

async function insertAssets(model) {
  await model.create({
    asset_id: '237ff020-70a9-48bc-abe4-9f53f475531b',
    ticker: 'SOL',
    contract_address: 'QfgRyzDAQdFEBTBosd7TzCnhmVnyKfMuJ8sLpDikwSf',
  });
  await model.create({
    asset_id: '97b300c5-01f6-4e4c-9f89-3aa99c204249',
    ticker: 'USDT',
    contract_address: 'DVa7Qmb5ct9RCpaU7UTpSaf3GVMYz17vNVU67XpdCRut',
  });
}

async function insertClients(model) {
  await model.create({
    client_id: '466474c8-c402-40d3-a479-197b255f0b53',
    name: 'Client 1',
    balance_sol: 50000,
    balance_tokens: 0,
  });
  await model.create({
    client_id: '80a1fd02-e090-4c16-b1fa-a7e50997654a',
    name: 'Client 2',
    balance_sol: 500000,
    balance_tokens: 0,
  });
}

async function insertPlatformBalance(model) {
  await model.create({
    name: 'Client 1',
    balance_sol: 550000,
    balance_tokens: 0,
    last_updated: new Date(),
  });
}


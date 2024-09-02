import Env from '@fastify/env';
import S from 'fluent-json-schema';

export default async function loadEnv(fastify) {
  console.info('INFO: Checking required configuration...');
  await fastify.register(Env, {
    dotenv: true,
    schema: S.object()
      .prop('NODE_ENV', S.string().required())

      .prop('HOST', S.string().required())
      .prop('PORT', S.number().required())
      .prop('ROUTE_PREFIX', S.string())
      .prop('DB_CONNECTION', S.string().required())

      .prop('DEX_TYPE', S.string().required())
      .prop('SOLANA_PUBLIC_KEY', S.string().required())
      .prop('SOLANA_PRIVATE_KEY', S.string().required())

      .prop('SOL_TOKEN_ADDRESS', S.string().required())
      .prop('USDT_TOKEN_ADDRESS', S.string().required())
      .valueOf(),
  });
}

export default async function runServer(fastify) {
  console.info('INFO: Running API server...');

  const { HOST: host, PORT: port } = fastify.config;

  fastify.listen(
    { host, port },
    (error/*, address*/) => {
      if (error) {
        fastify.log.error(error);
        process.exit(1);
      }
    });
}

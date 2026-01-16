import Fastify from 'fastify';

const app = Fastify({
  logger:
    process.env.NODE_ENV == 'production'
      ? { level: 'info' }
      : {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
              ignore: 'pid,hostname',
            },
          },
        },
});

app.get('/check', (_, reply) => {
  reply.send({ message: 'Hello, fastify app!!!!' });
});

app.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(0);
  }
});

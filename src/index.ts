
import {ApplicationConfig} from '@loopback/core';
import {RestServer} from '@loopback/rest';
import {SocketIoOptions} from '@loopback/socketio';
import {BoardBackendApplication} from './app';
export {app};
let app!: BoardBackendApplication;
export async function main(options: ApplicationConfig = {}) {
  app = new BoardBackendApplication(options);
  await app.boot();
  await app.start();


  const url = (await app.getServer(RestServer)).url;
  console.log(`Server is running at ${url}`);

  return app;
}

if (!(require.main === module)) {
  process.exit()
}
// Run the application
const config = {
  rest: {
    port: +(process.env.PORT ?? 3001),
    host: process.env.HOST,
    cors: {
      origin: '*',
    },
    // The `gracePeriodForClose` provides a graceful close for http/https
    // servers with keep-alive clients. The default value is `Infinity`
    // (don't force-close). If you want to immediately destroy all sockets
    // upon stop, set its value to `0`.
    // See https://www.npmjs.com/package/stoppable
    gracePeriodForClose: 5000, // 5 seconds
    openApiSpec: {
      // useful when used with OpenAPI-to-GraphQL to locate your application
      setServersFromRequest: true,
    },
  },
  socketIoOptions: {
    port: 4001,
    cors: {
      origin: '*',
    },
  } as SocketIoOptions,
};

main(config).catch(e => {
  console.log(e);
})



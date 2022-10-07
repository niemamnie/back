
import {ApplicationConfig} from '@loopback/core';
import {RestServer} from '@loopback/rest';
import {SocketIoOptions, SocketIoServer} from '@loopback/socketio';
import {BoardBackendApplication} from './app';
import WebServer from './WebServer';
export {app};
require('dotenv').config();
let app!: BoardBackendApplication;
export async function main(options: ApplicationConfig = {}) {
  app = new BoardBackendApplication(options);
  await app.boot();
  await app.start();
  const restServer = (await app.getServer(RestServer)) as RestServer
  const webServer = (await app.getServer(WebServer)) as WebServer
  const socketServer = await app.getServer('SocketServer') as SocketIoServer
  console.log(`api Server is running at ${restServer.url}`);
  console.log(`web Server is running at ${webServer.url}`);
  console.log(`socket Server is running at ${socketServer.url}`);


  return app;
}

if (!(require.main === module)) {
  process.exit()
}
// Run the application
const config = {
  rest: {
    port: +(process.env.PORT ?? 4001),
    host: process.env.HOST,
    basePath: '/api',
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
    cors: {
      origin: '*',
    },
  } as SocketIoOptions,

  httpServerOptions: {
    port: 4002,
    cors: {
      origin: '*',
    },
  },
  web: {
    port: 4000
  }
};

main(config).catch(e => {
  console.log(e);
})



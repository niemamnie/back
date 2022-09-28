
import {RestServer} from '@loopback/rest';
import {SocketIoOptions} from '@loopback/socketio';
import {
  Client, createRestAppClient, givenHttpServerConfig
} from '@loopback/testlab';
import {BoardBackendApplication} from '../../app';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    rest: {
      port: 3001,
    },
    socketIoOptions: {
      port: 4001,
      cors: {
        origin: '*',
      },
    } as SocketIoOptions,
  } as any);

  const app = new BoardBackendApplication(
    restConfig
  );

  await app.boot();
  await app.start();

  const server = await app.getServer(RestServer);

  const client = createRestAppClient({restServer: server})

  return {app, client};
}

export interface AppWithClient {
  app: BoardBackendApplication;
  client?: Client;
}


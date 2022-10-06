
import {ApplicationConfig} from '@loopback/core';
import {RestServer} from '@loopback/rest';
import {
  Client, createRestAppClient, givenHttpServerConfig
} from '@loopback/testlab';
import {BoardBackendApplication} from '../../app';

export async function setupApplication(config?: ApplicationConfig): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig(config as any);

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
let webServerPort = 30000;
let restServerPort = 40000;
let socketServerPort = 50000;


export function getPortSet() {
  return {
    webServerPort: ++webServerPort,
    restServerPort: ++restServerPort,
    socketServerPort: ++socketServerPort
  }
}

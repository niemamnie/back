import {RestServer} from '@loopback/rest'
import {SocketIoServer} from '@loopback/socketio'
import {expect} from '@loopback/testlab'
import WebServer from '../../WebServer'
import {getPortSet, setupApplication} from '../acceptance/test-helper'

describe('Board Back Application', () => {
  it('should start the application', async () => {
    const {restServerPort, socketServerPort, webServerPort} = getPortSet()
    await setupApplication({
      rest: {
        port: restServerPort,
      },
      httpServerOptions: {
        port: socketServerPort,
      },
      web: {
        port: webServerPort
      }
    })

  })

  it('should start the app on a given port', async () => {
    const {restServerPort, socketServerPort, webServerPort} = getPortSet()
    const {app} = await setupApplication({
      rest: {
        port: restServerPort,
      },
      httpServerOptions: {
        port: socketServerPort,
      },
      web: {
        port: webServerPort
      }
    })
    const rest = await app.getServer(RestServer);
    const socketIo = await app.getServer<SocketIoServer>('SocketServer');
    const web = await app.getServer(WebServer)

    expect(rest.config.port).to.equal(restServerPort)
    expect((socketIo['options'].httpServerOptions as unknown as any).port).to.equal(socketServerPort)
    expect(web.config.port).to.equal(webServerPort)
  })

  it('should start multiple apps on different ports at the same time', async () => {
    const apps = [];
    for (let i = 0; i < 10; i++) {
      const {restServerPort, socketServerPort, webServerPort} = getPortSet()
      const {app} = await setupApplication({
        rest: {
          port: restServerPort,
        },
        httpServerOptions: {
          port: socketServerPort,
        },
        web: {
          port: webServerPort
        }
      })
      apps.push(app)
      const rest = await app.getServer(RestServer);
      const socketIo = await app.getServer<SocketIoServer>('SocketServer');
      const web = await app.getServer(WebServer)

      expect(rest.config.port).to.equal(restServerPort)
      expect((socketIo['options'].httpServerOptions as unknown as any).port).to.equal(socketServerPort)
      expect(web.config.port).to.equal(webServerPort)
    }

  })

  it('should not be able to start server on 1 port', async () => {
    await expect(setupApplication({
      rest: {
        port: 3500,
      },
      httpServerOptions: {
        port: 3500,
      },
      web: {
        port: 3500
      }
    })).to.rejected()
  })

  //TODO write test for multiple apps with on different ports at the same time
})

import {Application, CoreBindings, inject} from '@loopback/core';
import {RestServer, RestServerConfig} from '@loopback/rest';
import path from 'path';

export default class WebServer extends RestServer {
  constructor(@inject(CoreBindings.APPLICATION_INSTANCE) app: Application,
    config?: RestServerConfig) {
    super(app, {
      port: 3002
    })
    const servePath = process.env.webPath ?? '/public'
    this.static('/', path.join(__dirname, servePath))
    console.log('serving files on ', servePath);

  }
}

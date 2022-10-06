import {Application, ApplicationConfig, CoreBindings, inject} from '@loopback/core';
import {RestServer} from '@loopback/rest';
import path from 'path';

export default class WebServer extends RestServer {
  constructor(@inject(CoreBindings.APPLICATION_INSTANCE) app: Application,
    @inject(CoreBindings.APPLICATION_CONFIG)
    config?: ApplicationConfig) {
    super(app, config.web ?? {
      port: 3002
    })
    const servePath = process.env.webPath ?? '/public'
    this.static('/', path.join(__dirname, servePath))
    console.log('serving files on ', servePath);

  }
}

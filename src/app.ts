import {BootMixin} from '@loopback/boot';
import {Application, ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestComponent} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import {SocketIoBooter, SocketIoComponent} from '@loopback/socketio';

export class BoardBackendApplication extends BootMixin(ServiceMixin(RepositoryMixin(Application))) {
  constructor(config?: ApplicationConfig) {
    super(config);
    this.projectRoot = __dirname;
    this.component(RestComponent)
    this.component(SocketIoComponent)
    this.booters(SocketIoBooter);

    this.bootOptions = {

      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
      socketioControllers: {
        dirs: ['ws-controllers'],
        extensions: ['.controller.js'],
        nested: true,
      }
    }
  }
}

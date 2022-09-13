import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {Server} from "socket.io";
export {ApplicationConfig};


export class TestowinoApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  [x: string]: any;
  io: Server

  constructor(options: ApplicationConfig = {}) {
    super(options);


    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  boot = async () => {
    this.io = new Server(3001, {cors: {origin: '*'}});
    await super.boot()
  }

  start = async () => {
    await super.start();
  }
}



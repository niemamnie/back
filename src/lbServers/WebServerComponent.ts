import {Component, Constructor, Server} from '@loopback/core';
import WebServer from '../WebServer';

export default class WebServerComponent implements Component {
  servers?: {
    'webServer': Constructor<WebServer>,
    [name: string]: Constructor<Server>;
  };

}

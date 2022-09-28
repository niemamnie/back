// Uncomment these imports to begin using these cool features!

import {BindingScope, injectable, service} from '@loopback/core';
import {api, get, param, post} from '@loopback/rest';
import {GameService} from '../../services';


// import {inject} from '@loopback/core';
@api({basePath: "/tabletennis"})
@injectable({scope: BindingScope.SINGLETON})
export class TableTennisGameController {
  constructor(@service(GameService) private tableTennisService: GameService) {
    console.log('created tablet tennis controller');

  }

  @get("/{id}")
  async getById(@param.path.string('id') id: string) {
    return this.tableTennisService.getById(id)
  }
  @get("/")
  async getAll() {
    return this.tableTennisService.getAll();
  }

  @post("/")
  async createNew() {
    return this.tableTennisService.createNew();
  }

}

// Uncomment these imports to begin using these cool features!

import {BindingScope, injectable, service} from '@loopback/core';
import {api, get, param, post} from '@loopback/rest';
import {TableTennisService} from '../../services';


// import {inject} from '@loopback/core';
@api({basePath: "/tabletennis"})
@injectable({scope: BindingScope.SINGLETON})
export class TableTennisController {
  constructor(@service(TableTennisService) private tableTennisService: TableTennisService) {
    console.log('created tablet tennis controller');

  }

  @get("/{id}")
  async getById(@param.path.string('id') id: string) {
    return await this.tableTennisService.getById(id)
  }
  @get("/")
  async getAll() {
    return await this.tableTennisService.getAll();
  }

  @post("/")
  async createNew() {
    return await this.tableTennisService.createNew();
  }

}

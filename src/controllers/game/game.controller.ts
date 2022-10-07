// Uncomment these imports to begin using these cool features!

import {BindingScope, injectable, service} from '@loopback/core';
import {api, get, param, post} from '@loopback/rest';
import {GameService} from '../../services';


// import {inject} from '@loopback/core';
@api({basePath: "/game"})
@injectable({scope: BindingScope.SINGLETON})
export class GameController {
  constructor(@service(GameService) private gameService: GameService) {
  }

  @get("/{id}")
  async getById(@param.path.string('id') id: string) {
    return this.gameService.getById(id)
  }
  @get("/")
  async getAll() {
    return this.gameService.getAll();
  }

  @post("/")
  async createNew() {
    return this.gameService.createNew();
  }

}

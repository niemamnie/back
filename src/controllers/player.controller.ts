import {service} from '@loopback/core';
import {api, get, post, requestBody} from '@loopback/rest';
import {Player} from '../models';
import {PlayerRepository} from '../repositories';

@api({basePath: "/player"})
export class PlayerController {

  @service(PlayerRepository)
  playerRepo: PlayerRepository

  @get('')
  getAll() {
    //TODO pagination
    return this.playerRepo.find()
  }

  @post('')
  createNew(@requestBody() data: Partial<Player>) {
    return this.playerRepo.create(data)
  }

}

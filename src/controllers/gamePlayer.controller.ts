import {service} from '@loopback/core';
import {api, post, requestBody} from '@loopback/rest';
import {GamePlayer} from '../models';
import GamePlayerService from '../services/game-player.service';
@api({basePath: '/game'})
export class GamePlayerController {
  @service(GamePlayerService)
  gamePlayerService: GamePlayerService


  @post('/player')
  addPlayerToGame(@requestBody() data: Partial<GamePlayer>) {
    //TODO test with unefinded values
    return this.gamePlayerService.addPlayerIdToGame(data.playerId, data.gameId)
  }
}

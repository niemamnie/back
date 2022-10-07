import {Game} from '../../../models';
import {GameRepository} from '../../../repositories';
import GamePlayerService from '../../../services/game-player.service';
import {getDep} from './dependecy.helper';
import {givenPlayer} from './player.helper';
export function givenGameData(data?: Partial<Game>) {

  return new Game(data ? data : {
    name: "Test Game ",
    gameType: 'testGame',
  })

}
export async function givenGame(data?: Partial<Game>) {
  const game = givenGameData(data)
  return getDep(GameRepository).create(game)
}

export async function givenGameWithNestedRelations() {
  const game = await givenGame()
  for (let i = 0; i < 10; i++) {
    const player = await givenPlayer();
    const gameDataService = getDep(GamePlayerService);
    await gameDataService.addPlayerToGame(player, game.id)
  }
  return getDep(GameRepository).findById(game.id, {include: [{relation: 'gamePlayers', scope: {include: ['player']}}]})
}

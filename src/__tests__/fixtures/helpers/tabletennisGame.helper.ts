import {Game} from '../../../models';
import {GameRepository} from '../../../repositories';
import {getDep} from './dependecy.helper';
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

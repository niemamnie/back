import {Player} from '../../../models';
import {PlayerRepository} from '../../../repositories';
import {getDep} from './dependecy.helper';

export function givenPlayerData(data?: Partial<Player>) {
  const player = new Player();
  Object.assign(player, data)
  return player
}
export function givenPlayer(data?: Partial<Player>) {
  const player = givenPlayerData(data);
  return getDep(PlayerRepository).create(player);
}

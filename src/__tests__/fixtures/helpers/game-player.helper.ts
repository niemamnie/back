import {Game, GamePlayer, Player} from '../../../models';
import {GameRepository, PlayerRepository} from '../../../repositories';
import {getDep} from './dependecy.helper';
import {givenPlayerData} from './player.helper';
import {givenGameData} from './tabletennisGame.helper';

export function givenGamePlayerData(data?: Partial<GamePlayer>,
  player?: Player, game?: Game) {

  const gamePlayer = new GamePlayer();
  if (player) gamePlayer.player = player
  if (game) gamePlayer.gameId = game.id
  return gamePlayer
}
export function givenGamePlayerDataGenPlayerAndGame(data?: Partial<GamePlayer>,) {
  const gamePlayer = new GamePlayer();
  const player = givenPlayerData();
  const game = givenGameData();
  return {gamePlayer: givenGamePlayerData(gamePlayer), player, game}
}

export async function givenGamePlayerDataOfNewPlayerAndGame(data?: Partial<GamePlayer>) {
  const createdData = givenGamePlayerDataGenPlayerAndGame();
  await getDep(GameRepository).create(createdData.game);
  await getDep(PlayerRepository).create(createdData.player);
  return createdData
}


import {Game, GamePlayer, GamePlayerWithRelations, Player} from '../../../models';
import {GamePlayerRepository, GameRepository, PlayerRepository} from '../../../repositories';
import {getDep} from './dependecy.helper';
import {givenPlayerData} from './player.helper';
import {givenGameData} from './tabletennisGame.helper';

export function givenGamePlayerData(data?: Partial<GamePlayer>,
  player?: Player, game?: Game) {

  const gamePlayer = new GamePlayer(data);
  if (player) gamePlayer.playerId = player.id
  if (game) gamePlayer.gameId = game.id
  return gamePlayer
}
export function givenGamePlayerDataGenPlayerAndGame(data?: Partial<GamePlayer>,) {
  const gamePlayer = new GamePlayer();
  const player = givenPlayerData();
  const game = givenGameData();
  return {gamePlayer: givenGamePlayerData(gamePlayer), player, game}
}

export async function givenGamePlayerOfNewPlayerAndGame(data?: Partial<GamePlayer>) {
  const createdData = givenGamePlayerDataGenPlayerAndGame();
  createdData.game = await getDep(GameRepository).create(createdData.game);
  createdData.player = await getDep(PlayerRepository).create(createdData.player);
  createdData.gamePlayer.playerId = createdData.player.id
  createdData.gamePlayer.gameId = createdData.game.id
  createdData.gamePlayer = await getDep(GamePlayerRepository).create(createdData.gamePlayer)
  return createdData
}

export function givenGamePlayer(data?: Partial<GamePlayer>,
  player?: Player, game?: Game) {
  const gamePlayer = givenGamePlayerData(data, player, game)
  return getDep(GamePlayerRepository).create(gamePlayer)
}


export function givenGamePlayerWithRelationsData(data?:
  Partial<GamePlayer>, player?: Player, game?: Game) {
  const gamePlayer =
    givenGamePlayerData(data, player, game) as GamePlayerWithRelations
  gamePlayer.player = player
  return gamePlayer
}

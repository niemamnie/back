import {repository} from '@loopback/repository';
import {Game, GamePlayer, Player} from '../models';
import {
  GamePlayerRepository,
  GameRepository, PlayerRepository
} from '../repositories';

export default class GamePlayerService {
  constructor(
    @repository(GamePlayerRepository)
    private gamePlayerRepository: GamePlayerRepository,
    @repository(PlayerRepository)
    private playerRepository: PlayerRepository,
    @repository(Game)
    private gameRepository: GameRepository
  ) {

  }



  async addPlayerToGame(player: Player, gameId: string) {
    const game = new GamePlayer({playerId: player.id, gameId});
    if (!(await this.playerRepository.exists(player.id)
      && await this.gameRepository.exists(gameId)))
      throw new Error(
        'Could not add player to game: Player or Game does not exist')
    game.playerId = player.id;
    game.gameId = gameId;
    return this.playerRepository.gamePlayer(player.id).create(game)
  }
}

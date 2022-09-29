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
    const game = new GamePlayer({player: player, gameId});
    if (!(await this.playerRepository.exists(player.id)
      && await this.gameRepository.exists(gameId)))
      throw new Error(
        'Could not add player to game: Player or Game does not exist')

    return this.gamePlayerRepository.player(player.id).create(game)
  }

  findById(id: string) {
    return this.gamePlayerRepository.findById(id, {include: ['player']})
  }
}

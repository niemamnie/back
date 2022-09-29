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
    if (!(await this.playerRepository.exists(player.id)
      && await this.gameRepository.exists(gameId)))
      throw new Error(
        'Could not add player to game: Player or Game does not exist')
    const game = new GamePlayer({playerId: player.id, gameId});

    return this.gamePlayerRepository.create(game)
  }

  findById(id: string) {
    return this.gamePlayerRepository.findById(id, {include: ['player']})
  }
}

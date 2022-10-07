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
      && await this.gameRepository.exists(gameId))) {
      throw Error('could not add player to game: player or game is not defined')
    }
    const game = new GamePlayer({playerId: player.id, gameId});

    return this.gamePlayerRepository.create(game)
  }

  async addPlayerIdToGame(playerId: string, gameId: string) {
    // TODO change player to player id
    return this.addPlayerToGame(await this.playerRepository.findById(playerId),
      gameId)
  }


  findByIdWrelations(id: string) {
    return this.gamePlayerRepository.findById(id, {include: ['player']})
  }
  findById(id: string) {
    return this.gamePlayerRepository.findById(id)
  }

  async changePointsOfPlayer(gamePlayerId: string, pointsChange: number): Promise<GamePlayer> {
    const gamePlayer = await this.findByIdWrelations(gamePlayerId)
    await this.gamePlayerRepository.updateById(gamePlayerId,
      {points: gamePlayer.points + pointsChange})
    return this.findById(gamePlayerId)
  }


}

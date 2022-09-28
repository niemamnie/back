import {repository} from '@loopback/repository';
import {GamePlayer} from '../models';
import {GamePlayerRepository, PlayerRepository} from '../repositories';

export default class GamePlayerService {
  constructor(
    @repository(GamePlayerRepository)
    private gamePlayerRepository: GamePlayerRepository,
    @repository(PlayerRepository)
    private playerRepository: PlayerRepository
  ) {

  }

  async create(tabletennisPlayer: Partial<GamePlayer>) {
    if (tabletennisPlayer.playerId && await this.playerRepository.exists(tabletennisPlayer.playerId!))
      return this.gamePlayerRepository.player(tabletennisPlayer.playerId!).create(tabletennisPlayer)
  }


  addPlayerToGame(playerId: string, gameId: string) {
    const game = new GamePlayer();
    game.playerId = playerId;
    game.tabletennisGameId = gameId;
    return this.gamePlayerRepository.player(playerId).create(game)
  }
}

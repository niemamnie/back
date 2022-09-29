import {expect} from '@loopback/testlab';
import {GameRepository, PlayerRepository} from '../../repositories';
import GamePlayerService from '../../services/game-player.service';
import {getDep} from '../fixtures/helpers/dependecy.helper';
import {givenPlayer} from '../fixtures/helpers/player.helper';
import {givenGame} from '../fixtures/helpers/tabletennisGame.helper';

describe('Game Player Service tests', () => {
  let gamePlayerService: GamePlayerService;
  let playerRepository: PlayerRepository;
  let gameRepository: GameRepository;
  before(() => {
    gamePlayerService = getDep(GamePlayerService)
    playerRepository = getDep(PlayerRepository)
    gameRepository = getDep(GameRepository)
  })

  it('should create new game player for given player', async () => {
    const player = await givenPlayer();
    const game = await givenGame();

    const result = await gamePlayerService.addPlayerToGame(player, game.id)
    const gamePlayer = await gamePlayerService.findById(result.id)
    expect(result).to.Object();
    // expect(result.player).to.equal(player.id)
    // expect(result.gameId).to.equal(game.id)
  })


})

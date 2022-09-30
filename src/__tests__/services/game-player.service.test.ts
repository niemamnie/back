import {expect} from '@loopback/testlab';
import {GamePlayer, GamePlayerWithRelations} from '../../models';
import GamePlayerService from '../../services/game-player.service';
import {clearRepos, getDep} from '../fixtures/helpers/dependecy.helper';
import {givenGamePlayerDataOfNewPlayerAndGame} from '../fixtures/helpers/game-player.helper';
import {givenPlayer, givenPlayerData} from '../fixtures/helpers/player.helper';
import {givenGame} from '../fixtures/helpers/tabletennisGame.helper';

describe('Game Player Service tests', () => {
  let gamePlayerService: GamePlayerService;
  before(() => {
    gamePlayerService = getDep(GamePlayerService)
  })
  before(async () => {
    await clearRepos()
  })

  it('should create new game player for given player', async () => {
    const player = await givenPlayer();
    const game = await givenGame();

    const result = await gamePlayerService.addPlayerToGame(player, game.id)
    expect(result).to.Object();
    expect(result.playerId).to.equal(player.id)
    expect(result.gameId).to.equal(game.id)
  })

  it('should throw error, becouse player id was missing', async () => {
    const player = givenPlayerData({id: 'non existing'});
    const game = await givenGame();

    await expect(gamePlayerService.addPlayerToGame(player, game.id)).to.rejected()
  })

  it('should find given game player by id', async () => {
    const {gamePlayer, player} = await givenGamePlayerDataOfNewPlayerAndGame()

    const result = await gamePlayerService.findById(gamePlayer.id);

    expect(result).to.containEql(new GamePlayer({...gamePlayer, player: player} as GamePlayerWithRelations));
  })

  it('should ... becouse gameplayer does not exist', async () => {

    await expect(gamePlayerService.findById('i do not exists')).to.rejected()
  })

})


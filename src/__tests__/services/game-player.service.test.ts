import {expect} from '@loopback/testlab';
import {GamePlayer, GamePlayerWithRelations} from '../../models';
import GamePlayerService from '../../services/game-player.service';
import {clearRepos, getDep} from '../fixtures/helpers/dependecy.helper';
import {givenGamePlayer, givenGamePlayerOfNewPlayerAndGame} from '../fixtures/helpers/game-player.helper';
import {givenPlayer, givenPlayerData} from '../fixtures/helpers/player.helper';
import {givenGame, givenGameData} from '../fixtures/helpers/tabletennisGame.helper';

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

  it('should throw error, becouse player do not exist', async () => {
    const player = givenPlayerData({id: 'non existing'});
    const game = await givenGame();

    await expect(gamePlayerService.addPlayerToGame(player, game.id))
      .to.rejected()
  })
  it('should throw error, becouse game do not exist', async () => {
    const player = await givenPlayer();
    const game = givenGameData();

    await expect(gamePlayerService.addPlayerToGame(player, game.id))
      .to.rejected()
  })

  it('should find given game player by id with relations', async () => {
    const {gamePlayer, player} = await givenGamePlayerOfNewPlayerAndGame()

    const result = await gamePlayerService.findByIdWrelations(gamePlayer.id);

    expect(result).to.containEql(new GamePlayer(
      {...gamePlayer, player: player} as GamePlayerWithRelations));
  })

  it('should find by id without relations', async () => {
    const {gamePlayer} = await givenGamePlayerOfNewPlayerAndGame()

    const result = await gamePlayerService.findById(gamePlayer.id);

    expect(result).to.containEql(new GamePlayer(
      {...gamePlayer} as GamePlayerWithRelations));
    expect(result).to.not.have.property('player')
  })

  it('should reject becouse gameplayer does not exist', async () => {

    await expect(gamePlayerService.findByIdWrelations('i do not exists'))
      .to.rejected()
  })

  it('should change points of given player: positive number', async () => {
    const gamePlayer = await givenGamePlayer({points: 5})
    const update = 1;
    const expectdGamePlayer =
      {
        ...gamePlayer,
        points: gamePlayer.points + update
      } as GamePlayerWithRelations
    const result = await gamePlayerService.changePointsOfPlayer(gamePlayer.id,
      update)


    expect(result).to.containEql(expectdGamePlayer)
  })

  it('should change points of given player: negative number', async () => {
    const gamePlayer = await givenGamePlayer({points: 5})
    const update = -1;
    const expectdGamePlayer =
      {
        ...gamePlayer,
        points: gamePlayer.points + update
      } as GamePlayerWithRelations
    delete expectdGamePlayer.player
    const result = await gamePlayerService.changePointsOfPlayer(gamePlayer.id,
      update)


    expect(result).to.containEql(expectdGamePlayer)
  })


  it('should reject when game player does not exist', async () => {
    await expect(gamePlayerService.changePointsOfPlayer('non existing id', 1))
      .to.rejected()
  })


})


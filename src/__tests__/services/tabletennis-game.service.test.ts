import {expect} from '@loopback/testlab';
import {Game} from '../../models';
import {GamePlayerRepository} from '../../repositories';
import {GameService} from '../../services';
import {getDep} from '../fixtures/helpers/dependecy.helper';
import {givenGameWithNestedRelations} from '../fixtures/helpers/tabletennisGame.helper';

describe('Game Service', () => {
  let gameService: GameService;
  let gamePlayerRepository: GamePlayerRepository;
  before(async () => {
    gameService = getDep(GameService)
    gamePlayerRepository = getDep(GamePlayerRepository)


  })


  beforeEach(async () => {
    await gamePlayerRepository.deleteAll()
  })

  it('should create new game and return it', async () => {
    const result = await gameService.createNew()
    expect(result).to.not.undefined()
    expect(result).to.deepEqual(Object.assign(new Game({gameType: 'random'}), {
      id: result.id,
      name: 'Random Game',
    } as any))
  })


  it('should find game by id', async () => {
    const result = await gameService.createNew()
    const readedResult = await gameService.getById(result.id);

    expect(result).to.deepEqual(readedResult)
  })

  it('should get all game', async () => {
    const sampleSize = 10;
    const createdTables = []
    for (let index = 0; index < sampleSize; index++) {
      createdTables.push(await gameService.createNew());
    }
    const foundTables = await gameService.getAll();
    const result = createdTables.filter(table =>
      foundTables.find(t => t.id === table.id))
    expect(result.length).to.equal(createdTables.length)

  })

  it('schould get all games with their nested relations', async () => {
    const givenGames = await givenGameWithNestedRelations()

    const receivedGame = await gameService.getAll();
    for (const game of receivedGame) {
      expect(game).to.have.property('gamePlayers')
      for (const gamePlayer of game.gamePlayers) {
        expect(gamePlayer).to.have.property('player')
      }
    }
    expect(receivedGame).to.deepEqual([givenGames])
  })


  it('should update name of game', async () => {
    const given = await gameService.createNew();
    const update = {name: 'upated name'};
    await gameService.update(given.id, update);
    const result = await gameService.getById(given.id);
    expect(result.name).to.equal(update.name)
  })



})

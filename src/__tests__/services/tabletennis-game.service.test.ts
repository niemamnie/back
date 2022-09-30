import {expect} from '@loopback/testlab';
import {Game} from '../../models';
import {GamePlayerRepository} from '../../repositories';
import {GameService} from '../../services';
import {getDep} from '../fixtures/helpers/dependecy.helper';

describe('Game Service', () => {
  let tabletennisService: GameService;
  let gamePlayerRepository: GamePlayerRepository;
  before(async () => {
    tabletennisService = getDep(GameService)
    gamePlayerRepository = getDep(GamePlayerRepository)


  })


  beforeEach(async () => {
    await gamePlayerRepository.deleteAll()
  })

  it('should create new table and return it', async () => {
    const result = await tabletennisService.createNew()
    expect(result).to.not.undefined()
    expect(result).to.deepEqual(Object.assign(new Game(), {
      id: '1',
      name: 'Random Game',
    } as any))
  })


  it('should find table by id', async () => {
    const result = await tabletennisService.createNew()
    const readedResult = await tabletennisService.getById(result.id);

    expect(result).to.deepEqual(readedResult)
  })

  it('should get all tables', async () => {
    const sampleSize = 10;
    const createdTables = []
    for (let index = 0; index < sampleSize; index++) {
      createdTables.push(await tabletennisService.createNew());
    }
    const foundTables = await tabletennisService.getAll();
    const result = createdTables.filter(table =>
      foundTables.find(t => t.id === table.id))
    expect(result.length).to.equal(createdTables.length)

  })


  it('should update name of tabletennis game', async () => {
    const given = await tabletennisService.createNew();
    const update = {name: 'upated name'};
    await tabletennisService.update(given.id, update);
    const result = await tabletennisService.getById(given.id);
    expect(result.name).to.equal(update.name)
  })



})

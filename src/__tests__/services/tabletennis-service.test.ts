import {expect} from '@loopback/testlab';
import {TabletennisGame} from '../../models';
import {GamePlayerRepository} from '../../repositories';
import {TabletennisGameService} from '../../services';
import {getDep} from '../fixtures/helpers/dependecy.helper';

describe('Tabletennis Service', () => {
  let tabletennisService: TabletennisGameService;
  let gamePlayerRepository: GamePlayerRepository;
  before(async () => {
    tabletennisService = getDep(TabletennisGameService)
    gamePlayerRepository = getDep(GamePlayerRepository)


  })


  beforeEach(async () => {
    await gamePlayerRepository.deleteAll()
  })

  it('should create new table and return it', async () => {
    const result = await tabletennisService.createNew()
    expect(result).to.not.undefined()
    expect(result).to.deepEqual(Object.assign(new TabletennisGame(), {
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


})

import {expect} from '@loopback/testlab';
import {TableTennisGame} from '../../models';
import {TableTennisRepository} from '../../repositories';
import {TableTennisService} from '../../services';
import {testdb} from '../fixtures/datasources/testdb.datasource';

describe('Tabletennis Service', () => {
  let tabletennisService: TableTennisService;
  let tableTennisRepository: TableTennisRepository;
  before(() => {
    tableTennisRepository = new TableTennisRepository(testdb)
    tabletennisService = new TableTennisService(tableTennisRepository)
  })

  beforeEach(async () => {
    await tableTennisRepository.deleteAll()
  })

  it('should create new table and return it', async () => {
    const result = await tabletennisService.createNew()
    expect(result).to.not.undefined()
    expect(result).to.deepEqual(Object.assign(new TableTennisGame(), {
      id: '1',
      name: 'Random Game',
      pointsFirstPlayer: 0,
      pointsSecondPlayer: 0
    } as TableTennisGame))
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

  it('should update existing table', async () => {
    const table = await tabletennisService.createNew();
    await tabletennisService.update(table.id, {pointsFirstPlayer: 100})
    const result = await tabletennisService.getById(table.id)
    expect(result.pointsFirstPlayer).to.equal(100)
  })
})

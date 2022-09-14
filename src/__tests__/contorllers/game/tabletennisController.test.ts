import sinon, {SinonMock} from 'sinon'
import {TableTennisController} from '../../../controllers'
import {TableTennisRepository} from '../../../repositories'
import {TableTennisService} from '../../../services'

describe('Tabletennis Controller', () => {
  let tabletennisController!: TableTennisController
  let tabletennisService!: TableTennisService
  let tabletennisServiceMock!: SinonMock

  before(() => {
    tabletennisService = new TableTennisService(undefined as unknown as TableTennisRepository)
    tabletennisServiceMock = sinon.mock(
      tabletennisService
    )
    tabletennisController = new TableTennisController(tabletennisService)
  })
  beforeEach(() => {
    tabletennisServiceMock.restore();
  })

  it('should call craeteNew function', async () => {
    tabletennisServiceMock.expects('createNew').once();
    await tabletennisController.createNew();

    tabletennisServiceMock.verify()
  })

  it('should call getById function', async () => {
    tabletennisServiceMock.expects('getById').once()
    await tabletennisController.getById('1');
    tabletennisServiceMock.verify();
  })
  it('should call getAll function', async () => {
    tabletennisServiceMock.expects('getAll').once()
    await tabletennisController.getAll();
    tabletennisServiceMock.verify();
  })

})

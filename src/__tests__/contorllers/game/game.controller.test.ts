import sinon, {SinonMock} from 'sinon'
import {GameController} from '../../../controllers'
import {GameService} from '../../../services'
import {getDep} from '../../fixtures/helpers/dependecy.helper'

describe('Game Controller', () => {
  let tabletennisController!: GameController
  let tabletennisService!: GameService
  let tabletennisServiceMock!: SinonMock

  before(() => {
    tabletennisController = getDep(GameController)
    tabletennisService = getDep(GameService)
    tabletennisServiceMock = sinon.mock(
      tabletennisService
    )
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

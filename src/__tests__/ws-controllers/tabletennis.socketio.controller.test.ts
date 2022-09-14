import {sinon} from '@loopback/testlab'
import {SinonMock} from 'sinon'
import {Handshake} from 'socket.io/dist/socket'
import TableTennisSocket from '../../intern/TableTennisSocket'
import {TableTennisRepository as TabletennisRepository} from '../../repositories'
import {TableTennisService as TabletennisService, TabletennisSocketStoreService} from '../../services'
import {TabletennisSocketioController} from '../../ws-controllers/tabletennis.socketio.controller'
import {givenTabletennisGameData} from '../fixtures/helpers/tabletennisGame.helper'
import {givenTabletennisSocketData} from '../fixtures/helpers/tabletennisSocekt.helper'

describe('Tabletennis SocketIo Controller', () => {
  let socketioController: TabletennisSocketioController
  let tabletennisService: TabletennisService
  let socketStore: TabletennisSocketStoreService
  let socket: TableTennisSocket
  let serviceMock: SinonMock
  let storeMock: SinonMock
  let socketMock: SinonMock
  beforeEach(() => {
    socket = givenTabletennisSocketData()
    socketStore = new TabletennisSocketStoreService()
    tabletennisService = new TabletennisService(
      undefined as unknown as TabletennisRepository)
    socketioController = new TabletennisSocketioController(
      socket, tabletennisService, socketStore
    )
    serviceMock = sinon.mock(tabletennisService)
    storeMock = sinon.mock(socketStore)
    socketMock = sinon.mock(socket)
  })

  it('should on conncet to socket set socket.tabletennis prop', async () => {
    const testSocket = givenTabletennisSocketData({
      handshake: {auth: {tabletennis: 'tableid'}} as unknown as Handshake
    })
    const tabletennisGame = givenTabletennisGameData()
    serviceMock.expects('getById').once().returns(tabletennisGame)
    storeMock.expects('add').once().returns(undefined)
    const emitStub = testSocket.emit as sinon.SinonStub
    emitStub.returns(undefined)
    const disconnectStub = testSocket.disconnect as sinon.SinonStub
    disconnectStub.throws()
    await socketioController.connect(testSocket)


    serviceMock.verify();
    storeMock.verify();
  })
})

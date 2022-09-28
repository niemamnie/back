// import {expect, sinon} from '@loopback/testlab'
// import should from 'should'
// import {SinonMock} from 'sinon'
// import {Handshake} from 'socket.io/dist/socket'
// import TableTennisSocket from '../../intern/TableTennisSocket'
// import {TableTennisGame} from '../../models'
// import {GamePlayerRepository as TabletennisRepository} from '../../repositories'
// import {TableTennisGameService as TabletennisService, TabletennisSocketStoreService} from '../../services'
// import {TabletennisSocketioController} from '../../ws-controllers/tabletennis.socketio.controller'
// import {TabletennisSocketPaths} from '../../ws-controllers/TabletennisSocketPaths'
// import {givenTabletennisGameData} from '../fixtures/helpers/tabletennisGame.helper'
// import {givenTabletennisSocketData} from '../fixtures/helpers/tabletennisSocekt.helper'

// describe('Tabletennis SocketIo Controller', () => {
//   let socketioController: TabletennisSocketioController
//   let tabletennisService: TabletennisService
//   let socketStore: TabletennisSocketStoreService
//   let socket: TableTennisSocket
//   let serviceMock: SinonMock
//   let socketStoreMock: SinonMock
//   let socketMock: SinonMock
//   beforeEach(() => {
//     socket = givenTabletennisSocketData()
//     socketStore = new TabletennisSocketStoreService()
//     tabletennisService = new TabletennisService(
//       undefined as unknown as TabletennisRepository)
//     socketioController = new TabletennisSocketioController(
//       socket, tabletennisService, socketStore
//     )
//     serviceMock = sinon.mock(tabletennisService)
//     socketStoreMock = sinon.mock(socketStore)
//     socketMock = sinon.mock(socket)

//     serviceMock.restore()
//     socketStoreMock.restore()
//     socketMock.restore()
//   })

//   it('should on conncet to socket set socket.tabletennis prop', async () => {
//     const testSocket = givenTabletennisSocketData({
//       handshake: {auth: {tabletennis: 'tableid'}} as unknown as Handshake
//     })
//     const tabletennisGame = givenTabletennisGameData()
//     serviceMock.expects('getById').once().returns(tabletennisGame)
//     socketStoreMock.expects('add').once().returns(undefined)
//     const emitStub = testSocket.emit as sinon.SinonStub
//     emitStub.returns(undefined)
//     const disconnectStub = testSocket.disconnect as sinon.SinonStub
//     disconnectStub.throws()
//     await socketioController.connect(testSocket)


//     serviceMock.verify();
//     socketStoreMock.verify();
//     expect(testSocket.tabletennis).to.equal('tableid')
//   })

//   it('should disconnect when socket.handshake.auth.tabletennis is undefined',
//     async () => {
//       const testSocket = givenTabletennisSocketData({
//         handshake: {auth: {tabletennis: undefined}} as unknown as Handshake
//       })
//       serviceMock.expects('getById').atMost(0)
//       socketStoreMock.expects('add').atMost(0)
//       const disconnectStub = testSocket.disconnect as sinon.SinonStub
//       disconnectStub.returns(undefined)

//       await socketioController.connect(testSocket)

//       serviceMock.verify();
//       socketStoreMock.verify();
//       expect(disconnectStub.calledOnce).to.true()

//     })

//   it('should remove socket from socketsStore when disconnecting', () => {
//     socketStoreMock.expects('remove').once().returns(undefined)
//     socketioController.disconnect()
//     socketStoreMock.verify();
//   })

//   it('should update a tennis game with given first player changes', async () => {
//     const gameChanges = {pointsFirstPlayer: 1} as unknown as TableTennisGame
//     const givenGame = givenTabletennisGameData({pointsFirstPlayer: 2})
//     const givenGameAfterChange = givenTabletennisGameData({pointsSecondPlayer: 3})
//     socket.tabletennis = givenGame.id
//     serviceMock.expects('getById').atMost(2).withArgs(socket.tabletennis)
//       .onFirstCall().returns(givenGame)
//       .onSecondCall().returns(givenGameAfterChange)

//     serviceMock.expects('update').once().withArgs(givenGame.id, {pointsFirstPlayer: 3})
//       .returns(undefined)
//     socketStoreMock.expects('sendToAll')
//       .withArgs(socket.tabletennis,
//         TabletennisSocketPaths.update,
//         givenGameAfterChange)

//     await socketioController.update(gameChanges)

//     socketMock.verify();
//     serviceMock.verify();
//     socketStoreMock.verify();
//   })

//   it('should update a tennis game with given second player change', async () => {
//     const gameChanges = {pointsSecondPlayer: -1} as unknown as TableTennisGame
//     const givenGame = givenTabletennisGameData({pointsSecondPlayer: 2})
//     const givenGameAfterChange = givenTabletennisGameData({pointsSecondPlayer: 1})
//     socket.tabletennis = givenGame.id
//     serviceMock.expects('getById').atMost(2).withArgs(socket.tabletennis)
//       .onFirstCall().returns(givenGame)
//       .onSecondCall().returns(givenGameAfterChange)
//     serviceMock.expects('update').once().withArgs(givenGame.id, {pointsSecondPlayer: 1})
//       .returns(undefined)
//     socketStoreMock.expects('sendToAll')
//       .withArgs(socket.tabletennis,
//         TabletennisSocketPaths.update,
//         givenGameAfterChange)

//     await socketioController.update(gameChanges)

//     socketMock.verify();
//     serviceMock.verify();
//     socketStoreMock.verify();
//   })

//   it('should log thrown error', async () => {
//     const gameChanges = {pointsSecondPlayer: -1} as unknown as TableTennisGame
//     serviceMock.expects('getById').throws()
//     should(() => socketioController.update(gameChanges)).not.throw()
//   })
// })

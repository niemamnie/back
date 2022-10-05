import {expect, sinon} from '@loopback/testlab'
import should from 'should'
import {SinonMock} from 'sinon'
import {Handshake} from 'socket.io/dist/socket'
import GameSocket from '../../intern/TableTennisSocket'
import {GamePlayer} from '../../models'
import TabletennisWinner from '../../models/tabletennis/table-tennis-winner'
import {GameService, GameSocketStoreService} from '../../services'
import GamePlayerService from '../../services/game-player.service'
import {GameSocketioController} from '../../ws-controllers/game-socketio.controller'
import {GamesocketPaths, GamesocketPaths as GameSocketPaths} from '../../ws-controllers/TabletennisSocketPaths'
import {getDep} from '../fixtures/helpers/dependecy.helper'
import {givenGamePlayerData, givenGamePlayerWithRelationsData} from '../fixtures/helpers/game-player.helper'
import {givenPlayerData} from '../fixtures/helpers/player.helper'
import {givenGameData} from '../fixtures/helpers/tabletennisGame.helper'
import {givenTabletennisSocketData} from '../fixtures/helpers/tabletennisSocekt.helper'

describe('Game SocketIo Controller', () => {
  let socketioController: GameSocketioController
  let gameService: GameService
  let socketStore: GameSocketStoreService
  let gamePlayerService: GamePlayerService
  let socket: GameSocket
  let gameServiceMock: SinonMock
  let socketStoreMock: SinonMock
  let socketMock: SinonMock
  let gamePlayerServiceMock: SinonMock
  before(() => {
    socketStore = getDep(GameSocketStoreService)
    gameService = getDep(GameService)
    socketioController = getDep(GameSocketioController)
    gamePlayerService = getDep(GamePlayerService)

    socket = socketioController['socket']


    gameServiceMock = sinon.mock(gameService)
    socketStoreMock = sinon.mock(socketStore)
    socketMock = sinon.mock(socket)
    gamePlayerServiceMock = sinon.mock(gamePlayerService)
  })
  beforeEach(() => {
    gameServiceMock.restore()
    socketStoreMock.restore()
    socketMock.restore()
    gamePlayerServiceMock.restore()

    gameServiceMock = sinon.mock(gameService)
    socketStoreMock = sinon.mock(socketStore)
    socketMock = sinon.mock(socket)
    gamePlayerServiceMock = sinon.mock(gamePlayerService)

  })

  it('should on conncet to socket set socket.gameId prop', async () => {
    const testSocket = givenTabletennisSocketData({
      handshake: {auth: {gameId: 'tableid'}} as unknown as Handshake
    })
    const game = givenGameData()
    gameServiceMock.expects('getById').once().returns(game)
    socketStoreMock.expects('add').once().returns(undefined)
    const emitStub = testSocket.emit as sinon.SinonStub
    emitStub.returns(undefined)
    const disconnectStub = testSocket.disconnect as sinon.SinonStub
    disconnectStub.throws()
    await socketioController.connect(testSocket)


    gameServiceMock.verify();
    socketStoreMock.verify();
    expect(testSocket.gameId).to.equal(testSocket.handshake.auth.gameId)
  })

  it('should disconnect when socket.handshake.auth.gameId is undefined',
    async () => {
      const testSocket = givenTabletennisSocketData({
        handshake: {auth: {tabletennis: undefined}} as unknown as Handshake
      })
      gameServiceMock.expects('getById').atMost(0)
      socketStoreMock.expects('add').atMost(0)
      const disconnectStub = testSocket.disconnect as sinon.SinonStub
      disconnectStub.returns(undefined)

      await socketioController.connect(testSocket)

      gameServiceMock.verify();
      socketStoreMock.verify();
      expect(disconnectStub.calledOnce).to.true()

    })

  it('should remove socket from socketsStore when disconnecting', () => {
    socketStoreMock.expects('remove').once().returns(undefined)
    socketioController.disconnect()
    socketStoreMock.verify();
  })

  it('should update a tennis game with given first player positive changes', async () => {
    const gameScoreChange = 1
    const givenGamePlayer = givenGamePlayerData(
      {gameId: 'gameId', playerId: 'playerId'});
    const updatedGamePlayer = {
      ...givenGamePlayer,
      points: givenGamePlayer.points + gameScoreChange
    } as GamePlayer
    socket.gameId = givenGamePlayer.gameId
    gamePlayerServiceMock.expects('changePointsOfPlayer').atMost(1)
      .withArgs(givenGamePlayer.playerId, gameScoreChange)
      .onFirstCall().returns(updatedGamePlayer)
    socketStoreMock.expects('sendToAll')
      .withArgs(socket.gameId,
        GameSocketPaths.update,
        updatedGamePlayer)

    await socketioController.update(givenGamePlayer.playerId, gameScoreChange)

    gamePlayerServiceMock.verify();
    socketStoreMock.verify();
  })

  it('should update a tennis game with given second player negative change',
    async () => {
      const gameScoreChange = -1
      const givenGamePlayer = givenGamePlayerData(
        {gameId: 'gameId', playerId: 'playerId', points: 10});
      const updatedGamePlayer = {
        ...givenGamePlayer,
        points: givenGamePlayer.points + gameScoreChange
      } as GamePlayer
      socket.gameId = givenGamePlayer.gameId
      gamePlayerServiceMock.expects('changePointsOfPlayer')
        .withArgs(givenGamePlayer.playerId, gameScoreChange)
        .onFirstCall().returns(updatedGamePlayer)
      socketStoreMock.expects('sendToAll')
        .withArgs(socket.gameId,
          GameSocketPaths.update,
          updatedGamePlayer)

      await socketioController.update(givenGamePlayer.playerId, gameScoreChange)

      gamePlayerServiceMock.verify();
      socketStoreMock.verify();
    })

  it('should log thrown error', async () => {
    gamePlayerServiceMock.expects('changePointsOfPlayer').throws()
    should(() => socketioController.update('playerId', 1)).not.throw()
  })

  it('should declare winner of a game and inform sockets', async () => {
    const givenPlayer = givenPlayerData()
    const givenGamePlayer = givenGamePlayerWithRelationsData({}, givenPlayer);
    const expectedWinner = new TabletennisWinner(givenGamePlayer.points,
      givenPlayer.name)
    socket.gameId = 'gameid'
    gamePlayerServiceMock.expects('findByIdWrelations').atMost(1)
      .withArgs(givenGamePlayer.id).onFirstCall()
      .returns(givenGamePlayer)
    socketStoreMock.expects('sendToAll').atMost(1)
      .withArgs(socket.gameId, GamesocketPaths.winner, expectedWinner)

    await socketioController.winner(givenGamePlayer.id)

    gamePlayerServiceMock.verify()
    socketStoreMock.verify()

  })
})

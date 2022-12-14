import {expect} from '@loopback/testlab';
import sinon from 'sinon';
import GameSocket from '../../intern/TableTennisSocket';
import {GameSocketStoreService} from '../../services';
import {GamesocketPaths} from '../../ws-controllers/TabletennisSocketPaths';
import {givenListOfSocketData, givenTabletennisSocketData} from '../fixtures/helpers/tabletennisSocekt.helper';
describe('Game Socket Service', () => {
  let socketStoreService = new GameSocketStoreService()

  beforeEach(() => {
    socketStoreService = new GameSocketStoreService()
  })

  it('should remember multiple sockets', () => {
    registerAll(givenListOfSocketData(5));

    expect(socketStoreService.size).to.eql(5);
  })

  it('should ignore socket without socket.tabletennis prop', () => {
    socketStoreService.add(
      givenTabletennisSocketData({gameId: undefined})
    )
    expect(socketStoreService.size).to.equal(0)
  })

  it('should remember multiple sockets for multiple games', () => {
    const data = []
    const sampleSize = 10
    for (let i = 0; i < sampleSize; i++) {
      data.push(givenListOfSocketData(sampleSize, {gameId: i.toString()}))
    }

    data.forEach(el => {
      registerAll(el)
    })
    expect(socketStoreService['sockets']).to.Object()
    const map = socketStoreService['sockets']
    for (let i = 0; i < sampleSize; i++) {
      const list = map.get(i.toString())
      list?.forEach(element => {
        expect(element.gameId).to.equal(i.toString())
      })
    }
    expect(socketStoreService.size).to.equal(sampleSize * sampleSize)
  })

  it('should remove socket from map', () => {
    const sampleSize = 10
    const list = givenListOfSocketData(sampleSize, {gameId: '1'})
    registerAll(list)

    socketStoreService.remove(list[0])

    expect(socketStoreService.size).to.equal(sampleSize - 1)
    const map = socketStoreService['sockets']
    const resultList = map.get('1')
    expect(resultList?.length).to.equal(sampleSize - 1)
    const found = resultList?.find(socket => socket.id === list[0].id)
    expect(found).to.undefined()
  })

  it('should do nothing when socket.tabletennis is undefined', () => {
    const mock = sinon.mock(socketStoreService['sockets'])
    mock.expects('get').atMost(0);
    socketStoreService.remove({} as unknown as GameSocket)
    mock.verify();
  })

  it('should do nothing when sockets were not found', () => {
    const mock = sinon.mock(socketStoreService['sockets'])
    mock.expects('set').atMost(0)
    mock.expects('get').returns(undefined)
    socketStoreService.remove({gameId: '1'} as unknown as GameSocket)
    mock.verify();
  })

  it('should send message to all sockets', () => {
    const sampleSize = 10
    const sendToList = givenListOfSocketData(sampleSize, {gameId: '1'})
    const IgnoreList = givenListOfSocketData(sampleSize, {gameId: '2'})
    registerAll(sendToList)
    registerAll(IgnoreList)

    socketStoreService.sendToAll('1', GamesocketPaths.update)

    const resultSendToList = socketStoreService.get('1')
    const resultIgnoreList = socketStoreService.get('2')
    expect(resultSendToList?.length).to.equal(sendToList.length)
    expect(resultIgnoreList?.length).to.equal(IgnoreList.length)

    resultSendToList?.forEach(socket => {
      const stub = socket.emit as sinon.SinonStub
      sinon.assert.calledWithMatch(stub, GamesocketPaths.update)
    })
    resultIgnoreList?.forEach(socket => {
      const stub = socket.emit as sinon.SinonStub
      sinon.assert.notCalled(stub)
    })

  })

  it('should not send message when sockets were not found', () => {
    const mock = sinon.mock(socketStoreService['sockets'])
    mock.expects('get').returns(undefined)
    const sampleSize = 10
    const IgnoreList = givenListOfSocketData(sampleSize, {gameId: '2'})
    socketStoreService.sendToAll('2', GamesocketPaths.update)
    IgnoreList.forEach(socket => {
      const stub = socket.emit as sinon.SinonStub
      sinon.assert.notCalled(stub)
    })


  })

  it('should get sockets for given table id', () => {
    const sampleSize = 10
    const expectedList = givenListOfSocketData(sampleSize, {gameId: '1'})
    const IgnoreList = givenListOfSocketData(sampleSize, {gameId: '2'})
    registerAll(expectedList)
    registerAll(IgnoreList)

    const result = socketStoreService.get('1')
    expect(result).to.deepEqual(expectedList)
  })

  function registerAll(data: GameSocket[]) {
    data.forEach(element => {
      socketStoreService.add(element)
    });
  }
});

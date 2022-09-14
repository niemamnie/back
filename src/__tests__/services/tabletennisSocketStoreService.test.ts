import {expect} from '@loopback/testlab';
import sinon from 'sinon';
import TableTennisSocket from '../../intern/TableTennisSocket';
import {TabletennisSocketStoreService} from '../../services';
import {TabletennisSocketPaths} from '../../ws-controllers/TabletennisSocketPaths';
import {givenListOfSocketData} from '../fixtures/helpers/tabletennisSocekt.helper';
describe('Tabletennis Socket Service', () => {
  let socketStoreService = new TabletennisSocketStoreService()

  beforeEach(() => {
    socketStoreService = new TabletennisSocketStoreService()
  })

  it('should remember multiple sockets', () => {
    registerAll(givenListOfSocketData(5));

    expect(socketStoreService.size).to.eql(5);
  })

  it('should remember multiple sockets for multiple games', () => {
    const data = []
    const sampleSize = 10
    for (let i = 0; i < sampleSize; i++) {
      data.push(givenListOfSocketData(sampleSize, {tabletennis: i.toString()}))
    }

    data.forEach(el => {
      registerAll(el)
    })
    expect(socketStoreService['sockets']).to.Object()
    const map = socketStoreService['sockets']
    for (let i = 0; i < sampleSize; i++) {
      const list = map.get(i.toString())
      list?.forEach(element => {
        expect(element.tabletennis).to.equal(i.toString())
      })
    }
    expect(socketStoreService.size).to.equal(sampleSize * sampleSize)
  })

  it('should remove socket from map', () => {
    const sampleSize = 10
    const list = givenListOfSocketData(sampleSize, {tabletennis: '1'})
    registerAll(list)

    socketStoreService.remove(list[0])

    expect(socketStoreService.size).to.equal(sampleSize - 1)
    const map = socketStoreService['sockets']
    const resultList = map.get('1')
    expect(resultList?.length).to.equal(sampleSize - 1)
    const found = resultList?.find(socket => socket.id === list[0].id)
    expect(found).to.undefined()
  })


  it('should send message to all sockets', () => {
    const sampleSize = 10
    const sendToList = givenListOfSocketData(sampleSize, {tabletennis: '1'})
    const IgnoreList = givenListOfSocketData(sampleSize, {tabletennis: '2'})
    registerAll(sendToList)
    registerAll(IgnoreList)

    socketStoreService.sendToAll('1', TabletennisSocketPaths.tabletennisUpdate)

    const resultSendToList = socketStoreService.get('1')
    const resultIgnoreList = socketStoreService.get('2')
    expect(resultSendToList?.length).to.equal(sendToList.length)
    expect(resultIgnoreList?.length).to.equal(IgnoreList.length)

    resultSendToList?.forEach(socket => {
      const stub = socket.emit as sinon.SinonStub
      sinon.assert.calledWithMatch(stub, TabletennisSocketPaths.tabletennisUpdate)
    })
    resultIgnoreList?.forEach(socket => {
      const stub = socket.emit as sinon.SinonStub
      sinon.assert.notCalled(stub)
    })

  })



  function registerAll(data: TableTennisSocket[]) {
    data.forEach(element => {
      socketStoreService.add(element)
    });
  }
});

import {stub} from 'sinon';
import GameSocket from '../../../intern/TableTennisSocket';
let idCounter = 0;
export function givenTabletennisSocketData(data?: Partial<GameSocket>) {
  idCounter++
  return Object.assign(
    {
      id: idCounter.toString(),
      tabletennis: '0',
      emit: stub(),
      disconnect: stub(),
      handshake: {
        auth: {
          tabletennis: '0'
        } as unknown
      }
    } as unknown as GameSocket, data
  );
}



export function givenListOfSocketData(amount: number, data?: Partial<GameSocket>) {
  const list = []
  for (let i = 0; i < amount; i++) {
    list.push(givenTabletennisSocketData(data))
  }
  return list;
}


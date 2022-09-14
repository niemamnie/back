import {stub} from 'sinon';
import TableTennisSocket from '../../../intern/TableTennisSocket';
let idCounter = 0;
export function givenTabletennisSocketData(data?: Partial<TableTennisSocket>) {
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
    } as unknown as TableTennisSocket, data
  );
}



export function givenListOfSocketData(amount: number, data?: Partial<TableTennisSocket>) {
  const list = []
  for (let i = 0; i < amount; i++) {
    list.push(givenTabletennisSocketData(data))
  }
  return list;
}


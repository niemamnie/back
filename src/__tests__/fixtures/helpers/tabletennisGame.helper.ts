import {TabletennisGame} from '../../../models';
let idCounter = 0;
export function givenTabletennisGameData(data?: Partial<TabletennisGame>) {
  idCounter++
  return Object.assign({
    id: idCounter.toString(),
    name: "Test Game: " + idCounter.toString(),

  } as any, data)
}
export async function givenTabletennisGame(data?: Partial<TabletennisGame>) {
  // return new GamePlayerRepository(testdb)
  //   .create(givenTabletennisGameData(data))
}

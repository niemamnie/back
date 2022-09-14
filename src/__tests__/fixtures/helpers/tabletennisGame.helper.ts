import {TableTennisGame} from '../../../models';
import {TableTennisRepository} from '../../../repositories';
import {testdb} from '../datasources/testdb.datasource';
let idCounter = 0;
export function givenTabletennisGameData(data?: Partial<TableTennisGame>) {
  idCounter++
  return Object.assign({
    id: idCounter.toString(),
    name: "Test Game: " + idCounter.toString(),
    pointsFirstPlayer: 0,
    pointsSecondPlayer: 0
  } as TableTennisGame, data)
}
export async function givenTabletennisGame(data?: Partial<TableTennisGame>) {
  return await new TableTennisRepository(testdb)
    .create(givenTabletennisGameData(data))
}

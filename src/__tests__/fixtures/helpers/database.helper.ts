import {TableTennisRepository} from '../../../repositories';
import {testdb} from '../datasources/testdb.datasource';

export async function givenEmptyDb() {
  let tabletennisRepo: TableTennisRepository = new TableTennisRepository(testdb)
  await tabletennisRepo.deleteAll()
}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TableTennisGame, TableTennisGameWithRelations} from '../models';

export class TableTennisRepository extends DefaultCrudRepository<
  TableTennisGame,
  typeof TableTennisGame.prototype.id,
  TableTennisGameWithRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TableTennisGame, dataSource);
  }
}

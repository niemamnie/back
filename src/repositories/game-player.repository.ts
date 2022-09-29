import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {GamePlayer, GamePlayerRelations} from '../models';

export class GamePlayerRepository extends DefaultCrudRepository<
  GamePlayer,
  typeof GamePlayer.prototype.id,
  GamePlayerRelations
> {


  constructor(
    @inject('datasources.db') dataSource: DbDataSource,

  ) {
    super(GamePlayer, dataSource);
  }
}

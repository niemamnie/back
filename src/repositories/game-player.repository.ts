import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {GamePlayer, GamePlayerRelations, Player} from '../models';
import {PlayerRepository} from './player.repository';

export class GamePlayerRepository extends DefaultCrudRepository<
  GamePlayer,
  typeof GamePlayer.prototype.id,
  GamePlayerRelations
> {
  public readonly player: HasOneRepositoryFactory<Player, typeof Player.prototype.id>
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('PlayerRepository')
    getPlayerRepository: Getter<PlayerRepository>
  ) {
    super(GamePlayer, dataSource);
    this.player = this.createHasOneRepositoryFactoryFor(
      'playerId', getPlayerRepository)
    console.log('GamePlayerRepository created');

  }
}

import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {GamePlayer, Player, PlayerRelations} from '../models';
import {GamePlayerRepository} from './game-player.repository';

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.id,
  PlayerRelations
> {
  public readonly gamePlayer: HasOneRepositoryFactory<GamePlayer, typeof GamePlayer.prototype.id>
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @inject.getter('GamePlayerRepository')
    getGamePlayerRepository: Getter<GamePlayerRepository>
  ) {
    super(Player, dataSource);
    this.gamePlayer = this.createHasOneRepositoryFactoryFor('gamePlayer', getGamePlayerRepository)
  }
}

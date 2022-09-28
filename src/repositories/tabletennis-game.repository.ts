import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {GamePlayer, TabletennisGame, TabletennisGameWithRelations} from '../models';
import {GamePlayerRepository} from './game-player.repository';

export class TabletennisGameRepository extends DefaultCrudRepository<
  TabletennisGame,
  typeof TabletennisGame.prototype.id,
  TabletennisGameWithRelations
> {
  public readonly player: HasManyRepositoryFactory<
    GamePlayer, typeof GamePlayer.prototype.id>
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('GamePlayerRepository')
    gamePlayerRepositoryGetter: Getter<GamePlayerRepository>
  ) {
    super(TabletennisGame, dataSource);
    this.player = this.createHasManyRepositoryFactoryFor(
      'gamePlayers', gamePlayerRepositoryGetter)
  }
}

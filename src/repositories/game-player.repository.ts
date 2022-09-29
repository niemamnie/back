import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {GamePlayer, GamePlayerRelations, Player} from '../models';
import {PlayerRepository} from './player.repository';

export class GamePlayerRepository extends DefaultCrudRepository<
  GamePlayer,
  typeof GamePlayer.prototype.id,
  GamePlayerRelations
> {

  public readonly player: BelongsToAccessor<Player, typeof GamePlayer.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>,

  ) {
    super(GamePlayer, dataSource);
    this.player = this.createBelongsToAccessorFor('player', playerRepositoryGetter,);
    this.registerInclusionResolver('player', this.player.inclusionResolver);
  }
}

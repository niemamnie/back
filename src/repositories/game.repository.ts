import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Game, GamePlayer, GameWithRelations} from '../models';
import {GamePlayerRepository} from './game-player.repository';

export class GameRepository extends DefaultCrudRepository<
  Game,
  typeof Game.prototype.id,
  GameWithRelations
> {

  public readonly gamePlayers: HasManyRepositoryFactory<GamePlayer, typeof Game.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('GamePlayerRepository') protected gamePlayerRepositoryGetter: Getter<GamePlayerRepository>,
  ) {
    super(Game, dataSource);
    this.gamePlayers = this.createHasManyRepositoryFactoryFor('gamePlayers', gamePlayerRepositoryGetter,);
    this.registerInclusionResolver('gamePlayers', this.gamePlayers.inclusionResolver);

  }
}

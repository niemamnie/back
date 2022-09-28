import {belongsTo, DataObject, Entity, model, property} from '@loopback/repository';
import {Player, PlayerWithRelations} from './player.model';
import {Game, GameWithRelations} from './tabletennis/game.model';

@model()
export class GamePlayer extends Entity {
  constructor(data?: DataObject<GamePlayer>) {
    super(data);
    if (!(this.playerId && this.gameId))
      throw new Error(
        'Could not create GamePlayer: player or game is not defined')

  }
  @property({id: true, generated: true})
  id: string;
  @property()
  inGameIndex: number;


  @property({default: 0})
  points: number;

  @belongsTo(() => Player)
  playerId?: string;

  @belongsTo(() => Game)
  gameId: string;

}
export class GamePlayerRelations {
  game: GameWithRelations
  player: PlayerWithRelations
}
export type GamePlayerWithRelations = GamePlayer & GamePlayerRelations

import {DataObject, Entity, model, property, belongsTo} from '@loopback/repository';
import {Player} from './player.model';

@model()
export class GamePlayer extends Entity {
  constructor(data?: DataObject<GamePlayer>) {
    super(data);
    // if (!(this.player && this.gameId))
    //   throw new Error(
    //     'Could not create GamePlayer: player or game is not defined')

  }
  @property({id: true, generated: true})
  id: string;
  @property()
  inGameIndex: number;
  @property({default: 0})
  points: number;

  @belongsTo(() => Player)
  playerId: string;
  @property({
    type: 'string',
  })
  gameId?: string;
}
export class GamePlayerRelations {
}
export type GamePlayerWithRelations = GamePlayer & GamePlayerRelations

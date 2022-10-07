import {belongsTo, DataObject, Entity, model, property} from '@loopback/repository';
import {Player, PlayerWithRelations} from './player.model';

@model()
export class GamePlayer extends Entity {
  constructor(data?: DataObject<GamePlayer>) {
    super(data);

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
  player: PlayerWithRelations
}
export type GamePlayerWithRelations = GamePlayer & GamePlayerRelations

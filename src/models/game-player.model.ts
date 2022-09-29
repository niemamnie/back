import {DataObject, Entity, model, property} from '@loopback/repository';

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


  @property({
    type: 'string',
  })
  gameId?: string;
}
export class GamePlayerRelations {
}
export type GamePlayerWithRelations = GamePlayer & GamePlayerRelations

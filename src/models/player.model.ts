import {Entity, hasOne, model, property, PropertyDefinition} from '@loopback/repository';
import {GamePlayer} from './game-player.model';

@model()
export class Player extends Entity {
  @property({id: true, generated: true} as Partial<PropertyDefinition>)
  id: string;
  @property()
  name: string;


  @hasOne(() => GamePlayer)
  gamePlayer: GamePlayer;
}

export class PlayerRelations {
}

export type PlayerWithRelations = Player & PlayerRelations

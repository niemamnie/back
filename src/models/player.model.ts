import {belongsTo, Entity, model, property, PropertyDefinition} from '@loopback/repository';
import {GamePlayer} from './game-player.model';

@model()
export class Player extends Entity {
  @property({id: true, generated: true} as Partial<PropertyDefinition>)
  id: string;
  @property()
  name: string;


  @belongsTo(() => GamePlayer)
  gamePlayerId: string;

}

export class PlayerRelations {

}

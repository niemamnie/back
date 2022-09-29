import {Entity, model, property, PropertyDefinition} from '@loopback/repository';

@model()
export class Player extends Entity {
  @property({id: true, generated: true} as Partial<PropertyDefinition>)
  id: string;
  @property()
  name: string;


}

export class PlayerRelations {
}

export type PlayerWithRelations = Player & PlayerRelations

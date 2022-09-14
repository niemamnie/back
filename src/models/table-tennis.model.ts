import {Entity, model, property, PropertyDefinition} from '@loopback/repository';

@model()
export class TableTennisGame extends Entity {

  constructor(data?: Partial<TableTennisGame>) {
    super(data);

  }

  static createRandom(): TableTennisGame {
    const newGame = new TableTennisGame()
    newGame.name = "Random Game"
    return newGame
  }

  @property({id: true, generated: true} as Partial<PropertyDefinition>)
  id: string;

  @property()
  name: string;

  @property({default: 0})
  pointsFirstPlayer: number;
  @property({default: 0})
  pointsSecondPlayer: number;



}

export interface TableTennisGameRelations {
  // describe navigational properties here
}

export type TableTennisGameWithRelations
  = TableTennisGame & TableTennisGameRelations;

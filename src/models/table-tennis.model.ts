import {Entity, model, property} from '@loopback/repository';

@model()
export class TableTennisGame extends Entity {

  constructor(data?: Partial<TableTennisGame>) {
    super(data);

  }

  static createRandom(id: string): TableTennisGame {
    var newGame = new TableTennisGame({id})
    newGame.id = id;
    newGame.name = "Random Game: " + newGame.id
    return newGame
  }

  @property({id: true})
  id: string;

  @property()
  name: string;

  @property()
  pointsFirstPlayer: number;
  @property()
  pointsSecondPlayer: number;



}

export interface TableTennisGameRelations {
  // describe navigational properties here
}

export type TableTennisGameWithRelations
  = TableTennisGame & TableTennisGameRelations;

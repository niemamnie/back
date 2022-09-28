import {Entity, hasMany, model, property, PropertyDefinition} from '@loopback/repository';
import {GamePlayer} from '../game-player.model';

@model()
export class TabletennisGame extends Entity {

  constructor(data?: Partial<TabletennisGame>) {
    super(data);

  }

  static createRandom(): TabletennisGame {
    const newGame = new TabletennisGame()
    newGame.name = "Random Game"
    return newGame
  }

  @property({id: true, generated: true} as Partial<PropertyDefinition>)
  id: string;

  @property()
  name: string;

  @hasMany(() => GamePlayer)
  gamePlayers: GamePlayer[];

}

export interface TabletennisGameRelations {
  // describe navigational properties here
}

export type TabletennisGameWithRelations
  = TabletennisGame & TabletennisGameRelations;

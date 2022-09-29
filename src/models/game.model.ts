import {Entity, hasMany, model, property, PropertyDefinition} from '@loopback/repository';
import {GamePlayer} from './game-player.model';

@model()
export class Game extends Entity {

  @property({id: true, generated: true} as Partial<PropertyDefinition>)
  id: string;

  @property()
  gameType: string;

  @property()
  name: string;

  @hasMany(() => GamePlayer)
  gamePlayers: GamePlayer[];

  constructor(data?: Partial<Game>) {
    super(data);
    if (!this.gameType) throw new Error('unknown/undefined game type is not supported')
  }

  static createRandom(gameType: string): Game {
    const newGame = new Game({gameType})
    newGame.name = "Random Game"
    return newGame
  }
}

export interface GameRelations {
  // describe navigational properties here
}

export type GameWithRelations
  = Game & GameRelations;

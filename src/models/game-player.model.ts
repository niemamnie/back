import {belongsTo, DataObject, Entity, hasOne, model, property} from '@loopback/repository';
import {Player} from './player.model';
import {TabletennisGame} from './tabletennis/tabletennis-game.model';

@model()
export class GamePlayer extends Entity {
  constructor(data?: DataObject<GamePlayer>)
  constructor(data?: DataObject<GamePlayer>, playerId?: string, gameId?: string) {
    super(data);
    if (playerId)
      this.playerId = playerId
    if (gameId)
      this.tabletennisGameId = gameId
  }
  @property({id: true, generated: true})
  id: string;
  @property()
  inGameIndex: number;
  @property()
  gameType: string;

  @property({default: 0})
  points: number;

  @property()
  @hasOne(() => Player, {keyTo: 'gamePlayerId'})
  playerId: string;

  @belongsTo(() => TabletennisGame)
  tabletennisGameId: string;

}
export class GamePlayerRelations {

}

// Uncomment these imports to begin using these cool features!

import {service} from '@loopback/core';
import {socketio} from '@loopback/socketio';
import GameSocket from '../intern/TableTennisSocket';
import TabletennisWinner from '../models/tabletennis/table-tennis-winner';
import {GameService, GameSocketStoreService} from '../services';
import GamePlayerService from '../services/game-player.service';
import {GamesocketPaths as GameSocketPaths} from './TabletennisSocketPaths';

// import {inject} from '@loopback/core';
export class GameSocketioController {
  constructor(
    @socketio.socket() // Equivalent to `@inject('ws.socket')`
    private socket: GameSocket,
    @service(GameService) private gameService: GameService,
    @service(GameSocketStoreService)
    private socketStore: GameSocketStoreService,
    @service(GamePlayerService)
    private gamePlayerService: GamePlayerService
  ) {
    console.log('socket controller created');

  }

  @socketio.connect()
  async connect(socket: GameSocket) {
    console.log('socket connect');

    if (socket.handshake.auth.gameId) {
      socket.gameId = socket.handshake.auth.gameId
      const game = await this.gameService.getById(socket.gameId!)
      this.socketStore.add(socket)
      socket.emit(GameSocketPaths.get, game)
    } else {
      socket.disconnect();
    }
  }

  @socketio.subscribe(GameSocketPaths.update)
  async update(playerId: string, change: number) {
    try {
      const newState = await this.gamePlayerService.changePointsOfPlayer(playerId, change)

      this.socketStore.sendToAll(
        this.socket.gameId,
        GameSocketPaths.update,
        newState)
    } catch (error) {
      console.log(error);
    }
  }
  @socketio.subscribe(GameSocketPaths.winner)
  async winner(gamePlayerId: string) {
    //TODO remove/mark/create record of ended game
    const gamePlayer = await this.gamePlayerService.findByIdWrelations(gamePlayerId)
    const winner = new TabletennisWinner(gamePlayer.points, gamePlayer.player.name)
    this.socketStore.sendToAll(this.socket.gameId,
      GameSocketPaths.winner, winner)
  }


  @socketio.disconnect()
  disconnect() {
    this.socketStore.remove(this.socket)
  }

}

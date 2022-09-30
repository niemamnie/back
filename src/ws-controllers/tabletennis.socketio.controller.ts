// Uncomment these imports to begin using these cool features!

import {service} from '@loopback/core';
import {socketio} from '@loopback/socketio';
import GameSocket from '../intern/TableTennisSocket';
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
  }

  @socketio.connect()
  async connect(socket: GameSocket) {
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
      const game =
        await this.gameService.getById(this.socket.gameId)
      // if (gameChange.pointsFirstPlayer)
      //   gameChange.pointsFirstPlayer += game.pointsFirstPlayer
      // if (gameChange.pointsSecondPlayer)
      //   gameChange.pointsSecondPlayer += game.pointsSecondPlayer
      // await this.gameService.update(game.id, gameChange)
      const newState =
        await this.gameService.getById(this.socket.gameId)
      this.socketStore.sendToAll(
        this.socket.gameId,
        GameSocketPaths.update,
        newState)
    } catch (error) {
      console.log(error);
    }
  }
  @socketio.subscribe(GameSocketPaths.winner)
  async winner(playerId: number) {
    const game = await this.gameService.getById(this.socket.gameId)
    let playerWon;
    // if (playerId === 1) {
    //   playerWon = new TabletennisWinner(game.pointsFirstPlayer, 'first Player')
    // } else {
    //   playerWon =
    //     new TabletennisWinner(game.pointsSecondPlayer, 'second Player')
    // }
    this.socketStore.sendToAll(this.socket.gameId,
      GameSocketPaths.winner, playerWon)
  }


  @socketio.disconnect()
  disconnect() {
    this.socketStore.remove(this.socket)
  }

}

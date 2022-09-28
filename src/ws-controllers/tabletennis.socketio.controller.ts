// Uncomment these imports to begin using these cool features!

import {service} from '@loopback/core';
import {socketio} from '@loopback/socketio';
import TableTennisSocket from '../intern/TableTennisSocket';
import {Game} from '../models';
import {GameService, TabletennisSocketStoreService} from '../services';
import {TabletennisSocketPaths} from './TabletennisSocketPaths';

// import {inject} from '@loopback/core';
export class TabletennisSocketioController {
  constructor(
    @socketio.socket() // Equivalent to `@inject('ws.socket')`
    private socket: TableTennisSocket,
    @service(GameService) private tabletennisService: GameService,
    @service(TabletennisSocketStoreService)
    private socketStore: TabletennisSocketStoreService
  ) {
  }

  @socketio.connect()
  async connect(socket: TableTennisSocket) {
    if (socket.handshake.auth.tabletennis) {
      socket.tabletennis = socket.handshake.auth.tabletennis
      const game = await this.tabletennisService.getById(socket.tabletennis!)
      this.socketStore.add(socket)
      socket.emit(TabletennisSocketPaths.get, game)

    } else {
      socket.disconnect();
    }
  }

  @socketio.subscribe(TabletennisSocketPaths.update)
  async update(gameChange: Game) {
    try {
      const game =
        await this.tabletennisService.getById(this.socket.tabletennis)
      // if (gameChange.pointsFirstPlayer)
      //   gameChange.pointsFirstPlayer += game.pointsFirstPlayer
      // if (gameChange.pointsSecondPlayer)
      //   gameChange.pointsSecondPlayer += game.pointsSecondPlayer
      await this.tabletennisService.update(game.id, gameChange)
      const newState =
        await this.tabletennisService.getById(this.socket.tabletennis)
      this.socketStore.sendToAll(
        this.socket.tabletennis,
        TabletennisSocketPaths.update,
        newState)
    } catch (error) {
      console.log(error);
    }
  }
  @socketio.subscribe(TabletennisSocketPaths.winner)
  async winner(playerId: number) {
    const game = await this.tabletennisService.getById(this.socket.tabletennis)
    let playerWon;
    // if (playerId === 1) {
    //   playerWon = new TabletennisWinner(game.pointsFirstPlayer, 'first Player')
    // } else {
    //   playerWon =
    //     new TabletennisWinner(game.pointsSecondPlayer, 'second Player')
    // }
    this.socketStore.sendToAll(this.socket.tabletennis,
      TabletennisSocketPaths.winner, playerWon)
  }


  @socketio.disconnect()
  disconnect() {
    this.socketStore.remove(this.socket)
  }

}

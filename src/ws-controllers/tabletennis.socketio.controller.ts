// Uncomment these imports to begin using these cool features!

import {service} from '@loopback/core';
import {socketio} from '@loopback/socketio';
import TableTennisSocket from '../intern/TableTennisSocket';
import {TableTennisGame} from '../models';
import {TableTennisService, TabletennisSocketStoreService} from '../services';
import {TabletennisSocketPaths} from './TabletennisSocketPaths';

// import {inject} from '@loopback/core';
export class TabletennisSocketioController {
  constructor(
    @socketio.socket() // Equivalent to `@inject('ws.socket')`
    private socket: TableTennisSocket,
    @service(TableTennisService) private tabletennisService: TableTennisService,
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
      socket.emit(TabletennisSocketPaths.tabletennisGet, game)

    } else {
      socket.disconnect();
    }
  }

  @socketio.subscribe(TabletennisSocketPaths.tabletennisUpdate)
  async update(gameChange: TableTennisGame) {
    try {
      const game =
        await this.tabletennisService.getById(this.socket.tabletennis)
      if (gameChange.pointsFirstPlayer)
        gameChange.pointsFirstPlayer += game.pointsFirstPlayer
      if (gameChange.pointsSecondPlayer)
        gameChange.pointsSecondPlayer += game.pointsSecondPlayer
      await this.tabletennisService.update(game.id, gameChange)
      const newState =
        await this.tabletennisService.getById(this.socket.tabletennis)
      this.socketStore.sendToAll(
        this.socket.tabletennis,
        TabletennisSocketPaths.tabletennisUpdate,
        newState)
    } catch (error) {
      console.log(error);

    }
  }



  @socketio.disconnect()
  disconnect() {
    this.socketStore.remove(this.socket)
  }

}

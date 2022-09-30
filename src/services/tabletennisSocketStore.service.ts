import {BindingScope, injectable} from '@loopback/core';
import GameSocket from '../intern/TableTennisSocket';
import {GamesocketPaths} from '../ws-controllers/TabletennisSocketPaths';

@injectable({scope: BindingScope.SINGLETON})
export class GameSocketStoreService {
  private readonly sockets = new Map<string, GameSocket[]>()

  public add(socket: GameSocket) {
    if (socket.gameId) {
      const sockets = this.sockets.get(socket.gameId)
      if (sockets) {
        sockets.push(socket)
      } else {
        this.sockets.set(socket.gameId, [socket])
      }
    }
  }

  public remove(socket: GameSocket) {
    if (socket.gameId) {
      const sockets = this.sockets.get(socket.gameId)
      if (sockets) {
        const filtered = sockets.filter((s) => s.id !== socket.id)
        this.sockets.set(socket.gameId, filtered)
      }
    }
  }

  public get(tabletennis: string) {
    return this.sockets.get(tabletennis)
  }

  public sendToAll(gameId: string, channel: GamesocketPaths,
    data?: object) {
    const sockets = this.sockets.get(gameId)
    if (sockets) {
      sockets.forEach((socket) => socket.emit(channel, data)
      )
    }
  }

  get size(): number {
    let c = 0
    for (const e of this.sockets.entries()) {
      c += e[1].length
    }
    return c
  }


}

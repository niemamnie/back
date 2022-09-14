import {BindingScope, injectable} from '@loopback/core';
import TableTennisSocket from '../intern/TableTennisSocket';
import {TabletennisSocketPaths} from '../ws-controllers/TabletennisSocketPaths';

@injectable({scope: BindingScope.SINGLETON})
export class TabletennisSocketStoreService {
  private readonly sockets = new Map<string, TableTennisSocket[]>()

  public add(socket: TableTennisSocket) {
    if (socket.tabletennis) {
      const sockets = this.sockets.get(socket.tabletennis)
      if (sockets) {
        sockets.push(socket)
      } else {
        this.sockets.set(socket.tabletennis, [socket])
      }
    }
  }

  public remove(socket: TableTennisSocket) {
    if (socket.tabletennis) {
      const sockets = this.sockets.get(socket.tabletennis)
      if (sockets) {
        const filtered = sockets.filter((s) => s.id !== socket.id)
        this.sockets.set(socket.tabletennis, filtered)
      }
    }
  }

  public get(tabletennis: string) {
    return this.sockets.get(tabletennis)
  }

  public sendToAll(gameId: string, channel: TabletennisSocketPaths,
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

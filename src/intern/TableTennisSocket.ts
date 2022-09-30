import {Socket} from 'socket.io';

export default class GameSocket extends Socket {
  gameId: string;
  gameType: string;
}

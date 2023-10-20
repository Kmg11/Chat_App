import type { Socket } from 'socket.io-client';
import type {
  ClientToServerEventsType,
  ServerToClientEventsType,
  SocketStateType
} from './socket.types';

export function socketListeners(
  socket: Socket<ServerToClientEventsType, ClientToServerEventsType>,
  socketState: SocketStateType
) {
  socket.on('connect', () => {
    socketState.connected = true;
    socketState.connectionLoading = false;
    socketState.connectionError = null;
  });

  socket.on('connect_error', () => {
    socketState.connected = false;
    socketState.connectionLoading = false;
    socketState.connectionError = "Couldn't connect to the server";
  });

  socket.on('disconnect', () => {
    socketState.connected = false;
  });

  socket.on('roomList', ({ rooms }) => {
    socketState.rooms = rooms;
  });

  socket.on('userList', ({ users }) => {
    socketState.joinedRoom.users = users;
  });

  socket.on('message', (msg) => {
    socketState.joinedRoom.messages.push(msg);
  });
}

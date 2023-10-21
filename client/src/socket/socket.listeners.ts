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
    if (
      msg.user.id === socketState.joinedRoom.activity?.user.id &&
      socketState.joinedRoom.activity?.timer
    ) {
      clearTimeout(socketState.joinedRoom.activity?.timer);
      socketState.joinedRoom.activity = undefined;
    }

    socketState.joinedRoom.messages.push(msg);
  });

  socket.on('activity', ({ user }) => {
    if (socketState.joinedRoom.activity?.timer) {
      clearTimeout(socketState.joinedRoom.activity?.timer);
    }

    socketState.joinedRoom.activity = {
      user,
      timer: setTimeout(() => {
        socketState.joinedRoom.activity = undefined;
      }, 1000)
    };
  });
}

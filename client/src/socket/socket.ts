import { reactive } from 'vue';
import { io, Socket } from 'socket.io-client';
import type {
  ClientToServerEventsType,
  ServerToClientEventsType,
  SocketStateType,
  UserType
} from './socket.types';

export const socketState = reactive<SocketStateType>({
  connected: false,
  connectionLoading: true,
  connectionError: null,

  rooms: [],

  joinedRoom: {
    name: null,
    users: []
  }
});

const URL = import.meta.env.SOCKET_URL ?? 'ws://localhost:3500';

export const socket: Socket<ServerToClientEventsType, ClientToServerEventsType> = io(URL);

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

export function enterRoom({ name, room }: Pick<UserType, 'name' | 'room'>) {
  socket.emit('enterRoom', { name, room });
  socketState.joinedRoom.name = room;
}

export function leaveRoom() {
  socket.emit('leaveRoom');
  socketState.joinedRoom.name = null;
  socketState.joinedRoom.users = [];
}

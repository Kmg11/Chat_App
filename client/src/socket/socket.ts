import { reactive, watch } from 'vue';
import { io, Socket } from 'socket.io-client';
import type {
  ClientToServerEventsType,
  ServerToClientEventsType,
  SocketStateType,
  UserType
} from './socket.types';

export const socketState = reactive<SocketStateType>({
  connected: false,
  rooms: [],
  joinedRoom: null
});

const URL = import.meta.env.SOCKET_URL ?? 'ws://localhost:3500';

export const socket: Socket<ServerToClientEventsType, ClientToServerEventsType> = io(URL);

socket.on('connect', () => {
  socketState.connected = true;
});

socket.on('disconnect', () => {
  socketState.connected = false;
});

socket.on('roomList', ({ rooms }) => {
  socketState.rooms = rooms;
});

export function enterRoom({ name, room }: Pick<UserType, 'name' | 'room'>) {
  socket.emit('enterRoom', { name, room });
  socketState.joinedRoom = room;
}

watch([socketState], () => {
  console.log(socketState);
});

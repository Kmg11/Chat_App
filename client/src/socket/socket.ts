import { reactive } from 'vue';
import { io, Socket } from 'socket.io-client';
import type {
  ClientToServerEventsType,
  ServerToClientEventsType,
  SocketStateType
} from './socket.types';
import { socketListeners } from './socket.listeners';

export const socketState = reactive<SocketStateType>({
  connected: false,
  connectionLoading: true,
  connectionError: null,

  rooms: [],

  joinedRoom: {
    name: null,
    users: [],
    messages: [],
    currentUser: { id: '', name: '' }
  }
});

const URL = import.meta.env.SOCKET_URL ?? 'ws://localhost:3500';

export const socket: Socket<
  ServerToClientEventsType,
  ClientToServerEventsType
> = io(URL);

socketListeners(socket, socketState);

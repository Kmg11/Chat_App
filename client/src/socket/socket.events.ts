import type { MessageType, UserType } from '@/types';
import { socket, socketState } from './socket';

export function enterRoom({ name, room }: Pick<UserType, 'name' | 'room'>) {
  socket.emit('enterRoom', { name, room });
  socketState.joinedRoom = {
    currentUser: { id: socket.id, name },
    messages: [],
    name: room,
    users: []
  };
}

export function leaveRoom() {
  socket.emit('leaveRoom');
  socketState.joinedRoom = {
    currentUser: { id: '', name: '' },
    messages: [],
    name: null,
    users: []
  };
}

export function sendMessage({ text }: Pick<MessageType, 'text'>) {
  socket.emit('message', { text });
}

export function sendActivity() {
  socket.emit('activity');
}

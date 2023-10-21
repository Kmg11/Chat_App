import type { MessageType, UserType } from '@/types';

export interface SocketStateType {
  connected: boolean;
  connectionLoading: boolean;
  connectionError: string | null;

  rooms: UserType['room'][];

  joinedRoom: {
    name: UserType['room'] | null;
    users: UserType[];
    messages: MessageType[];
    currentUser: { id: string; name: string };
    activity?: { user: UserType; timer: ReturnType<typeof setTimeout> };
  };
}

export interface ServerToClientEventsType {
  roomList: ({ rooms }: { rooms: UserType['room'][] }) => void;
  userList: ({ users }: { users: UserType[] }) => void;
  message: (msg: MessageType) => void;
  activity: ({ user }: { user: UserType }) => void;
}

export interface ClientToServerEventsType {
  enterRoom: ({ name, room }: Pick<UserType, 'name' | 'room'>) => void;
  leaveRoom: () => void;
  activity: () => void;
  message: ({ text }: Pick<MessageType, 'text'>) => void;
}

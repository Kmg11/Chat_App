export interface UserType {
  id: string;
  name: string;
  room: string;
}

export interface MessageType {
  name: UserType['name'];
  text: string;
  time: string;
}

export interface SocketStateType {
  connected: boolean;
  connectionLoading: boolean;
  connectionError: string | null;

  rooms: UserType['room'][];

  joinedRoom: {
    name: UserType['room'] | null;
    users: UserType[];
  };
}

export interface ServerToClientEventsType {
  roomList: ({ rooms }: { rooms: UserType['room'][] }) => void;
  userList: ({ users }: { users: UserType[] }) => void;
  message: (msg: MessageType) => void;
  activity: (name: string) => void;
}

export interface ClientToServerEventsType {
  enterRoom: ({ name, room }: Pick<UserType, 'name' | 'room'>) => void;
  leaveRoom: () => void;
  activity: (name: string) => void;
  message: ({ name, text }: Pick<MessageType, 'name' | 'text'>) => void;
}

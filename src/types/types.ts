export interface User {
  id: string;
  username: string;
  email: string;
}

export interface UsersData {
  users: User[];
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  owner: User;
}

export interface MeetingsData {
  meetings: Meeting[];
}

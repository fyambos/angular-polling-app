export interface User {
    uid: string;
    email: string;
    nickname?: string;
    role: 'admin' | 'user';
    createdAt?: Date;
    updatedAt?: Date;
  }
export type UserRole = 'admin' | 'vecino';
export type UserStatus = 'active' | 'pending' | 'banned';

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: UserRole;
  communityId: string;
  status: UserStatus;
  createdAt: any;
}

export interface User {
  id: string;
  name: string;
  role: 'user' | 'admin' | 'superadmin';
  active: boolean;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  updatingId: string | null;
}
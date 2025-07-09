export interface AdminState {
  loading: boolean;
  error: string | null;
  newAdmin: CreatedAdmin | null;
}

export interface NewAdminInput {
  name: string;
  username: string;
  password: string;
}

export interface CreatedAdmin {
  id: string;
  name: string;
} 
export interface AuthState {
  user: import("./user").User | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType {
  user: import("./user").User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
} 
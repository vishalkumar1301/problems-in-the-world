import { User } from './User';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
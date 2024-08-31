export interface User {
  user_id?: number;
  username: string;
  email: string;
  password_hash: string;
  is_admin: boolean;
  created_at?: string;
}

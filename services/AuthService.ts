import { User } from '@/lib/interfaces/User';
import { LoginCredentials } from '@/lib/interfaces/LoginCredentials';
import { SignupCredentials } from '@/lib/interfaces/SignupCredentials';

class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    
    return response.json();
  }

  async signup(credentials: SignupCredentials): Promise<User> {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }
    
    return response.json();
  }
}

export const authService = new AuthService();
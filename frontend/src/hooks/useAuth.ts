import { useSelector } from 'react-redux'

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface RootState {
  auth: AuthState;
}

export const useAuth = () => {
  const { user, token, isAuthenticated } = useSelector((state: RootState) => state.auth)
  
  return {
    user,
    token,
    isAuthenticated,
    isLoggedIn: isAuthenticated,
    currentUser: user
  }
}
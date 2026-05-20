import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const PublicRoute = ({ children }: { children: React.ReactNode }  ) => {
  const { isAuthenticated } = useAuth()
  
  if (isAuthenticated) {
    return <Navigate to="/all-issues" replace />
  }

  return children
}

export default PublicRoute

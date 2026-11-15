import { useAppSelector } from '@/hooks/use-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const location = useLocation()
  const isAuthenticated = useAppSelector((root) => root.signin?.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to='/sign-in' replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute

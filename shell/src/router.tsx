
import { Navigate, useRoutes } from 'react-router-dom';
import AppShell from './components/app-shell';
import Welcome from './pages/Welcome';
import Dashboard from './pages/dashboard/Dashboard';
import NotFoundError from './pages/errors/not-found-error';
import App from './App';


let userRoutes = [
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'microfrontend', element: <App /> },
]

export const RouteElements = () => {
  return useRoutes([
    {
      path: '/welcome',
      element: <Welcome />,
    },
    {
      path: '*',
      element: <Navigate to="/404" />,
    },
    {
      path: '/',
      element: <Navigate to="/welcome" />,
    },
    {
      path: '/',
      element: <AppShell />,
      children: userRoutes
    },
    {
      path: '/404',
      element: <NotFoundError />,
    },
  ])
}
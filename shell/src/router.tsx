
import { Navigate, useRoutes } from 'react-router-dom';
import AppShell from './components/app-shell';
import Welcome from './pages/Welcome';
import Dashboard from './pages/dashboard/Dashboard';
import NotFoundError from './pages/errors/not-found-error';
import App from './App';
import JavaScript from './pages/javaScriptPractice';
import RandomParticipants from './pages/RandomPaticipates';
import UserDetails from './pages/user/User';
import ProfileForm from './pages/user/Profile';
import ListTable from './pages/task/ListTask';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signin/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import UploadDocuments from './pages/upload_documents/UploadDocuments';

let userRoutes = [
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'microfrontend', element: <App /> },
  { path: 'javascript', element: <JavaScript /> },
  { path: 'randomParticipants', element: <RandomParticipants /> },
  { path: 'userdetails', element: <UserDetails /> },
  { path: 'profile', element: <ProfileForm /> },
  { path: 'task', element: <ListTable /> },
  { path: 'upload', element: <UploadDocuments /> },
]

export const RouteElements = () => {
  return useRoutes([
    {
      path: '/welcome',
      element: <Welcome />,
    },
    {
      path: '/sign-in',
      element: <SignIn />,
    },
    {
      path: '/sign-up',
      element: <SignUp />,
    },
     {
      path: '/signin',
      element: <SignIn />,
    },
    {
      path: '*',
      element: <Navigate to="/404" />,
    },
    {
      path: '/',
      element: <Navigate to="/signin" />,
    },
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <AppShell />,
          children: userRoutes,
        },
      ],
    },
    {
      path: '/404',
      element: <NotFoundError />,
    },
  ])
}
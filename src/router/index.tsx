import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import sideMenuRouters from './side-menu';

const Login = lazy(() => import('../view/login'));
const Layout = lazy(() => import('../layout'));
const routes = [
  {
    path: '/',
    element: <Navigate to="/project" />
  },
  {
    path: '/',
    element: <Layout />,
    children: [...sideMenuRouters]
  }, // 左侧菜单区域
  {
    path: '/login',
    element: <Login />
  }
];

export default routes;

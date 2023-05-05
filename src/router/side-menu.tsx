import { lazy } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

const Project = lazy(() => import('../view/project'));
const ProjectOverView = lazy(() => import('../view/project-overview'));
const ChatRoom = lazy(() => import('../view/chat-room'));
const GraphView = lazy(() => import('../view/graph-view/inidex'));

const sideMenuRouters = [
  {
    path: '/project',
    element: <Project />,
    children: [],
    meta: {
      side: true,
      name: '项目列表',
      icon: 'iconattribute'
    }
  },
  {
    path: '/project/:id',
    element: <ProjectOverView />,
    meta: {
      side: false,
      name: '项目详情'
    }
  },
  {
    path: '/chartroom',
    element: <ChatRoom />,
    meta: {
      side: true,
      name: '聊天室'
    }
  },
  {
    path: '/view',
    element: <GraphView />,
    meta: {
      side: true,
      name: '视图'
    }
  }
];

export default sideMenuRouters;

import React from 'react';
import {
  createBrowserRouter,
  createHashRouter,
  Navigate,
} from "react-router-dom";
import NavBar from '../pages/NavBar';
import Box from '@/pages/Components/Box';
import Logo from '@/pages/Components/Logo';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/navbar" /> // <-- redirect
  },
  {
    path: '/navbar',
    element: <NavBar />,
  },
  {
    path: '/3DBox',
    element: <Box />,
  },
  {
    path: '/logo',
    element: <Logo />,
  },
])
 
export default router;
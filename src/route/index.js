import React from 'react';
import {
  createBrowserRouter,
  createHashRouter,
  Navigate,
} from "react-router-dom";
import MyApp from '../pages/test/MyApp';
import TestComp from '../pages/test/TestComp';
import Test from '../pages/test';


const router = createBrowserRouter([
  {
    path: '/test',
    element: <Test />,
    children: [
      {
        path: "testComp",
        element: <TestComp />,
      },
      {
        path: "myApp",
        element: <MyApp />,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/test" /> // <-- redirect
  },
])
 
export default router;
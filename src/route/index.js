import React from 'react';
import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Tensorflow from '../pages/tensorflow';
import Example1 from '../pages/tensorflow/exampleComponents/Example1';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/tensorflow" replace/> // <-- redirect
  },
  {
    path: '/tensorflow',
    element: <Tensorflow />,
  },
  {
    path: '/example1',
    element: <Example1 />,
  },
])
 
export default router;
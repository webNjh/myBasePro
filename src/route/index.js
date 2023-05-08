import React from 'react';
import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Tensorflow from '../pages/tensorflow';
import LinearRegression from '../pages/tensorflow/exampleComponents/LinearRegression';

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
    path: '/linearRegression',
    element: <LinearRegression />,
  },
])
 
export default router;
import React from 'react';
import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Tensorflow from '../pages/tensorflow';
import LinearRegression from '../pages/tensorflow/exampleComponents/LinearRegression';
import Normalization from '../pages/tensorflow/exampleComponents/Normalization';

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
  {
    path: '/normalization',
    element: <Normalization />,
  },
])
 
export default router;
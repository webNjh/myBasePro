// import React from 'react';
import type { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import {
  RouterProvider,
} from "react-router-dom";
import router from './route/index';

const App: FC = () => {

  return (
    <RouterProvider router={router} />
  );
}

export default hot(App);

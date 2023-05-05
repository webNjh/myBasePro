import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import TestComp from '../TestComp';

const MyApp: FC = () => {
  return (
    <div>
      MyApp
      {/* <TestComp /> */}
      {/* <Outlet /> */}
    </div>
  );
}

export default MyApp;

import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

function Test() {
  return (
    <>
      <NavLink to="testComp">p1</NavLink>
      <NavLink to="myApp">p2</NavLink>
      <Outlet/>
    </>
  );
}

export default Test;

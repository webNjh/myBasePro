import React, { FC } from 'react';
import { NavLink } from "react-router-dom";

const NavBar: FC = () => {
  return (
    <div style={{ display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <NavLink to="/3DBox" style={{ fontSize: 16 }}>3DBox</NavLink>
      <NavLink to="/logo" style={{ fontSize: 16 }}>数梦logo</NavLink>
    </div>
  )
}

export default NavBar;
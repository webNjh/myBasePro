import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
// import * as tf from '@tensorflow/tfjs';
import Styles from './index.module.less';

const Tensorflow: FC = () => {
  
  return (
    <div className={Styles.tensorflow}>
      <header>
        <h1>Hello Tensorflow</h1>
      </header>
      <nav className={Styles.nav}>
        <NavLink to="/linearRegression">线性回归</NavLink>
        <NavLink to="/normalization">归一化</NavLink>
        <NavLink to="/logisticRegression">逻辑回归</NavLink>
        <NavLink to="/xorRegression">XOR逻辑回归</NavLink>
      </nav>
    </div>
  );
}

export default Tensorflow;

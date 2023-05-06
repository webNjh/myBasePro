import React from 'react';
import { NavLink } from 'react-router-dom';
import * as tf from '@tensorflow/tfjs';
import Styles from './index.module.less';

function Tensorflow() {
  
  return (
    <div className={Styles.tensorflow}>
      <header>
        <h1>Hello Tensorflow</h1>
      </header>
      <nav>
        <NavLink to="/example1">线性回归</NavLink>
      </nav>
    </div>
  );
}

export default Tensorflow;

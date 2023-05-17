/*
* 逻辑回归
*/
import { useEffect, useState } from 'react';
import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs';
import { TensorData } from '../common';
import { getData } from './utils';

function LogisticRegression() {
  // 可视化散点图
  const showScatterPlot = (xs: TensorData, ys: TensorData) => {
    const data = getData(400);
    tfvis.render.scatterplot(
      { name: '逻辑回归训练数据' },
      { values: [
          data.filter(p => p.label === 1),
          data.filter(p => p.label === 0),
        ] 
      },
    )

    const model = tf.sequential();
    model.add(tf.layers.dense({
  }

  useEffect(() => {
    // showScatterPlot();
  }, [])

  return (
    <div>
      LogisticRegression
    </div>
  );
}

export default LogisticRegression;

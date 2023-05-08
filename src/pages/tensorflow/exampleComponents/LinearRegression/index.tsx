/*
* 线性回归
*/
import React, { useEffect, FC } from 'react';
import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs';

const LinearRegression: FC = () => {

  // 可视化散点图
  const showScatterPlot = () => {
    const xs = [1, 2, 3, 4];
    const xy = [1, 3, 5, 7];

    tfvis.render.scatterplot(
      { name: '线性回归训练集' },
      { values: xs.map((x, i) => ({ x, y: xy[i] })) },
      { xAxisDomain: [0, 5], yAxisDomain: [0, 8] }
    )

  }

  const initTensorModel = () => {
    // 创建一个连续的模型
    const model = tf.sequential();
    // 定义一个全连阶层
    model.add(
      tf.layers.dense({ 
        units: 1, // 输出维度(神经元个数)
        inputShape: [1], // 输入形状
      })
    );
    // 设置损失函数：均方误差（MSE）
    model.compile({ 
      loss: tf.losses.meanSquaredError, // 损失算法
      optimizer: tf.train.sgd(0.1) // 优化器
    });
  }

  


  useEffect(() => {
  }, [])

  return (
    <div>
      Example1
    </div>
  );
}

export default LinearRegression;

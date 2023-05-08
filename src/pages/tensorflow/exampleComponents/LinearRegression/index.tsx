/*
* 线性回归
*/
import { useEffect, FC } from 'react';
import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs';

type TensorData = Array<number>;

const LinearRegression: FC = () => {

  // 可视化散点图
  const showScatterPlot = (xs: TensorData, ys: TensorData) => {

    tfvis.render.scatterplot(
      { name: '线性回归训练集' },
      { values: xs.map((x, i) => ({ x, y: ys[i] })) },
      { xAxisDomain: [0, 5], yAxisDomain: [0, 8] }
    )

  }

  const initTensorModel = async () => {
    const xs: TensorData = [1, 2, 3, 4];
    const ys: TensorData = [1, 3, 5, 7];

    showScatterPlot(xs, ys);
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
      optimizer: tf.train.sgd(0.1) // 优化器(学习率)
    });

    const inputs = tf.tensor(xs);
    const labels = tf.tensor(ys);
    await model.fit(inputs, labels, {
      batchSize: 4, // 一次训练选取多样本数量
      epochs: 100, // 迭代次数
      callbacks: tfvis.show.fitCallbacks(
        { name: '训练过程' },
        ['loss'],
      )
    });
  }

  


  useEffect(() => {
    initTensorModel();
  }, [])

  return (
    <div>
      Example1
    </div>
  );
}

export default LinearRegression;

/*
* 线性回归
*/
import { useEffect, FC, useState, useRef } from 'react';
import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs';
import { InputNumber, Button, Spin } from 'antd';
import { TensorData } from '../common';

const xs: TensorData = [1, 2, 3, 4];
const ys: TensorData = [1, 3, 5, 7];

const LinearRegression: FC = () => {
  const modelRef = useRef<any>(null);
  const [predictionV, setPredictionV] = useState<number>(null);
  const [value, setValue] = useState<string>('');
  const [modelLoading, setModelLoading] = useState<boolean>(false);

  // 可视化散点图
  const showScatterPlot = (xs: TensorData, ys: TensorData) => {

    tfvis.render.scatterplot(
      { name: '线性回归训练集' },
      { values: xs.map((x, i) => ({ x, y: ys[i] })) },
      { xAxisDomain: [0, 5], yAxisDomain: [0, 8] }
    )

  }

  const initTensorModel = async () => {
    setModelLoading(true);

    // 可视化散点图
    showScatterPlot(xs, ys);
    // 创建一个连续的模型, 既上一层的输出必然是下一层的输入
    const model = tf.sequential();
    // 定义一个全链阶层
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
    modelRef.current = model;

    setModelLoading(false);
  }

  useEffect(() => {
    initTensorModel();
  }, [])

  const onPrediction = () => {
    if (modelRef.current && value) {
      // 预测，输出预测值
      const output: any = modelRef.current.predict(tf.tensor([Number(value)]));
      const pv: number = (output.dataSync())[0]
      setPredictionV(pv);
      alert(`预测值为: ${pv}`);
    } else {
      alert('请输入正确的数值')
    }
  }

  return (
    <div>
      <Spin spinning={modelLoading} tip="模型训练中">
        <InputNumber 
          value={value} 
          onChange={(v) => setValue(v)}
        />
        <Button onClick={onPrediction}>预测</Button>
      </Spin>
    </div>
  );
}

export default LinearRegression;

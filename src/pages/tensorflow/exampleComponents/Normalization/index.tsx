/*
* 归一化
*/
import { useState, useRef, useEffect } from 'react';
import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs';
import { InputNumber, Button, Spin } from 'antd';
import { TensorData } from '../common';

const heights: TensorData = [150, 160, 170];
const weights: TensorData = [40, 50, 60];

function Normalization() {
  const modelRef = useRef<any>(null);
  const [predictionV, setPredictionV] = useState<number>(null);
  const [value, setValue] = useState<string>('');
  const [modelLoading, setModelLoading] = useState<boolean>(false);
  // 可视化散点图
  const showScatterPlot = (xs: TensorData, ys: TensorData) => {

    tfvis.render.scatterplot(
      { name: '身高体重训练集' },
      { values: xs.map((x, i) => ({ x, y: ys[i] })) },
      { xAxisDomain: [140, 180], yAxisDomain: [30, 70] }
    )

  }

  const initTensorModel = async () => {
    setModelLoading(true);
    // 可视化散点图
    showScatterPlot(heights, weights)
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

    // 归一化
    const inputs = tf.tensor(heights).sub(150).div(20);
    const labels = tf.tensor(weights).sub(40).div(20);

    await model.fit(inputs, labels, {
      batchSize: 3, // 一次训练选取多样本数量
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
      // 预测，输出预测值,预测值也需要归一化
      const output: any = modelRef.current.predict(tf.tensor([Number(value)]).sub(150).div(20));
      // 输出时需要反归一化
      const pv: number = (output.mul(20).add(40).dataSync())[0]
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

export default Normalization;

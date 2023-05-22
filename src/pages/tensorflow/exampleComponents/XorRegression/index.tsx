/*
* XOR数据集逻辑回归
*/
import { useEffect, useRef, useState } from 'react';
import { Input, Form, Button } from 'antd';
import { getData } from './utils';
import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs';

function XorRegression() {
  const modelRef = useRef(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const showScatterPlot = async () => {
    setLoading(true);
    const data = getData(400);
    
    tfvis.render.scatterplot(
      { name: 'XOR数据集' },
      {
        values: [
          data.filter(p => p.label === 1),
          data.filter(p => p.label === 0),
        ],
      },
    )

    const model = tf.sequential();
    // 定义一个全链阶层(第一层，隐藏层)
    model.add(tf.layers.dense({
      units: 4,
      inputShape: [2],
      activation: 'relu', // 激活函数
    }))
    // 定义一个全链阶层(第二层，输出层)
    model.add(tf.layers.dense({
      units: 1,
      activation: 'sigmoid', // 激活函数
    }))
    // 设置损失函数和优化器（对数损失）
    model.compile({ loss: tf.losses.logLoss, optimizer: tf.train.adam(0.1) })

    const inputs = tf.tensor(data.map(p => [p.x, p.y])); // 输入
    const labels = tf.tensor(data.map(p => p.label)); // 输出

    await model.fit(inputs, labels, {
      batchSize: 40,
      epochs: 10,
      callbacks: tfvis.show.fitCallbacks(
        { name: '训练过程' },
        ['loss'],
      )
    })

    modelRef.current = model;
    setLoading(false);
  }

  useEffect(() => {
    showScatterPlot();
  }, [])

  const onPreDict = () => {
    if (modelRef.current) {
      const { x, y } = form.getFieldsValue();
      const res = modelRef.current.predict(tf.tensor([[Number(x), Number(y)]]));
      alert(`预测结果：${res.dataSync()[0]}`);
    }
  }

  return (
    loading ? <div>加载中...</div> :
    <Form form={form}>
      <Form.Item name="x">
        <Input placeholder="请输入x" />
      </Form.Item>
      <Form.Item name="y">
        <Input placeholder="请输入y" />
      </Form.Item>
      <Button onClick={onPreDict}>预测</Button>
    </Form>
  );
}

export default XorRegression;

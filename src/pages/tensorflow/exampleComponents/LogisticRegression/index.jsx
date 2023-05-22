/*
* 逻辑回归
*/
import { useEffect, useState, useRef } from 'react';
import { Input, Form, Button } from 'antd';
import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs';
// import { TensorData } from '../common';
import { getData } from './utils';

function LogisticRegression() {
  const modelRef = useRef(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // 可视化散点图
  const showScatterPlot = async () => {
    setLoading(true);

    // @return { x, y, label }
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
      units: 1,
      inputShape: [2], // 长度为2的一维数组
      activation: 'sigmoid' // 激活函数，不管输入多少，输出都在0-1之间
    }))
    // 设置损失函数和优化器（对数损失）
    model.compile({ loss: tf.losses.logLoss, optimizer: tf.train.adam(0.1) })

    const inputs = tf.tensor(data.map(p => [p.x, p.y])); // 输入
    const labels = tf.tensor(data.map(p => p.label)); // 输出

    await model.fit(inputs, labels, {
      batchSize: 40,
      epochs: 50,
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

export default LogisticRegression;

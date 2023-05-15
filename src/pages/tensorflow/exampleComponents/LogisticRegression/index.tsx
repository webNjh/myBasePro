/*
* 逻辑回归
*/
import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs';
import { getData } from './utils';

function LogisticRegression() {
  // 可视化散点图
  const showScatterPlot = (xs: TensorData, ys: TensorData) => {

    tfvis.render.scatterplot(
      { name: '逻辑回归训练数据' },
      { values: [
          ...xs.map((x, i) => ({ x, y: ys[i], label: ys[i] === 1 ? 'red' : 'blue' })),
        ] 
      },
      { xAxisDomain: [140, 180], yAxisDomain: [30, 70] }
    )

  }
  return (
    <div>
      LogisticRegression
    </div>
  );
}

export default LogisticRegression;

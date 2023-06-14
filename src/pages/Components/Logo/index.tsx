import React from 'react';
import classnames from 'classnames';
import styles from './index.module.less';

// , background: 'red'
const triangles = [
  { clipPath: 'polygon(40.22% 62.75%, 40.66% 61.98%, 41.00% 64.78%)' }, // 0
  { clipPath: 'polygon(41% 64.78%, 42.11% 64.40%, 42.62% 67.2%)' }, // 1
  { clipPath: 'polygon(39.82% 61.12%, 39.96% 59.04%, 40.22% 62.75%)' }, // 2
  { clipPath: 'polygon(39.60% 58.32%, 39.96% 59.04%, 39.82% 61.12%)' }, // 3
  { clipPath: 'polygon(39.96% 59.04%, 40.66% 61.98%, 40.22% 62.75%)' }, // 4
  { clipPath: 'polygon(40.66% 61.98%, 42.11% 64.40%, 41% 64.78%)' }, // 5
  { clipPath: 'polygon(42.62% 67.2%, 42.11% 64.4%, 44.11% 68.24%)' }, // 6
  { clipPath: 'polygon(39.6% 58.32%, 39.96% 56.46%, 39.96% 59.04%)', background: 'red' }, // 7
  { clipPath: 'polygon(39.96% 59.04%, 40.99% 60.41%, 40.66% 61.98%)' }, // 8
  { clipPath: 'polygon(40.66% 61.98%, 41.68% 61.68%, 42.11% 64.40%)' }, // 9
  { clipPath: 'polygon(42.11% 64.4%, 44.11% 65.61%, 44.11% 68.24%)' }, // 10
  { clipPath: 'polygon(44.11% 68.24%, 45.68% 66.41%, 45.59% 68.42%)' }, // 11
  { clipPath: 'polygon(39.6% 58.32%, 39.61% 56.39%, 39.96% 56.46%)' }, // 12
  { clipPath: 'polygon(39.96% 56.46%, 40.32% 57.76%, 39.96% 59.04%)' }, // 13
];

function Logo() {
  return (
    <div className={styles.logo}>
      <div className={styles.logo_bg}></div>
      {
        triangles.map((d, i) => (
          <div 
            key={`${d.clipPath + i}`} 
            className={classnames(styles.logo_triangle, styles[`logo_triangle_${i}`])} 
            style={d}
          />
        ))
      }
    </div>
  );
}

export default Logo;

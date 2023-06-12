import React, { FC } from 'react';
import styles from './index.module.less'

const boxs = [
  { name: 'top' },
  { name: 'bottom' },
  { name: 'left' },
  { name: 'right' },
  { name: 'front' },
  { name: 'after' },
];

const Box: FC = () => {
  
  return (
    <div className={styles.boxContainer}>
      {
        boxs.map(d => (
          <span key={d.name} className={`${styles.face} ${styles[d.name]}`}/>
        ))
      }
    </div>
  )
}

export default Box;
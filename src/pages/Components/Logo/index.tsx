import React, { useMemo, useState } from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import { logoPoints, lionPoints } from './data.js';
import styles from './index.module.less';

function generateRandomNumber() {
  var randomNumber = Math.random() * 20;
  return randomNumber.toFixed(2);
}

function toFixed2(num: number) {
  return Math.round(num * 100) / 100;
}

// 变换后的坐标
const transformPoints = logoPoints.map(d => {
  // 中心点
  const center = d.split(',').reduce((acc, cur) => {
    const [x, y] = cur.split('%');
    acc.x += Number(x);
    acc.y += Number(y);
    return acc;
  } , { x: 0, y: 0 });
  center.x /= 3;
  center.y /= 3;

  const diffRandom = generateRandomNumber();
  // const randomBool = Math.random() > 0.5;
  
  center.x = toFixed2(Math.random() > 0.5 ? center.x + Number(diffRandom) : center.x - Number(diffRandom))
  center.y = toFixed2(Math.random() > 0.5 ? center.y + Number(diffRandom) : center.y - Number(diffRandom))

  // 输出x之间的最大差值和y之间的最大差值
  const xDiff: any = d.split(',').reduce((acc, cur) => {
    const [x, y] = cur.split('%');
    acc.x.push(Number(x));
    acc.y.push(Number(y));
    return acc;
  } , { x: [], y: [] });
  xDiff.x = toFixed2(Math.max(...xDiff.x) - Math.min(...xDiff.x));
  xDiff.y = toFixed2(Math.max(...xDiff.y) - Math.min(...xDiff.y));

  // 用中心点坐标随机加减xDiff范围内的值计算新的坐标
  const newPoints = d.split(',').map(cur => {
    // const [x, y] = cur.split('%');
    const newX = toFixed2(Math.random() > 0.5 ? Number(center.x) + (Math.random() * xDiff.x) : Number(center.x) - (Math.random() * xDiff.x));
    const newY = toFixed2(Math.random() > 0.5 ? Number(center.y) + (Math.random() * xDiff.y) : Number(center.y) - (Math.random() * xDiff.y));
    return `${newX}% ${newY}%`
  }).join(',');

  return newPoints
});

const greenIndex = [
  89, 92, 93, 96, 97, 100, 101, 104, 105, 107, 110, 111, 112, 113, 114, 115, 119, 120, 121, 124, 126, 127,
  128, 129, 132, 133, 134, 135, 137, 138, 141, 142, 144, 145, 147, 148, 149, 150, 151, 152, 153, 154, 155,
  156, 157, 158, 159
];

const triangles = logoPoints.map((d, i) => {
  if (!d) {
    return {}
  }
  if (greenIndex.includes(i)) {
    return {
      clipPath: `polygon(${d})`,
      backgroundColor: '#67B42B'
    }
  } return {
    clipPath: `polygon(${d})`,
  }
})

const lionTriangles = lionPoints.map((d, i) => {
  if (!d) {
    return {}
  }
  return {
    clipPath: `polygon(${d})`,
  }
})

// const transformTriangles = transformPoints.map((d) => {
//   if (!d) {
//     return {}
//   }
//   return {
//     clipPath: `polygon(${d})`,
//   }
// })
const circle = (points: any) => {
  const a = points.map((d: any) => {
    if (!d) {
      return null;
    }
    const totalPoint: any = [];
    const pointArr = d.split(', ');
    pointArr.forEach((v: any) => {
      totalPoint.push(v.split(' '));
    })

    return totalPoint;
  })
  
  // 三角形中心点坐标
  const centerPoint: any = [];
  a.forEach((d: any) => {
    if (d) {
      const x = (parseFloat(d[0][0]) + parseFloat(d[1][0]) + parseFloat(d[2][0])) / 3;
      const y = (parseFloat(d[0][1]) + parseFloat(d[1][1]) + parseFloat(d[2][1])) / 3;
      centerPoint.push({ x, y });
    } else {
      centerPoint.push(null);
    }
  })
  // return centerPoint;
  
  // 三角形顶点坐标平铺
  const vs = new Map();
  a.forEach((d: any) => {
    if (d) {
      d.forEach((v: any) => {
        if (!vs.get(v.join(','))) {
          vs.set(v.join(','), v)
        }
      })
    }
  })
  
  return { vertexPoints: Array.from(vs.values()), centerPoints: centerPoint };
}

const delays = transformPoints.map(d => {
  return Math.floor(Math.random() * 101) - 50;
})

function Logo() {
  const [middleToggle, setMiddleToggle] = useState(false);
  
  const onClick = () => {
    setMiddleToggle(true);
  }

  return (
    <div className={classnames({
      [styles.logo]: true,
      [styles.logo_animation]: middleToggle,
    })}>
      <div className={styles.logo_bg}></div>
      {/* logo */}
      {/* {
        triangles.map((d, i) => (
          <div 
            key={`${d?.clipPath + i}`} 
            className={classnames({
              [styles.logo_triangle]: true,
              [styles[`logo_triangle-${i + 1}`]]: true,
              [styles[`logo_transform-${i + 1}`]]: middleToggle,
              // [styles[`logo_middle-${i + 1}`]]: middleToggle,
            })} 
            style={d}
          />
        ))
      } */}
      {/* 小狮子 */}
      {
        lionTriangles.map((d, i) => (
          <div 
            key={`${d?.clipPath + i}`} 
            className={classnames({
              [styles.logo_triangle]: true,
              // [styles[`logo_triangle-${i + 1}`]]: true,
              // [styles[`logo_transform-${i + 1}`]]: middleToggle,
              // [styles[`logo_middle-${i + 1}`]]: middleToggle,
            })} 
            style={d}
          />
        ))
      }
      <svg style={{ width: 1920, height: 1080, position: 'absolute' }}>
        {/* 三角形中心点 */}
        {
          circle(lionPoints).centerPoints.map((d: any, i: number) => {
            if (d) {
              return (
                <text 
                  key={`${d + i}`}
                  x={d.x / 100 * 1920}
                  y={d.y / 100 * 1080}
                  fill="white"
                  fontSize="2"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >{i}</text>
              )
            } return null;
          })
        }
        {/* 三角形顶点 */}
        {
          circle(lionPoints).vertexPoints.map((d: any, i: number) => {
            return (
              <circle 
                key={`${d + i}`} 
                r={1} 
                cx={parseFloat(d[0]) / 100 * 1920} 
                cy={parseFloat(d[1]) / 100 * 1080} 
                fill="green" 
                fillOpacity={0.6} 
                stroke="none"
                onMouseEnter={() => { console.log(`${d[0]} ${d[1]}`) }}
                onMouseLeave={() => { console.log('出去了') }}
              />
            )
          })
        }
      </svg>
      {/* 触发变化 */}
      <Button onClick={onClick}>变换</Button>
    </div>
  );
}

export default Logo;

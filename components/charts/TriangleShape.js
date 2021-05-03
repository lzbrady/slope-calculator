import React from 'react';
import {Svg, Polygon} from 'react-native-svg';

import {colors} from 'BaseTheme';

// const bounds = 100;
const rightAngleRad = 90 * (Math.PI / 180);
export default function TriangleShape({a, b, c, A, B, C}) {
  console.log('Params', {a, b, c, A, B, C});
  if (!a || !b || !c || !A || !B || !C) {
    return null;
  }

  const bounds = Math.max(a, b, c) * 2;
  const originX = bounds / 4;
  const originY = bounds / 4;

  const pointA = `${originX},${bounds - originY}`;
  const pointB = `${originX + Number(c)},${bounds - originY}`;
  const pointC = `${originX + Number(c) - Number(b) * Math.sin(rightAngleRad - Number(A))},${
    bounds - Number(b) * Math.sin(Number(A)) - originY
  }`;

  return (
    <Svg viewBox={`0 0 ${bounds} ${bounds}`}>
      <Polygon points={`${pointA} ${pointB} ${pointC} ${pointA}`} fill={colors.primary} stroke="none" />
    </Svg>
  );
}

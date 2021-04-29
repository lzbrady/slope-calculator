import React from 'react';
import {G, Rect, Text} from 'react-native-svg';

export default function ChartTooltip({x, y, xCoord, yCoord, maxX, minX, maxY, minY}) {
  console.log('Tooltip', {xCoord, yCoord});
  return (
    <G x={x(xCoord) - 40} y={y(yCoord) + 5} key={'tooltip'} onPress={() => console.log('tooltip clicked')}>
      <Rect height={30} width={80} stroke={'grey'} fill={'white'} ry={10} rx={10} />
      <Text x={40} dy={15} alignmentBaseline={'middle'} textAnchor={'middle'} stroke={'rgb(134, 65, 244)'}>
        {`(${xCoord}, ${yCoord})`}
      </Text>
    </G>
  );
}

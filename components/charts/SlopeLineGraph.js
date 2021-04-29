import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LineChart, XAxis, YAxis, Grid} from 'react-native-svg-charts';
import {G, Line} from 'react-native-svg';

import ChartToolTip from 'components/charts/ChartToolTip';

export default function SlopeLineGraph({x1, y1, x2, y2}) {
  const [data, setData] = useState([{x: 0, y: 0}]);
  const [minX, setMinX] = useState(0);
  const [minY, setMinY] = useState(0);
  const [maxX, setMaxX] = useState(10);
  const [maxY, setMaxY] = useState(10);

  // Returns 0 if both values are positive, otherwise adds 10% padding (but at least 1) to negative value
  const getMin = (val1, val2) => {
    if (val1 > 0 && val2 > 0) {
      return 0;
    }
    return Math.floor(Math.min(val1, val2) * 1.1);
  };

  // Returns 0 if both values are negative, otherwise adds 10% padding (but at least 1) to value
  const getMax = (val1, val2) => {
    if (val1 < 0 && val2 < 0) {
      return 0;
    }
    return Math.ceil(Math.max(val1, val2) * 1.1);
  };

  useEffect(() => {
    if (
      ((x1 && !isNaN(x1)) || x1 === 0) &&
      ((y1 && !isNaN(y1)) || y1 === 0) &&
      ((x2 && !isNaN(x2)) || x2 === 0) &&
      ((y2 && !isNaN(y2)) || y2 === 0)
    ) {
      setData([
        {
          x: Number(x1),
          y: Number(y1),
        },
        {
          x: Number(x2),
          y: Number(y2),
        },
      ]);
      setMinX(getMin(x1, x2));
      setMinY(getMin(y1, y2));
      setMaxX(getMax(x1, x2));
      setMaxY(getMax(y1, y2));
    } else {
      setData([]);
      setMinX(0);
      setMinY(0);
      setMaxX(10);
      setMaxY(10);
    }
  }, [x1, y1, x2, y2]);

  const axesSvg = {fontSize: 10, fill: 'grey'};
  const verticalContentInset = {top: 10, bottom: 10};
  const xAxisHeight = 30;

  const CustomGrid = ({x, y, data: chartData, ticks}) => (
    <G>
      {
        // Horizontal grid
        ticks.map(tick => (
          <Line
            key={tick}
            x1={'0%'}
            x2={'100%'}
            y1={y(tick)}
            y2={y(tick)}
            stroke={tick === 0 ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.2)'}
            strokeWidth={tick === 0 ? 2 : 1}
          />
        ))
      }
      {
        // Horizontal grid
        ticks.map((tick, index) => (
          <Line
            key={tick}
            x1={`${index * 10}%`}
            x2={`${index * 10}%`}
            y1={'0%'}
            y2={'100%'}
            stroke={tick === 0 ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.2)'}
            strokeWidth={tick === 0 ? 2 : 1}
          />
        ))
      }
    </G>
  );

  return (
    <View style={styles.container}>
      {data.map((point, index) => {
        return <Text key={index}>{`(${point.x}, ${point.y})`}</Text>;
      })}
      <View style={styles.chartContainer}>
        <YAxis
          data={data}
          style={{marginBottom: xAxisHeight + 3}}
          contentInset={verticalContentInset}
          svg={axesSvg}
          yAccessor={({item}) => item.y}
          min={minY}
          max={maxY}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <LineChart
            style={{flex: 1}}
            data={data}
            xAccessor={({item}) => item.x}
            yAccessor={({item}) => item.y}
            svg={{
              stroke: 'rgb(134, 65, 244)',
            }}
            xMin={minX}
            yMin={minY}
            xMax={maxX}
            yMax={maxY}
            contentInset={verticalContentInset}
            numberOfTicks={10}>
            <CustomGrid belowChart={true} />
            {/* <ChartToolTip xCoord={x1} yCoord={y1} maxX={maxX} minX={minX} maxY={maxY} minY={minY} />
            <ChartToolTip xCoord={x2} yCoord={y2} maxX={maxX} minX={minX} maxY={maxY} minY={minY} /> */}
          </LineChart>
          <XAxis
            style={{marginHorizontal: -15, marginTop: 3, height: xAxisHeight}}
            data={data}
            min={minX}
            max={maxX}
            xAccessor={({item}) => item.x}
            contentInset={{left: 15, right: 15}}
            svg={axesSvg}
            numberOfTicks={14}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    height: 300,
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  container: {},
});

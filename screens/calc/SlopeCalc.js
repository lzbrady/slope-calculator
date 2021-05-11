import React, {useState, useEffect} from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';

import Layout from 'components/Layout';
import TextInput from 'components/controls/TextInput';
import Dropdown from 'components/controls/Dropdown';
import SlopeLineGraph from 'components/charts/SlopeLineGraph';

import {card, colors} from 'BaseTheme';

const NO_SLOPE = '-';
const round = 1000000;

export default function SlopeCalc({navigation}) {
  const [useYIntercept, setUseYIntercept] = useState(false);
  const [x1, setX1] = useState(null);
  const [y1, setY1] = useState(null);
  const [x2, setX2] = useState(null);
  const [y2, setY2] = useState(null);

  const [slope, setSlope] = useState(null);
  const [slopeFraction, setSlopeFraction] = useState(null);
  const [equation, setEquation] = useState(null);
  const [angle, setAngle] = useState(null);
  const [distance, setDistance] = useState(null);
  const [deltaX, setDeltaX] = useState(null);
  const [deltaY, setDeltaY] = useState(null);

  useEffect(() => {
    if (
      ((x1 && !isNaN(x1)) || x1 === 0) &&
      ((y1 && !isNaN(y1)) || y1 === 0) &&
      ((x2 && !isNaN(x2)) || x2 === 0) &&
      ((y2 && !isNaN(y2)) || y2 === 0)
    ) {
      const _deltaX = Math.round((x2 - x1) * round) / round;
      const _deltaY = Math.round((y2 - y1) * round) / round;

      setDistance(Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) * round) / round);
      setDeltaX(_deltaX);
      setDeltaY(_deltaY);

      if (_deltaX === 0) {
        setSlope('Undefined');
        setSlopeFraction(null);
        setEquation('Vertical Line');
        setAngle('0.5π rad');
      } else {
        const _slope = Math.round((_deltaY / _deltaX) * round) / round;
        const _slopeFraction = reduce(_deltaY, _deltaX);
        if (_slopeFraction[1] < 0 && _slopeFraction[0] > 0) {
          _slopeFraction[0] = -1 * _slopeFraction[0];
          _slopeFraction[1] = -1 * _slopeFraction[1];
        }
        const b = Math.round((y1 - _slope * x1) * round) / round;

        setSlope(_slope);
        setSlopeFraction(_slopeFraction);
        setEquation(
          `y=${_slopeFraction[0] === 1 ? '' : _slopeFraction[0]}x${
            _slopeFraction[1] === 1 ? '' : '/' + _slopeFraction[1]
          }${b === 0 ? '' : b < 0 ? b : '+' + b}`,
        );
        setAngle(`${Math.round(Math.abs(Math.atan(_slope)) * round) / round} rad`);
      }
    } else {
      setSlope(NO_SLOPE);
      setSlopeFraction(null);
      setEquation(null);
      setAngle(null);
      setDistance(null);
      setDeltaX(null);
      setDeltaY(null);
    }
  }, [x1, y1, x2, y2]);

  useEffect(() => {
    // Update variables dependent on slope
  });

  const reduce = (numerator, denominator) => {
    var gcd = function gcd(a, b) {
      return b ? gcd(b, a % b) : a;
    };
    gcd = gcd(numerator, denominator);
    return [numerator / gcd, denominator / gcd];
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <Dropdown
          containerStyle={styles.formulaDropdownContainer}
          label={'Formula'}
          labelStyle={styles.formulaDropdownLabel}
          onValueChange={value => {
            setUseYIntercept(value);
            setX2('0');
          }}
          items={[
            {
              label: 'Two Points',
              value: false,
            },
            {
              label: 'Slope Intercept',
              value: true,
            },
          ]}
          placeholder={{}}
        />

        <View style={styles.container}>
          <View style={styles.pointContainer}>
            <Text style={styles.pointText}>Point 1</Text>
            <View style={styles.inputContainer}>
              <View style={styles.pointInputWrapper}>
                <TextInput
                  inputContainerStyle={styles.pointInputContainer}
                  value={x1}
                  onChangeText={setX1}
                  label="X"
                  keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'decimal-pad'}
                />
              </View>

              <View style={styles.pointInputWrapper}>
                <TextInput
                  inputContainerStyle={styles.pointInputContainer}
                  value={y1}
                  onChangeText={setY1}
                  label="Y"
                  keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'decimal-pad'}
                />
              </View>
            </View>
          </View>
          <View style={styles.pointContainer}>
            <Text style={styles.pointText}>{useYIntercept ? 'Y Intercept' : 'Point 2'}</Text>
            <View style={styles.inputContainer}>
              {!useYIntercept && (
                <View style={styles.pointInputWrapper}>
                  <TextInput
                    inputContainerStyle={styles.pointInputContainer}
                    value={x2}
                    onChangeText={setX2}
                    label="X"
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'decimal-pad'}
                  />
                </View>
              )}

              <View style={styles.pointInputWrapper}>
                <TextInput
                  inputContainerStyle={styles.pointInputContainer}
                  value={y2}
                  onChangeText={setY2}
                  label="Y"
                  keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'decimal-pad'}
                />
              </View>
            </View>
          </View>

          <View style={styles.answerContainer}>
            <View style={styles.slopeContainer}>
              <Text style={styles.slopeLabel}>Slope</Text>
              <Text style={styles.slopeValue}>{slope}</Text>
            </View>
            <Text style={styles.disclaimer}>Answers may be rounded within 6 decimals</Text>

            <View style={styles.slopeInfoContainer}>
              <View style={styles.slopeInfoColumn}>
                <View style={styles.slopeInfo}>
                  <Text style={styles.slopeInfoLabel}>Fraction</Text>
                  <Text style={styles.slopeInfoValue}>
                    {slopeFraction
                      ? slopeFraction[1] === 1
                        ? slopeFraction[0]
                        : `${slopeFraction[0]} / ${slopeFraction[1]}`
                      : '-'}
                  </Text>
                </View>
                <View style={styles.slopeInfo}>
                  <Text style={styles.slopeInfoLabel}>Angle</Text>
                  <Text style={styles.slopeInfoValue}>{slope !== NO_SLOPE ? angle : '-'}</Text>
                </View>
                <View style={styles.slopeInfo}>
                  <Text style={styles.slopeInfoLabel}>Delta X</Text>
                  <Text style={styles.slopeInfoValue}>{slope !== NO_SLOPE ? deltaX : '-'}</Text>
                </View>
              </View>

              <View style={styles.slopeInfoColumn}>
                <View style={styles.slopeInfo}>
                  <Text style={styles.slopeInfoLabel}>Equation</Text>
                  <Text style={styles.slopeInfoValue}>{slope !== NO_SLOPE ? equation : '-'}</Text>
                </View>
                <View style={styles.slopeInfo}>
                  <Text style={styles.slopeInfoLabel}>Distance</Text>
                  <Text style={styles.slopeInfoValue}>{slope !== NO_SLOPE ? distance : '-'}</Text>
                </View>
                <View style={styles.slopeInfo}>
                  <Text style={styles.slopeInfoLabel}>Delta Y</Text>
                  <Text style={styles.slopeInfoValue}>{slope !== NO_SLOPE ? deltaY : '-'}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <SlopeLineGraph x1={x1} y1={y1} x2={x2} y2={y2} />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  answerContainer: {
    ...card,
    marginTop: 40,
    marginBottom: 30,
  },
  container: {
    marginBottom: 20,
  },
  disclaimer: {
    marginBottom: 10,
    color: colors.gray,
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formulaDropdownContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formulaDropdownLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  pointContainer: {
    marginTop: 20,
  },
  pointInputContainer: {
    flex: 1,
    marginLeft: 5,
  },
  pointInputWrapper: {
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  scrollContentContainer: {
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingBottom: 20,
  },
  slopeContainer: {
    borderBottomWidth: 2,
    borderBottomColor: colors.black,
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 4,
  },
  slopeInfo: {
    alignItems: 'center',
    marginBottom: 5,
  },
  slopeInfoColumn: {
    marginHorizontal: 20,
  },
  slopeInfoContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  slopeInfoLabel: {
    color: colors.gray,
  },
  slopeInfoValue: {
    color: colors.darkGray,
  },
  slopeLabel: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
    color: colors.darkGray,
  },
  slopeValue: {
    fontSize: 20,
  },
});

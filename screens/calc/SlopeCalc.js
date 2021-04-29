import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import Layout from 'components/Layout';
import TextInput from 'components/controls/TextInput';
import Dropdown from 'components/controls/Dropdown';
import SlopeLineGraph from 'components/charts/SlopeLineGraph';

import {colors} from 'BaseTheme';

export default function SlopeCalc({navigation}) {
  const [useYIntercept, setUseYIntercept] = useState(false);
  const [x1, setX1] = useState(null);
  const [y1, setY1] = useState(null);
  const [x2, setX2] = useState(null);
  const [y2, setY2] = useState(null);
  const [slope, setSlope] = useState(null);

  useEffect(() => {
    if ((x1 || x1 === 0) && (y1 || y1 === 0) && (x2 || x2 === 0) && (y2 || y2 === 0)) {
      const deltaY = y2 - y1;
      const deltaX = x2 - x1;

      if (Math.round(deltaX) === 0) {
        setSlope('Undefined');
      } else {
        setSlope(Math.round((deltaY / deltaX) * 10000) / 10000);
      }
    } else {
      setSlope('-');
    }
  }, [x1, y1, x2, y2]);

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <Dropdown
          containerStyle={styles.formulaDropdownContainer}
          label={'Formula'}
          labelStyle={styles.formulaDropdownLabel}
          onValueChange={value => {
            setUseYIntercept(value);

            if (value) {
              // If value is true, y-intercept is being used
              setX2(0);
            }
          }}
          items={[
            {
              label: 'Two Points',
              value: false,
            },
            {
              label: 'Line',
              value: true,
            },
          ]}
          placeholder={{}}
        />

        <View style={styles.container}>
          <View style={styles.pointContainer}>
            <Text style={styles.pointText}>Point 1</Text>
            <View style={styles.inputContainer}>
              <View style={styles.pointInputContainer}>
                <TextInput value={x1} onChangeText={setX1} label="X" keyboardType="decimal-pad" />
              </View>

              <View style={styles.pointInputContainer}>
                <TextInput value={y1} onChangeText={setY1} label="Y" keyboardType="decimal-pad" />
              </View>
            </View>
          </View>

          <View style={styles.pointContainer}>
            <Text style={styles.pointText}>{useYIntercept ? 'Y Intercept' : 'Point 2'}</Text>
            <View style={styles.inputContainer}>
              {!useYIntercept && (
                <View style={styles.pointInputContainer}>
                  <TextInput value={x2} onChangeText={setX2} label="X" keyboardType="decimal-pad" />
                </View>
              )}

              <View style={styles.pointInputContainer}>
                <TextInput value={y2} onChangeText={setY2} label="Y" keyboardType="decimal-pad" />
              </View>
            </View>
          </View>

          <View style={styles.slopeContainer}>
            <Text style={styles.slopeLabel}>Slope</Text>
            <Text style={styles.slopeValue}>{slope}</Text>
          </View>
        </View>

        <SlopeLineGraph x1={x1} y1={y1} x2={x2} y2={y2} />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
    marginHorizontal: 5,
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
    borderWidth: 2,
    borderColor: colors.black,
    width: '40%',
    maxWidth: 150,
    alignSelf: 'center',
    marginVertical: 20,
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 4,
  },
  slopeLabel: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  slopeValue: {
    fontSize: 20,
  },
});

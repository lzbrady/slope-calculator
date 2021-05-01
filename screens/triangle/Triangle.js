import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import Layout from 'components/Layout';
import TextInput from 'components/controls/TextInput';
import Dropdown from 'components/controls/Dropdown';
import TriangleShape from 'components/charts/TriangleShape';

import TriangleLabelsIcon from 'icons/triangle-labels.svg';

import {colors} from 'BaseTheme';

const SSS = 0;
const ASS = 1;
const SAA = 2;
const SAS = 3;

export default function Triangle({navigation}) {
  const [method, setMethod] = useState(SSS);
  const [sideA, setSideA] = useState(null);
  const [sideB, setSideB] = useState(null);
  const [sideC, setSideC] = useState(null);
  const [angleA, setAngleA] = useState(null);
  const [angleB, setAngleB] = useState(null);
  const [angleC, setAngleC] = useState(null);
  const [angleARad, setAngleARad] = useState(null);
  const [angleBRad, setAngleBRad] = useState(null);
  const [angleCRad, setAngleCRad] = useState(null);

  const square = val => {
    return Math.pow(val, 2);
  };

  const degToRad = deg => {
    return deg * (Math.PI / 180);
  };

  const radToDeg = rad => {
    return rad * (180 / Math.PI);
  };

  useEffect(() => {
    switch (method) {
      case SSS:
        if (!sideA || !sideB || !sideC) {
          return;
        }

        setAngleARad(Math.acos((square(sideB) + square(sideC) - square(sideA)) / (2 * sideB * sideC)));
        setAngleBRad(Math.acos((square(sideC) + square(sideA) - square(sideB)) / (2 * sideC * sideA)));
        setAngleCRad(Math.acos((square(sideA) + square(sideB) - square(sideC)) / (2 * sideA * sideB)));
        break;
      case ASS:
        if (!angleB || !sideB || !sideC) {
          return;
        }

        const _angleCRad = Math.asin((Math.sin(degToRad(angleB)) * sideC) / sideB);
        const _angleA = 180 - angleB - radToDeg(_angleCRad);
        const _sideA = (sideB / Math.sin(degToRad(angleB))) * Math.sin(degToRad(_angleA));
        setSideA(_sideA);
        setAngleARad(degToRad(_angleA));
        setAngleBRad(degToRad(angleB));
        setAngleCRad(_angleCRad);
        break;
      case SAA:
        if (!angleA || !angleC || !sideC) {
          return;
        }

        const __angleB = 180 - angleA - angleC;
        const __sideA = (sideC / Math.sin(degToRad(angleC))) * Math.sin(degToRad(angleA));
        const __sideB = (sideC / Math.sin(degToRad(angleC))) * Math.sin(degToRad(__angleB));
        setAngleARad(degToRad(angleA));
        setAngleBRad(degToRad(__angleB));
        setAngleCRad(degToRad(angleC));
        setSideA(__sideA);
        setSideB(__sideB);
        break;
      case SAS:
        if (!angleA || !sideB || !sideC) {
          return;
        }

        const ___sideA = Math.sqrt(square(sideB) + square(sideC) - 2 * sideB * sideC * Math.cos(degToRad(angleA)));
        // Pick smaller angle
        let useSideB = sideB < sideC;
        const side = useSideB ? sideB : sideC;
        const ___angle = Math.asin((Math.sin(degToRad(angleA)) / ___sideA) * side);
        const ___lastAngle = degToRad(180 - angleA - radToDeg(___angle));
        setAngleARad(degToRad(angleA));
        setAngleBRad(useSideB ? ___angle : ___lastAngle);
        setAngleCRad(!useSideB ? ___angle : ___lastAngle);
        setSideA(___sideA);
        break;
    }
  }, [method, sideA, sideB, sideC, angleA, angleB, angleC]);

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.triangleLabelContainer}>
          <TriangleLabelsIcon width={200} height={200} fill={colors.black} />
        </View>

        <Dropdown
          containerStyle={styles.formulaDropdownContainer}
          label={'Formula'}
          labelStyle={styles.formulaDropdownLabel}
          onValueChange={value => {
            setMethod(value);
          }}
          items={[
            {
              label: 'SSS',
              value: SSS,
            },
            {
              label: 'SSA',
              value: ASS,
            },
            {
              label: 'AAS',
              value: SAA,
            },
            {
              label: 'SAS',
              value: SAS,
            },
          ]}
          placeholder={{}}
        />

        <View style={styles.container}>
          {method === SSS && (
            <TextInput
              inputContainerStyle={styles.inputContainer}
              value={sideA}
              onChangeText={setSideA}
              label="Side a"
              keyboardType="decimal-pad"
            />
          )}
          {(method === ASS || method === SSS || method === SAS) && (
            <TextInput
              inputContainerStyle={styles.inputContainer}
              value={sideB}
              onChangeText={setSideB}
              label="Side b"
              keyboardType="decimal-pad"
            />
          )}
          {(method === SAA || method === ASS || method === SSS || method === SAS) && (
            <TextInput
              inputContainerStyle={styles.inputContainer}
              value={sideC}
              onChangeText={setSideC}
              label="Side c"
              keyboardType="decimal-pad"
            />
          )}
          {(method === SAA || method === SAS) && (
            <TextInput
              inputContainerStyle={styles.inputContainer}
              value={angleA}
              onChangeText={setAngleA}
              label="Angle A (degrees)"
              keyboardType="decimal-pad"
            />
          )}
          {method === ASS && (
            <TextInput
              inputContainerStyle={styles.inputContainer}
              value={angleB}
              onChangeText={setAngleB}
              label="Angle B (degrees)"
              keyboardType="decimal-pad"
            />
          )}
          {method === SAA && (
            <TextInput
              inputContainerStyle={styles.inputContainer}
              value={angleC}
              onChangeText={setAngleC}
              label="Angle C (degrees)"
              keyboardType="decimal-pad"
            />
          )}

          <View style={styles.infoContainer}>
            {/* Sides */}
            <View style={styles.infoChunk}>
              <Text style={styles.infoChunkLabel}>Sides</Text>
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Side A: </Text>
                <Text numberOfLines={1} style={styles.infoValue}>
                  {sideA ?? '-'}
                </Text>
              </View>
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Side B: </Text>
                <Text numberOfLines={1} style={styles.infoValue}>
                  {sideB ?? '-'}
                </Text>
              </View>
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Side C: </Text>
                <Text numberOfLines={1} style={styles.infoValue}>
                  {sideC ?? '-'}
                </Text>
              </View>
            </View>

            {/* Angles */}
            <View style={styles.infoChunk}>
              <Text style={styles.infoChunkLabel}>Angles (radians)</Text>
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Angle A: </Text>
                <Text numberOfLines={1} style={styles.infoValue}>
                  {(isNaN(angleARad) ? '-' : angleARad) ?? '-'} rad
                </Text>
              </View>
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Angle B: </Text>
                <Text numberOfLines={1} style={styles.infoValue}>
                  {(isNaN(angleBRad) ? '-' : angleBRad) ?? '-'} rad
                </Text>
              </View>
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Angle C: </Text>
                <Text numberOfLines={1} style={styles.infoValue}>
                  {(isNaN(angleCRad) ? '-' : angleCRad) ?? '-'} rad
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.triangleContainer}>
          <TriangleShape a={sideA} b={sideB} c={sideC} A={angleARad} B={angleBRad} C={angleCRad} />
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
  infoBlock: {
    flexDirection: 'row',
  },
  infoChunk: {
    marginBottom: 10,
  },
  infoChunkLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 3,
  },
  infoContainer: {
    marginVertical: 20,
  },
  infoLabel: {
    color: colors.gray,
  },
  infoValue: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 10,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  triangleContainer: {
    height: 300,
  },
  triangleLabelContainer: {
    alignItems: 'center',
  },
});

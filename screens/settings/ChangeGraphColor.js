import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TriangleColorPicker} from 'react-native-color-picker';

import {useSettingsContext} from 'context/SettingsContext';

import Layout from 'components/Layout';

export default function ChangeGraphColor({navigation}) {
  const {dataColor, setDataColor} = useSettingsContext();

  return (
    <Layout>
      <TriangleColorPicker
        onColorSelected={_color => {
          setDataColor(_color);
          navigation.goBack();
        }}
        style={styles.colorPicker}
        oldColor={dataColor}
      />
      <Text style={styles.label}>Press to Select Color!</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  colorPicker: {
    flex: 1,
    marginBottom: 5,
  },
  label: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
  },
});

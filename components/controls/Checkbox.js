import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors, labelStyle} from 'BaseTheme';

export default function Checkbox({checked, color = colors.primary, label, size = 24, toggle}) {
  return (
    <>
      {label && <Text style={labelStyle}>{label}</Text>}

      <TouchableOpacity style={{...styles.box, borderColor: color, width: size, height: size}} onPress={toggle}>
        <View
          style={{
            ...styles.fill,
            backgroundColor: checked ? color : colors.transparent,
            width: size - 6,
            height: size - 6,
          }}
        />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 2,
  },
  fill: {
    borderRadius: 2,
  },
});

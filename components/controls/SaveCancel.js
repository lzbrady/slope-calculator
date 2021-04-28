import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors} from 'BaseTheme';

export default function SaveCancel({onCancel, onSave}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onCancel} style={styles.buttonCancel}>
        <LinearGradient
          colors={[colors.red, colors.lightRed]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradient}>
          <Text style={styles.textCancel}>Cancel</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSave} style={styles.buttonSave}>
        <LinearGradient
          colors={[colors.green, colors.lightGreen]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradient}>
          <Text style={styles.textSave}>Save</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonCancel: {
    borderColor: colors.red,
    borderRadius: 4,
    borderWidth: 2,
    flex: 1,
    marginRight: 5,
  },
  buttonSave: {
    borderColor: colors.green,
    borderRadius: 4,
    borderWidth: 2,
    flex: 1,
    marginLeft: 5,
  },
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  gradient: {
    paddingVertical: 10,
  },
  textCancel: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.white,
  },
  textSave: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.white,
  },
});

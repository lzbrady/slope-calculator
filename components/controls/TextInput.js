import React from 'react';
import {StyleSheet, Text, TextInput as RNTextInput, View} from 'react-native';

import {colors, labelStyle} from 'BaseTheme';

export default function TextInput({
  inputContainerStyle,
  inputStyle,
  keyboardType,
  left,
  right,
  label,
  ref,
  ...props
}) {
  return (
    <>
      {label && <Text style={labelStyle}>{label}</Text>}

      <View style={{...styles.inputContainer, ...inputContainerStyle}}>
        {left}
        <RNTextInput
          ref={ref}
          style={{
            ...styles.input,
            ...inputStyle,
          }}
          placeholderTextColor={colors.placeholderText}
          keyboardType={keyboardType || 'default'}
          {...props}
        />
        {right}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.offWhite,
    borderRadius: 4,
    borderColor: colors.gray,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flex: 1,
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
  },
});

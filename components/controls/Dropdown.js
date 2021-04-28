import React, {forwardRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import {colors, labelStyle as defaultLabelStyle} from 'BaseTheme';
import ChevronDown from 'icons/chevron-down.svg';

const Dropdown = forwardRef(
  (
    {
      containerStyle,
      hide,
      icon,
      iconColor = colors.gray,
      inputStyle,
      inputContainerStyle,
      label,
      labelStyle = defaultLabelStyle,
      onValueChange,
      items,
      ...props
    },
    ref,
  ) => {
    return (
      <View style={containerStyle}>
        {label && <Text style={labelStyle}>{label}</Text>}

        <RNPickerSelect
          ref={ref}
          useNativeAndroidPickerStyle={false}
          onValueChange={onValueChange}
          items={items ?? []}
          Icon={() => icon ?? <ChevronDown width={12} height={12} fill={iconColor} style={styles.dropdownIcon} />}
          style={{
            inputIOS: {...styles.inputIOS, ...inputStyle},
            inputAndroid: {...styles.inputAndroid, ...inputStyle},
            inputIOSContainer: {...styles.dropdown, ...inputContainerStyle, ...(hide && {display: 'none'})},
            inputAndroidContainer: {...styles.dropdown, ...inputContainerStyle, ...(hide && {display: 'none'})},
          }}
          {...props}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 4,
    paddingRight: 30,
    borderRadius: 4,
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  dropdownIcon: {
    marginRight: 8,
  },
  inputIOS: {
    fontSize: 17,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  inputAndroid: {
    fontSize: 17,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
  },
});

export default Dropdown;

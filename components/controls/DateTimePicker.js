import React, {useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {formatDate} from 'utils';
import {colors, labelStyle} from 'BaseTheme';
import CheckIcon from 'icons/check.svg';
import CloseIcon from 'icons/close.svg';

export default function DateTimePicker({date, label, mode = 'date', setDate, style}) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <>
      {label && <Text style={labelStyle}>{label}</Text>}

      <View style={styles.pickerContainer}>
        <TouchableOpacity
          onPress={() => {
            setShowDatePicker((prev) => !prev);
            if (!date) {
              // Default
              setDate(new Date());
            }
            Keyboard.dismiss();
          }}
          style={{...styles.button, ...style}}>
          <Text>{formatDate(date) || 'Select Date'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            setDate(null);
          }}>
          <CloseIcon fill={colors.red} width={12} height={12} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            setShowDatePicker(null);
          }}>
          <CheckIcon fill={colors.green} width={22} height={22} />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DatePicker date={date || new Date()} onDateChange={setDate} androidVariant="nativeAndroid" mode={mode} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    marginLeft: 15,
    padding: 6,
    backgroundColor: colors.offWhite,
    height: 30,
    width: 30,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.offWhite,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: 'baseline',
    alignItems: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

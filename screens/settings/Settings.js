import React from 'react';
import {FlatList, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors} from 'BaseTheme';
import {displayName, version} from 'app.json';

export default function Settings({navigation}) {
  const menuItems = [
    {
      name: 'Change Graph Color',
      onPress: () => navigation.navigate('ChangeGraphColor'),
    },
    {
      name: 'Contact Support',
      onPress: () => Linking.openURL('mailto:luke@pgmediasolutions.com?subject=Slope Calculator Support'),
    },
  ];

  return (
    <View>
      <FlatList
        data={menuItems}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.row} onPress={item.onPress}>
              <Text style={styles.label}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        style={styles.list}
        keyExtractor={item => item.name}
        ListFooterComponent={
          <>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.company}>Created By Pretty Good Media</Text>
            <Text style={styles.version}>{`Version ${version}`}</Text>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  company: {
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 5,
    color: colors.gray,
    fontStyle: 'italic',
  },
  label: {
    paddingHorizontal: 8,
    fontSize: 18,
  },
  list: {
    height: '100%',
  },
  name: {
    fontSize: 12,
    textAlign: 'center',
    paddingTop: 20,
    color: colors.gray,
    fontStyle: 'italic',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  version: {
    fontSize: 12,
    textAlign: 'center',
    paddingBottom: 20,
    color: colors.gray,
    fontStyle: 'italic',
  },
});

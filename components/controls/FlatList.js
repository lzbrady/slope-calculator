import React from 'react';
import {ActivityIndicator, FlatList as RNFlatList, StyleSheet, View} from 'react-native';

import EmptyListMessage from 'components/EmptyListMessage';

export default function FlatList({
  emptyListMessage,
  emptyListIcon,
  emptyContainerStyle,
  emptyMessageStyle,
  isLoading,
  ...props
}) {
  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <RNFlatList
      data={props.data}
      ListEmptyComponent={
        <EmptyListMessage
          message={emptyListMessage}
          topIcon={emptyListIcon}
          messageStyle={emptyMessageStyle}
          containerStyle={emptyContainerStyle}
        />
      }
      ListFooterComponent={
        <>
          {props.ListFooterComponent}
          <View style={styles.footer} />
        </>
      }
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 20,
  },
  loadingContainer: {
    paddingTop: 40,
  },
});

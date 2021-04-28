import React, {useCallback} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {colors} from 'BaseTheme';

export default function Layout({children, fullWidth = false, isLoading, loadingText}) {
  const getContentStyle = useCallback(() => {
    return {
      paddingHorizontal: fullWidth ? 0 : 20,
    };
  }, [fullWidth]);

  return (
    <View style={styles.container}>
      <View style={{...styles.contentContainer, ...getContentStyle()}}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" style={styles.activityIndicator} color={colors.primary} />
            <Text style={styles.loadingText}>{loadingText}</Text>
          </View>
        ) : (
          children
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
    color: colors.gray,
  },
});

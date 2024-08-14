import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const LoadingSpinner = (props) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500, // Adjust duration as needed
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.spinnerContainer}>
        <Animated.View
          style={[styles.loadingSpinner, { transform: [{ rotate: spin }] }]}
        />
      </View>
      <Image
        source={require('../../assets/images/favicon.png')} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  spinnerContainer: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderColor: '#f3f3f3',
    borderRadius: 25,
    borderTopColor: '#00544d', // Adjust color as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingSpinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  image: {
    marginTop: -53, // Adjust margin to position the image below the spinner
    width: 48,
    height: 56,
  },
});

export default LoadingSpinner;

import React, { useRef, useEffect } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window'); // Get the screen width

const SplashScreen = () => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0)).current; // Start logo scaled down
  const logoPosition = useRef(new Animated.Value(10)).current; // Start logo slightly below
  const textPosition = useRef(new Animated.Value(-10)).current; // Start text slightly above

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(logoPosition, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(textPosition, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [logoOpacity, textOpacity, logoScale, logoPosition, textPosition]);

  return (
    <View style={styles.containerSplash_screen}>
      <ImageBackground
        source={require('../../assets/images/abstract1.png')}
        style={styles.backgroundImageb2}
      >
        <View style={styles.overlayb2}>
          <Animated.Image
            source={require('../../assets/images/SAMGREEN.png')}
            style={[
              styles.logob2, 
              { 
                opacity: logoOpacity,
                transform: [{ scale: logoScale }, { translateY: logoPosition }]
              }
            ]}
            resizeMode="contain"
          />
          <Animated.Text 
            style={[
              styles.versionTextb2, 
              { 
                opacity: textOpacity,
                transform: [{ translateY: textPosition }] 
              }
            ]}
          >
            Version 2.3.4
          </Animated.Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  containerSplash_screen: {
    flex: 1,
  },
  backgroundImageb2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayb2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logob2: {
    width: width * 0.9, // 90% of screen width
    height: undefined, // Height will be calculated based on aspect ratio
    aspectRatio: 3, // Adjust the aspect ratio according to your logo's aspect ratio
    marginBottom: 20,
  },
  versionTextb2: {
    fontSize: 20,
    color: 'white',
  },
});

export default SplashScreen;

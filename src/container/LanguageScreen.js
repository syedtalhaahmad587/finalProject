// LanguageScreen.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const LanguageScreen = ({ navigation }) => {
  const handleLanguageSelect = (language) => {
    // Here you can implement logic to change the language settings
    // For now, let's just navigate back to the Home screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleLanguageSelect('arabic')}>
        <Text style={styles.languageOption}>Arabic</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLanguageSelect('english')}>
        <Text style={styles.languageOption}>English</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageOption: {
    fontSize: 20,
    marginVertical: 10,
  },
});

export default LanguageScreen;

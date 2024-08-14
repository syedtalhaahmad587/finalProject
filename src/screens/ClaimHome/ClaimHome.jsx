import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const ClaimHome = () => {
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();

  const handleClear = () => {
    setInputValue('');
  };

  const handleClaimHome = () => {
    if (inputValue.trim() !== '') {
      navigation.navigate('AddHome');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.iconContainer}>
          <Icon name="home" size={20} color="#FFFFFF" />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter home address..."
          placeholderTextColor="rgba(68, 68, 68, 0.60)"
          value={inputValue}
          onChangeText={text => setInputValue(text)}
        />
        {inputValue.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Icon name="times-circle" size={20} color="#9496A4" style={styles.clearIcon} />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={[
          styles.claimButton,
          { backgroundColor: inputValue.trim() ? '#B79E87' : '#cccccc' }, // Change button color based on input
        ]}
        onPress={handleClaimHome}
        disabled={inputValue.trim() === ''} // Disable button if no input
      >
        <Text style={styles.claimButtonText}>Claim Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'space-between', // Ensures the button is at the bottom
    paddingVertical: 20, // Adds some space at the top and bottom
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1DEDB',
    borderRadius: 25,
    paddingLeft: 10,
    height: 45,
    width: '90%',
    backgroundColor: '#FFFFFF',
    marginTop: 10,
  },
  iconContainer: {
    backgroundColor: '#B79E87', 
    borderRadius: 25,
    padding: 6,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    paddingVertical: Platform.OS === 'ios' ? 10 : 0, // Adjust padding for iOS
  },
  clearIcon: {
    paddingRight: 10,
  },
  claimButton: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  claimButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default ClaimHome;

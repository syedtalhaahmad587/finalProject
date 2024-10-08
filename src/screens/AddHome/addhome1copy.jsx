import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const AddHome = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const navigation = useNavigation();

  const handleClear = () => {
    setInputValue('');
  };

  const handleUploadDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFile(result);
      console.log('Selected file:', result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the document picker');
      } else {
        console.error('Document picker error:', err);
      }
    }
  };

  const handleTakePhoto = () => {
    ImagePicker.launchCamera({}, response => {
      if (response.assets) {
        setPhotoUri(response.assets[0].uri);
        console.log('Photo URI:', response.assets[0].uri);
      } else {
        console.error('Image picker response error:', response.errorMessage);
      }
    });
  };

  const handleVerifyAddress = () => {
    if (inputValue && (selectedFile || photoUri)) {
      navigation.navigate('VerifyAddressScreen');
    }
  };

  const isVerifyButtonEnabled = () => {
    return inputValue.trim() !== '' && (selectedFile || photoUri);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
        <View style={styles.headAddress}>
          <Text style={styles.headinneraddress}>YOUR ADDRESS</Text>
        </View>
        <View style={styles.addressSection}>
          <Text style={styles.addressTextOne}>15 Central Park W 7D,</Text>
          <Text style={styles.addressText}>New York, NY 10023</Text>
        </View>
        <Text style={styles.instructionText}>
          We need you to verify this is your home. You can upload any of the following:
        </Text>
        <Text style={styles.checkText}>✔ Deed</Text>
        <Text style={styles.checkText}>✔ Mortgage</Text>
        <Text style={styles.checkText}>✔ Tax Bill</Text>
        <Text style={styles.checkText}>✔ Utility Bill</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUploadDocument}>
            <Text style={styles.uploadButtonText}>Upload Document</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
            <Text style={styles.photoButtonText}>Take a Photo</Text>
          </TouchableOpacity>
        </View>

        {selectedFile && (
          <Text style={styles.fileInfo}>Selected file: {selectedFile.name}</Text>
        )}
        {photoUri && (
          <Image source={{ uri: photoUri }} style={styles.imagePreview} />
        )}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.verifyButton,
          { backgroundColor: isVerifyButtonEnabled() ? '#B79E87' : '#cccccc' }
        ]}
        onPress={handleVerifyAddress}
        disabled={!isVerifyButtonEnabled()}
      >
        <Text style={styles.verifyButtonText}>Verify Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 100, // Ensure content doesn't overlap the button
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
    alignSelf: 'center',
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
  headAddress: {
    paddingHorizontal: 20,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    marginTop: 20,
  },
  headinneraddress: {
    color: '#444444',
    fontWeight: '800',
    fontFamily: 'Avenir',
    fontSize: 13,
  },
  addressSection: {
    borderBottomColor: '#E1DEDB',
    borderBottomWidth: 2,
    paddingBottom: 15,
  },
  addressTextOne: {
    marginTop: 15,
    marginBottom: 5,
    paddingHorizontal: 20,
    fontSize: 15,
    color: '#444444',
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  addressText: {
    fontSize: 15,
    color: '#444444',
    paddingHorizontal: 20,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  instructionText: {
    fontSize: 15,
    color: '#444444',
    marginTop: 20,
    paddingHorizontal: 20,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  checkText: {
    fontSize: 15,
    color: '#444444',
    marginTop: 10,
    paddingHorizontal: 20,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  uploadButton: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderRadius: 10,
    marginRight: 10,
  },
  photoButton: {
    backgroundColor: '#5A5A5A',
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 50,
  },
  uploadButtonText: {
    color: '#000000',
    fontSize: 14,
  },
  photoButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  fileInfo: {
    fontSize: 14,
    color: '#000000',
    marginTop: 20,
    alignSelf: 'center',
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  verifyButton: {
    padding: 15,
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    fontFamily: 'Avenir',
  },
});

export default AddHome;

import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import styles from '../styles';
import { AppContext } from '../Context/AppContext';

const ServerURLModal = ({ visible, onClose, onSave }) => {
  const { themeColor } = useContext(AppContext);
  const [url, setURL] = useState('');

  const handleSave = () => {
    console.log(url, "url");
    if (url) {
      onSave(url);
      onClose(); // Close the modal after saving
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Server URL Text */}
          <View style={[styles.serverURLContainer, { backgroundColor: themeColor }]} >
            <Text style={styles.serverURL}>Server URL</Text>
          </View>

          {/* Input Field */}
          <View style={styles.modalContent_rt}>
            <View>
              <TextInput
                placeholder="Server URL"
                placeholderTextColor={themeColor}
                style={[styles.inputf1, { borderColor: themeColor }]}
                value={url}
                onChangeText={setURL}
              />
            </View>

            {/* Text */}
            <Text style={styles.bottomTextf1}>
              Please refer to the email you have received with your login credentials or contact your administrator for the server URL.
            </Text>

            {/* Buttons */}
            <View style={styles.buttonContainerf1}>
              <View>
                <TouchableOpacity onPress={onClose} style={[styles.buttonf1, { backgroundColor: themeColor }]}>
                  <Text style={styles.buttonTextf1} >Cancel</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={handleSave} style={[styles.buttonf1, { backgroundColor: themeColor }]} >
                  <Text style={styles.buttonTextf2}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ServerURLModal;

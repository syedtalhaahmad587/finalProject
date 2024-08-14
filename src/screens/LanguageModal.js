import React, { useContext, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppContext } from '../Context/AppContext';

const LanguageModal = ({ visible, onClose, onSelectLanguage }) => {
  const { themeColor, setThemeColor } = useContext(AppContext);
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // Default to English

  const languages = [
    { name: 'English', icon: require('../../assets/images/english.webp') },
    { name: 'Arabic', icon: require('../../assets/images/saudaiArab.webp') }
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Choose Language</Text>
          {languages.map((language, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.languageOption,
                selectedLanguage === language.name && styles.selectedLanguage
              ]}
              onPress={() => setSelectedLanguage(language.name)}
            >
              <Image source={language.icon} style={styles.flagIcon} />
              <Text style={styles.languageText}>{language.name}</Text>
              {selectedLanguage === language.name && (
                <Icon name="check-circle" size={24} color={themeColor} />
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: themeColor }]}
            onPress={() => {
              onSelectLanguage(selectedLanguage);
              onClose();
            }}
          >
            <Text style={styles.saveButtonText} >Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedLanguage: {
    backgroundColor: '#e0f7fa',
  },
  flagIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  languageText: {
    flex: 1,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#004d40',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LanguageModal;

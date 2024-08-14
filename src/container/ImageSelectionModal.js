import React, {useContext } from 'react';
import { Modal, View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions , TouchableWithoutFeedback } from 'react-native';
import { AppContext } from '../Context/AppContext';

const ImageSelectionModal = ({ isVisible, onClose, onImageSelected }) => {
    const { themeColor } = useContext(AppContext);
    const images = [
        { src: require('../../assets/images/ComponentPurple.png'), name: 'Pigment Indigo' }, // Purple
        { src: require('../../assets/images/ComponentDarkGreen.png'), name: 'SAM Green'  },  // Dark Green
        { src: require('../../assets/images/Componentgreen.png'), name: 'Greenish Black' }, // Green
        { src: require('../../assets/images/ComponentBlue.png'), name: 'Neptune' } // Sky Blue
      ];
    

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
          <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Choose Theme</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
            {images.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => onImageSelected(index)}>
                <View style={styles.imageContainer}>
                  <Image source={image.src} style={styles.image} />
                  <Text style={styles.imageName}>{image.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={[styles.doneButton, { backgroundColor: themeColor }]} onPress={onClose}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const { width } = Dimensions.get('window');
const imageWidth = width / 3;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: imageWidth,
    height: imageWidth * 2,
    resizeMode: 'contain',
  },
  imageName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  doneButton: {
    // backgroundColor: '#006400',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ImageSelectionModal;

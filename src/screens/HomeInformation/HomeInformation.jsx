import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeInformation = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [homeName, setHomeName] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [dreamPrice, setDreamPrice] = useState('');
  const [isPoolChecked, setIsPoolChecked] = useState(false);
  const [isTennisCourtChecked, setIsTennisCourtChecked] = useState(false);
  const [isWaterfrontChecked, setIsWaterfrontChecked] = useState(false);

  const togglePoolCheckbox = () => setIsPoolChecked(!isPoolChecked);
  const toggleTennisCourtCheckbox = () => setIsTennisCourtChecked(!isTennisCourtChecked);
  const toggleWaterfrontCheckbox = () => setIsWaterfrontChecked(!isWaterfrontChecked);

  const CustomCheckbox = ({ isChecked, onPress }) => {
    return (
      <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
        <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
          {isChecked && (
            <Icon name="check" size={20} color="#FFFFFF" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const toggleSwitch = () => setIsPrivate(previousState => !previousState);

  const handleUploadPhoto = () => {
    // Logic to upload photo
  };

  const handleTakePhoto = () => {
    // Logic to take a photo
  };

  return (
    <ScrollView style={styles.container}>
      {/* Home Information Section */}
      <View style={styles.switchContainer}>
        <Text style={styles.title}>MAKE HOME PRIVATE</Text>
        <Switch
          trackColor={{ false: '#E5E5EA', true: '#B79E87' }}
          thumbColor={isPrivate ? '#FFFFFF' : '#FFFFFF'}
          ios_backgroundColor="#E5E5EA"
          onValueChange={toggleSwitch}
          value={isPrivate}
        />
      </View>
      <Text style={styles.subtitle}>
        When your home is public, your home can be seen by anyone on Off-Markt.
      </Text>
      <Text style={styles.subtitle}>
        When your home is private, only the followers you approve can see the post you share about your home.
      </Text>

      <View style={styles.addressContainer}>
        <Text style={styles.addressHeader}>YOUR ADDRESS</Text>
        <Text style={styles.addressText}>15 Central Park W 7D,</Text>
        <Text style={styles.addressText}>New York, NY 10023</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Home Name *"
        value={homeName}
        onChangeText={setHomeName}
      />
      <Text style={styles.inputHint}>Be as creative as you like</Text>

      <TextInput
        style={styles.input}
        placeholder="Purchase Price"
        value={purchasePrice}
        onChangeText={setPurchasePrice}
        keyboardType="numeric"
      />
      <Text style={styles.inputHint}>
        This is the price you'd be willing to sell the property for. It will never be shown to anyone.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Dream Price"
        value={dreamPrice}
        onChangeText={setDreamPrice}
        keyboardType="numeric"
      />
      <Text style={styles.inputHint}>
        This is the price you'd be willing to sell the property for. It will never be shown to anyone.
      </Text>

      <Text style={styles.photoLabel}>Default Home Photo</Text>
      <View style={styles.photoButtonContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPhoto}>
          <Text style={styles.uploadButtonText}>Upload Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.takePhotoButton} onPress={handleTakePhoto}>
          <Text style={styles.takePhotoButtonText}>Take a Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Home Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsHeader}>HOME DETAILS</Text>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="Sq ft"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="Acreage"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="Bedrooms"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="Bathrooms"
            keyboardType="numeric"
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Taxes"
          keyboardType="numeric"
        />
        <Text style={styles.inputHint}>per year</Text>

        <TextInput
          style={styles.input}
          placeholder="HOA/ Common Charges"
          keyboardType="numeric"
        />
        <Text style={styles.inputHint}>per month</Text>
      </View>

      {/* Team Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsHeader}>TEAM</Text>
        <Text style={styles.subtitle}>
          These are all the people who brought this home to life, from the designers and architects to the contractors.
        </Text>

        <View style={styles.teamMemberContainer}>
          <Image source={{ uri: 'https://your-image-url.com' }} style={styles.teamMemberImage} />
          <View style={styles.teamMemberInfo}>
            <Text style={styles.teamMemberName}>Ryan Serhant</Text>
            <Text style={styles.teamMemberRole}>Real Estate Agent</Text>
          </View>
          <TouchableOpacity style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.addMemberText}>Add Team Member</Text>
      </View>

      {/* Amenities Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>AMENITIES</Text>

        <View style={styles.amenityItem}>
          <CustomCheckbox isChecked={isPoolChecked} onPress={togglePoolCheckbox} />
          <Text style={styles.amenityText}>Pool</Text>
        </View>

        <View style={styles.amenityItem}>
          <CustomCheckbox isChecked={isTennisCourtChecked} onPress={toggleTennisCourtCheckbox} />
          <Text style={styles.amenityText}>Tennis Court</Text>
        </View>

        <View style={styles.amenityItem}>
          <CustomCheckbox isChecked={isWaterfrontChecked} onPress={toggleWaterfrontCheckbox} />
          <Text style={styles.amenityText}>Waterfront</Text>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  addressContainer: {
    marginBottom: 20,
  },
  addressHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 16,
    color: '#000000',
  },
  input: {
    height: 50,
    borderColor: '#E5E5EA',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  smallInput: {
    width: '48%',
  },
  inputHint: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 15,
  },
  photoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 10,
  },
  photoButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#E5E5EA',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  takePhotoButton: {
    backgroundColor: '#333333',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  takePhotoButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailsHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  teamMemberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  teamMemberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  teamMemberInfo: {
    flex: 1,
  },
  teamMemberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  teamMemberRole: {
    fontSize: 14,
    color: '#666666',
  },
  removeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FF0000',
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  addMemberText: {
    fontSize: 16,
    color: '#0000FF',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxContainer: {
    marginRight: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#666666',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#000000',
  },
  amenityText: {
    fontSize: 16,
    color: '#000000',
  },
  saveButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeInformation;

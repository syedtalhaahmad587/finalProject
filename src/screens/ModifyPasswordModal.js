import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useForm, Controller } from 'react-hook-form';

const ModifyPasswordModal = ({ visible, onClose, onSave }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [secureTextEntryCurrent, setSecureTextEntryCurrent] = useState(true);
  const [secureTextEntryNew, setSecureTextEntryNew] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);

  const onSubmit = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
    onSave(data.currentPassword, data.newPassword, data.confirmPassword , onClose , reset);
    // reset();
    // onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Modify Password</Text>
          
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              rules={{
                required: 'Current password is required',
                minLength: { value: 6, message: 'Current password must be at least 6 characters' }
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Current Password"
                  secureTextEntry={secureTextEntryCurrent}
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="currentPassword"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setSecureTextEntryCurrent(!secureTextEntryCurrent)}
            >
              <Icon name={secureTextEntryCurrent ? 'eye-slash' : 'eye'} size={20} />
            </TouchableOpacity>
          </View>
          {errors.currentPassword && <Text style={styles.errorText}>{errors.currentPassword.message}</Text>}
          
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              rules={{
                required: 'New password is required',
                minLength: { value: 6, message: 'New password must be at least 6 characters' }
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="New Password"
                  secureTextEntry={secureTextEntryNew}
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="newPassword"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setSecureTextEntryNew(!secureTextEntryNew)}
            >
              <Icon name={secureTextEntryNew ? 'eye-slash' : 'eye'} size={20} />
            </TouchableOpacity>
          </View>
          {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword.message}</Text>}

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              rules={{
                required: 'Confirm password is required',
                minLength: { value: 6, message: 'Confirm password must be at least 6 characters' }
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  secureTextEntry={secureTextEntryConfirm}
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="confirmPassword"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setSecureTextEntryConfirm(!secureTextEntryConfirm)}
            >
              <Icon name={secureTextEntryConfirm ? 'eye-slash' : 'eye'} size={20} />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
        <Text style={styles.titleBottom}><Text style={styles.Alert} >Alert:</Text> After saving system will be sign out.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
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
  titleBottom: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center",
    marginTop: 0,
},
Alert: {
 color:"red"
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  eyeIcon: {
    padding: 5,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#004d40',
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ModifyPasswordModal;

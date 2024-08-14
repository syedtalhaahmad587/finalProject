import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, ScrollView , Alert , ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import PasswordClose from "../SVG/PasswordClose";
import PasswordOpen from "../SVG/PasswordOpen";
import CustomDropdown from '../container/Customdropdown';
import PhoneInput from 'react-native-phone-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RNFS from 'react-native-fs';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors }, setValue  } = useForm({
    defaultValues: {
      Role_ID: 1,
      User_Account_Type: 'L',
      User_ID: '',
      User_Password: '',
      Full_Name: '',
      User_Email: '',
      Mobile_No: '',
      Desig_ID: '',
      Expiry_Date: '2023-06-06T22:03:35',
      Is_Active: '1',
      Is_Sys_Admin_User: '0',
      // User_Image: 'null',
      Is_Login: '1',
      Last_Update_On: '2023-05-07T22:03:35',
      userLocations: [],
    },
  });
  const [designation, setDesignation] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  
console.log(image ,"imageimage")
  const getList = async () => {
    try {
      setLoading(true);
      const baseURL = await AsyncStorage.getItem('baseURL');
      const response = await axios.get(`${baseURL}/api/GetDesignation`);
      const responseData = response.data.Data.map(item => ({
        label: item.Desig_Title_P,
        value: item.Desig_ID,
      }));
      const design = response.data.Data;
      setItems(responseData);
      // if (responseData.length > 0) {
        setValue('Desig_ID', design[0].Desig_ID);
        setSelectedDesign(design[0].Desig_ID)
      // }
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setValue('User_ID', '');
      setValue('Full_Name', '');
      setValue('User_Email', '');
      setValue('Mobile_No', '');
      setValue('Desig_ID', '');
      setValue('User_Password', '');
      setImageUri(null)
      // setValue('User_Image', null);

      return () => {};
    }, [])
  );

  const handleImagePicker = () => {
    launchImageLibrary({}, (response) => {
      if (response.assets) {
        const imageUri = response.assets[0].uri;
        setImage(imageUri);
        setValue('User_Image', imageUri);
        // convertImageToBase64(imageUri);
      }
    });
  };
  // const handleImagePicker = () => {
  //   launchImageLibrary({ mediaType: 'photo' }, (response) => {
  //     handleImageResponse(response);
  //   });
  // };
  

  const handleCamera = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.assets[0].uri;
        setImage(source);
        setValue('User_Image', source); // Set the value in react-hook-form
      }
    });
  };

  const convertImageToBase64 = async (uri) => {
    try {
      const base64String = await RNFS.readFile(uri, 'base64');
      return base64String;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    console.log(data, "dataonSubmit");

    try {
      setLoading(true); // Set loading state to true before API call
      const baseURL = await AsyncStorage.getItem('baseURL');
      console.log(baseURL, "baseURL");

      const base64Image = await convertImageToBase64(data.User_Image);
      if (!base64Image) {
        Alert.alert('Error', 'Error converting image to base64');
        return;
      }
      const payload = {
        Role_ID: data.Role_ID,
      User_Account_Type: data.User_Account_Type,
      User_ID: data.User_ID,
      User_Password: data.User_Password,
      Full_Name: data.Full_Name,
      User_Email: data.User_Email,
      Mobile_No: data.Mobile_No,
      Desig_ID: data.Desig_ID,
      Expiry_Date: '2023-06-06T22:03:35',
      Is_Active: '1',
      Is_Sys_Admin_User: '0',
      // User_Image: 'null',
      Is_Login: '1',
      Last_Update_On: '2023-05-07T22:03:35',
      userLocations: [],
        User_Image: base64Image,
      };
      // const baseURL = await AsyncStorage.getItem('baseURL');
      // console.log(baseURL, "baseURL");
      const response = await axios.post(`${baseURL}/api/CreateUser`, payload );
      if (response.data.StatusCode === 201) {
        Alert.alert('Success', 'User created successfully');
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Error', `Failed to create user: ${response.data.Message}`);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false); // Ensure loading state is false in case of error
      console.error('Error creating user:', error);
      Alert.alert('Error', 'Error creating user');
    }
  };

  return (
    <>
    {loading ? <ActivityIndicator style={styles.scrollView} size="large" color="#00544d" /> : 
    <ImageBackground source={require('../../assets/images/abstract1.png')} style={styles.background_r1}>
      <ScrollView>
        <View style={styles.container_r1}>
          <Controller
            control={control}
            rules={{ required: 'Image is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[styles.imageBox, errors.image && styles.errorImageBox]}>
                {value ? (
                  <Image source={{ uri:  value}} style={styles.imagePreview_r1} />
                ) : (
                  <Ionicons name="person" size={50} color="#999" style={styles.iconPlaceholder} />
                )}
              </View>
            )}
            name="User_Image"
          /> 
           <View style={styles.imagePickerContainer_r1}>
            <TouchableOpacity style={styles.imagePickerButton_r1} onPress={handleImagePicker}>
              <Text style={styles.imagePickerText_r1}>Upload Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imagePickerButton_r1} onPress={handleCamera}>
              <Text style={styles.imagePickerText_r1}>Capture Image</Text>
            </TouchableOpacity>
          </View>
           <Controller
            control={control}
            rules={{ 
              required: 'User ID is required', 
              minLength: {
                value: 8,
                message: 'Field value cannot be less than 8 characters',
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={[styles.input_r1, errors.User_ID && styles.errorInput]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="User ID"
                  placeholderTextColor="green"
                />
                {errors.User_ID && <Text style={styles.errorText}>{errors.User_ID.message}</Text>}
              </>
            )}
            name="User_ID"
          />
          <Controller
            control={control}
            rules={{ 
              required: 'Full Name is required',
              minLength: {
                value: 8,
                message: 'First name cannot be less than 8 characters',
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={[styles.input_r1, errors.Full_Name && styles.errorInput]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Full Name"
                  placeholderTextColor="green"
                />
                {errors.Full_Name && <Text style={styles.errorText}>{errors.Full_Name.message}</Text>}
              </>
            )}
            name="Full_Name"
          />
          <Controller
            control={control}
            rules={{ 
              required: 'Email ID is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'The User Email field is not a valid e-mail address',
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={[styles.input_r1, errors.User_Email && styles.errorInput]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Email ID"
                  placeholderTextColor="green"
                />
                {errors.User_Email && <Text style={styles.errorText}>{errors.User_Email.message}</Text>}
              </>
            )}
            name="User_Email"
          />
           {/* <CustomDropdown 
            items={items} 
            loading={loading} 
            control={control}
            name="Desig_ID"
           setSelectedDesign={setSelectedDesign}
         selectedDesign={selectedDesign}
          /> */}
           <Controller
        name="Desig_ID"
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => (
          <CustomDropdown
            items={items}
            value={value}
            onChange={onChange}
            placeholder="Select Region"
            iconName="globe"
            style={styles.inputContainer} // Apply additional styles here
            color="black"
            style2={styles.input} // Apply additional styles here
          />
        )}
      />
          
  <Controller
            control={control}
            rules={{ 
              required: 'Mobile Number is required',
              minLength: {
                value: 11,
                message: 'Mobile No cannot be less than 11 characters e.g +1 306 7004950',
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <PhoneInput
                  style={[styles.input_r1, errors.Mobile_No && styles.errorInput]}
                  initialCountry="ca"
                  value={value}
                  onChangePhoneNumber={onChange}
                  onBlur={onBlur}
                />
                {errors.Mobile_No && <Text style={styles.errorText}>{errors.Mobile_No.message}</Text>}
              </>
            )}
            name="Mobile_No"
          />
        <Controller
            control={control}
            rules={{ 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'The User Password value cannot be less than 8 characters',
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input_r1, errors.User_Password && styles.errorInput]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter Password"
                    placeholderTextColor="green"
                    secureTextEntry={!passwordVisible}
                  />
                  <TouchableOpacity style={styles.passwordIconContainer} onPress={() => setPasswordVisible(!passwordVisible)}>
                    {/* <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="black" /> */}
                    {passwordVisible ? <PasswordOpen width="30" height="30" color="#00544d" /> : <PasswordClose width="30" height="30" color="#00544d" />}
                  </TouchableOpacity>
                </View>
                {errors.User_Password && <Text style={styles.errorText}>{errors.User_Password.message}</Text>}
              </>
            )}
            name="User_Password"
          />
       
          {/* <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={onChange}
                setItems={setItems}
                onBlur={onBlur}
                placeholder="Select designation"
                style={[styles.input_r1, { zIndex: 1000 }]}
                placeholderStyle={{ color: 'green' }}
                dropDownContainerStyle={{ zIndex: 1000 }}
              />
            )}
            name="Desig_ID"
          /> */}
          <TouchableOpacity style={styles.submitButton_r1} disabled={loading} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.submitButtonText_r1}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
}
</>
  );
};

const styles = StyleSheet.create({
    background_r1: {
        flex: 1,
        resizeMode: 'cover',
      },
      scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      container_r1: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logo_r1: {
        width: "90%",
        textAlign: "center",
        marginBottom: 15
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'green',
        paddingRight: 5,
        marginBottom:15,
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white',
      },
      input: {
        flex: 1,
        marginLeft: 10,
        color: 'green',
      },
      heading_r1: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
      input_r1: {
        // height:50,
        width: '100%',
        // padding: 15,
        paddingHorizontal:10,
    paddingVertical:10,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
        color: '#000',
      },
      dropdown_r1: {
        width: '100%',
        borderColor: 'green',
        borderRadius: 10,
        marginBottom: 15,
      },
      dropdownContainer_r1: {
        borderColor: 'green',
        borderRadius: 10,
        maxHeight: 200
      },
      placeholderStyle_r1: {
        color: 'green',
      },
      errorInput: {
        borderColor: 'red',
      },
      errorDropdown: {
        borderColor: 'red',
      },
      errorText: {
        color: 'red',
        marginBottom: 10,
        alignSelf: 'flex-start',
        textAlign: 'left',
      },
      errorText_center: {
        color: 'red',
        marginBottom: 10,
        // alignSelf: 'flex-start',
        // textAlign: 'left',
      },
      
      errorImageBox: {
        borderColor: 'red',
      },
      imagePickerContainer_r1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
      },
      imagePickerButton_r1: {
        flex: 1,
        backgroundColor: '#ddd',
        // padding: 15,
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
      },
      imagePickerText_r1: {
        color: '#000',
      },
      imageBox: {
        width: 120,
        height: 120,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#ffff",
        borderWidth: 1,
        borderColor: 'green',
        marginBottom: 20,
        // marginTop:
      },
      imagePreview_r1: {
        width: 120,
        height: 120,
        borderRadius: 75,

      },
      imagePreview_r1  : {
        width: 120,
        height: 120,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#ffff",
        borderWidth: 1,
        borderColor: 'green',
        // marginBottom: 20,
        

      },
      
      iconPlaceholder: {
        textAlign: 'center',
      },
      submitButton_r1: {
        width: '100%',
        backgroundColor: '#046357',
        padding: 15,
        // opacity:1,
        borderRadius: 10,
        alignItems: 'center',
      },
      submitButtonText_r1: {
        color: '#fff',
        fontSize: 16,
      },
      passwordContainer: {
        flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
      },
      passwordIconContainer: {
        position: 'absolute',
        bottom:7,
        right: 10,
        justifyContent: 'center',
        height: '100%',
      },
});

export default RegistrationScreen;

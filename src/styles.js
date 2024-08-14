import { StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
// const styles = (theme) => StyleSheet.create({
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },  
  companyLogo: {
    marginTop: 20, // Adjust as per your layout needs
    width: 50,
    height: 50,
    marginLeft:100
  },
  container: {
    flex: 1,
    paddingVertical: 20, // top and bottom padding
    paddingHorizontal: 30, // horizontal padding
    justifyContent: 'space-between', // space between elements
  },  
   logoContainer: {
     alignItems: 'center',
  },
  logo: {
    color: 'white',
    fontSize: 24,
    marginBottom: 10,
    width:"100%",
    marginTop: "45%" // margin below the logo
  },
  buttonContainer: {
    justifyContent: 'flex-start', // align buttons to the start (top) of the container
  },
  btn1: {
    marginTop: "7%"
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20, // margin between buttons
     
  },
  buttonText: {
    textAlign:"center",
    color: '#00544d',
    fontSize: 16,
     fontWeight: '700',
    fontFamily: 'YourCustomFontFamily',
  },
  bottomContainer: {
    alignItems: 'center',
  },
  bottomLinks: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  bottomLinkText: {
    color: 'white',
    marginRight: 5, // space between bottom links
  },
  bottomText: {
    color: 'white',
  },
 
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    padding: 0,
    borderRadius: 10,
    alignItems: 'center',
    
  },
  serverURLContainer: {
    backgroundColor: '#00544d',
    paddingVertical: 20,
    marginBottom: 0,
    borderRadius: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20, // Add horizontal padding for better spacing
  },
  serverURL: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
    marginLeft: 0, // Ensure text doesn't overlap with the icon
  },
  cancelIcon: {
    width: 24,
    height: 24,
    
  },
  inputf1: {
    backgroundColor: 'white',
    width: '100%',
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center',
    color: '#00544d',
  },
  buttonTextf1: {
      color: 'white',
    textAlign: 'center'
  },
  buttonTextf2: {
    color: 'white',
    textAlign: 'center'
  },
  buttonContainerf1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  buttonf1: {
    backgroundColor: '#00544d',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius:10
    // flex: 1, // Use flex: 1 to take equal space
    // marginHorizontal: 5, // Add margin between buttons
    // alignItems: 'center',
    // justifyContent: 'center', // Center vertically
  
  },
  bottomTextf1: {
    color: 'black',
    textAlign: 'justify',
    lineHeight: 20,
    marginBottom: 20,
    fontWeight: "500",
    fontSize:15
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'black', // Change this to white if needed
  },
  modalContent_rt :{
    padding: 10
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center', // Center the modal vertically
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentf2: {
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  serverURLContainerf2: {
    // backgroundColor: '#00544d',
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  serverURLContainer_bottom_f2:{
    // backgroundColor: '#00544d',
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

  },
  serverURLf2: {
    color: 'white',
    // textAlign: 'center',
    fontWeight: "700",
    fontSize: 16,
    flex: 1,
    marginLeft: 0,
  },
  serverURL_bottom_f2: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
    marginLeft: 0,
  },
  cancelIcon: {
    width: 24,
    height: 24,
  },
  modalContent_rt_f2: {
    flex: 1,
    paddingHorizontal: 12
  },
  scrollViewContentf2: {
    paddingVertical: 20,
  },
  modalTextf2: {
    marginBottom: 20,
    textAlign: 'left',
    paddingHorizontal: 10
  },
  closeButtonf2: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  closeButtonTextf2: {
    color: 'white',
    fontWeight: 'bold',
  },
  textStyleSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "BLACK",
    paddingBottom: 5,
    textAlign: 'justify',
    lineHeight: 20,
  },
  textStyle_second: {
    paddingTop: 8
   },
  textStyle_H1: {
    fontSize: 16,
    fontWeight: "700",
    color: "BLACK",
  },
  textStyleSubtitle_TEXT: {
    fontSize: 14,
    fontWeight: "500",
    color: "BLACK",
    textAlign: 'justify',
    lineHeight: 20,
    paddingTop: 5
  },
  textStyleSubtitle_TEXT_f2: {
    fontSize: 14,
    fontWeight: "500",
    color: "BLACK",
    textAlign: 'justify',
    lineHeight: 20,
    paddingTop: 14
  },
  loginFormContainer: {
    alignItems: 'center',
    width:"100%"
  },
  button_login: {
    backgroundColor: '#046357', // Color with 50% opacity
    paddingVertical: 15,
    paddingHorizontal: 0,
    marginHorizontal: 10,
    marginTop: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
    // shadowColor: '#000000',
    // shadow/Offset: { width: 0, height: 4 },
    Opacity: 0.5,
    // shadowRadius: 4,
    // elevation: 8, 
  },
  buttonText_login: {
    color: '#ffff',
    fontWeight: "700",
    fontSize: 16,
    textAlign:"center"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',

  },
  
  passwordIconContainer: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    height: '100%',
  },
  input_login_form: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  
  forgetPasswordContainer: {
    marginVertical: 0,
    width:"100%"
    
  },
  forgetPasswordText: {
    color: 'white',
    textAlign:"right",
    fontWeight:"600",
  },
  errorText: {
    color: 'red',
    // marginBottom: 10,
    alignSelf: 'flex-start',
    textAlign: 'left',
    
  },
  errorInput: {
    borderColor: 'red',
  },
}); 

export default styles;

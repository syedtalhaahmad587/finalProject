import React , { useContext }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Change the icon library if needed
import { AppContext } from '../Context/AppContext';

const AccessGranted = (valueName) => {
  const { summary , themeColor } = useContext(AppContext);
  const data = {
    icon: 'check',
    label: '',
    value: 62569,
  };

  return (
    <View style={[styles.card , { borderColor: themeColor }]}>
      <View style={[styles.iconContainer , { backgroundColor: themeColor }]}>
        <Icon name={data.icon} size={40} color="#ffffff" style={styles.icon} />
      </View>
      <View style={styles.iconContainer_first_text}>
      <Text style={[styles.label , { color: themeColor }]} >Access{'\n'}Granted</Text>
      </View>
      <View style={styles.iconContainer_second_text}>
      <Text style={[styles.value , { color: themeColor }]}>{summary?.Access_Granted}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height:80,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    // padding: 20,
    paddingHorizontal:20,
    // paddingVertical:20,
    // margin: 10,
    alignItems: 'center',
    elevation: 3,
    borderWidth: 1,
    
    flexDirection: 'row', // Ensure the icon and text are in a row
    justifyContent: 'space-between',
    position:"relative"
  },
  iconContainer: {
    
    borderRadius: 10,
    padding: 10,
    position:"absolute",
    marginRight: 10, // Adjust spacing between icon and text
    top:-30,
    left:10
  },
  iconContainer_first_text: {
    borderRadius: 10,
    padding: 10,
    position:"absolute",
    marginRight: 10, // Adjust spacing between icon and text
    top:-10,
    left:75
  },
  iconContainer_second_text: {
    width:"100%",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
  },
  icon: {
    alignSelf: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Ensure the label takes up the remaining space
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    flexDirection:"row",
    justifyContent:"center",
    textAlign: 'center',
    paddingTop: 30,
  },
});

export default AccessGranted;

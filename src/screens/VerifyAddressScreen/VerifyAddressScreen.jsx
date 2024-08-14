import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import BrowseHomes from "../../SVG/BrowseHomes";

export default function VerifyAddressScreen() {
    const navigation = useNavigation();

    const HandleBrowseHomes = () => {
        navigation.navigate('Home Information');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.content}>
                {/* <Icon name="location-on" size={50} color="#FFFFFF" /> */}
                <View style={styles.BrowseColor} >
                <BrowseHomes color="#00544d" />
                </View>
                {/* <BrowseHomes /> */}
                <Text style={styles.message}>
                    Sit tight, we’re verifying your address. This will only take a few minutes. We’ll notify you once it’s done.
                </Text>
            </View>
            <TouchableOpacity style={styles.buttonRnt} onPress={HandleBrowseHomes}>
                <Text style={styles.buttonText}>Browse Homes</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#B69E86', // Background color matching the image
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        textAlign: 'center',
        color: '#FFFFFF',
        marginTop: 20,
        fontSize: 15,
        fontWeight: "400",
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif', // Font fallback for Android
        lineHeight: 20,
    },
    buttonRnt: {
        backgroundColor: '#444444', // Button background color matching the image
        paddingVertical: 15,
        borderWidth: 1,
        paddingHorizontal: 60,
        borderRadius: 5,
        marginBottom: 20,
        width: '90%',
    },
    buttonText: {
        fontSize: 17,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: "800",
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif', // Font fallback for Android
        lineHeight: 20,
    },
    BrowseColor: {
          marginRight:30
    }
});

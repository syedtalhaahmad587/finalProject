import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ChatScreen() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Thanks for the note. Yes, we can do 1:00pm EST on Friday July 12. Call me then.",
                createdAt: new Date('2024-07-12T09:36:00'),
                user: {
                    _id: 2,
                    name: 'Michael Rubin',
                    avatar: require('../../../assets/images/doortick_01.png'),
                },
            },
            {
                _id: 2,
                text: "Hey Michael - I love this home. Been looking for something for a long time. You free sometime this week?",
                createdAt: new Date('2024-07-10T11:07:00'),
                user: {
                    _id: 1,
                    // name: 'You',
                    avatar: require('../../../assets/images/doortick_01.png'),
                },
            },
        ]);
    }, []);

    const onSend = (newMessages = []) => {
        setMessages(GiftedChat.append(messages, newMessages));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Video Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Schedule a Visit</Text>
                </TouchableOpacity>
            </View>
            <GiftedChat
                messages={messages}
                onSend={newMessages => onSend(newMessages)}
                user={{ _id: 1 }}
                renderBubble={(props) => (
                    <View style={styles.bubbleContainer}>
                       
                        <Bubble
                            {...props}
                            wrapperStyle={{
                                right: styles.bubbleRight,
                                left: styles.bubbleLeft,
                            }}
                            textStyle={{
                                right: styles.textRight,
                                left: styles.textLeft,
                            }}
                            renderCustomView={() => (
                                <View style={styles.bubbleContent}>
                                    <View style={styles.bubbleInner}>
                                        <Text style={[
                                styles.userName,
                                props.currentMessage.user._id === 1 ? styles.userNameRight : styles.userNameLeft,
                            ]}>{props.currentMessage.user.name}</Text>
                                        <Text 
                                          style={[
                                styles.messageTime,
                                props.currentMessage.user._id === 1 ? styles.messageTimeRight : styles.messageTimeLeft,
                            ]}
                                        >
                                            {new Date(props.currentMessage.createdAt).toLocaleString()}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        />
                        {props.currentMessage.user._id === 1 && (
                            <View style={styles.imgRound}>
                            <Image
                                source={props.currentMessage.user.avatar}
                                style={styles.avatarRight}
                            />
                            </View>
                        )}
                    </View>
                )}
                renderInputToolbar={(props) => (
                    <InputToolbar
                        {...props}
                        containerStyle={styles.inputToolbar}
                    />
                )}
                renderSend={(props) => (
                    <Send {...props}>
                        <View style={styles.sendButton}>
                            <Text style={styles.sendButtonText}>➤</Text>
                        </View>
                    </Send>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        borderColor: '#444',
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
    },
    bubbleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    bubbleRight: {
        backgroundColor: '#B69E86',
        padding: 10,
        borderBottomRightRadius: 0,
        borderTopEndRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        marginLeft: 'auto',
        marginRight:5,
    },
    messageTimeRight: {
       color:"#ffff"      
    },
    userNameLeft: {
        marginLeft:10
    },
    bubbleLeft: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderBottomRightRadius: 20,
        borderTopEndRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 0,
    },
    textRight: {
        color: '#FFFFFF',
    },
    textLeft: {
        color: '#444',
    },
    inputToolbar: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#e0e0e0',
        paddingHorizontal: 8,
    },
    sendButton: {
        marginBottom: 5,
        marginRight: 10,
    },
    sendButtonText: {
        fontSize: 18,
        color: '#ffffff',
        backgroundColor: '#D3A68F',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    imgRound: {
        width: 40,
        height: 40,
        borderRadius: 1000,
        borderWidth:1,
        marginTop:"30%",
        flexDirection:"row",
        alignItems:"center"
    },
    bubbleInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginLeft: 0,
    },
    bubbleContent: {
        maxWidth: '80%',
    },
    userName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000000',
    },
    messageTime: {
        fontSize: 10,
        color: '#979797',
    },
    avatarLeft: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    avatarRight: {
        width: 24,
        height: 24,
        borderRadius: 15,
        marginLeft: 10,
    },
});

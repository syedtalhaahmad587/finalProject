import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet , ScrollView } from 'react-native';
import Sound from 'react-native-sound';

// Enable playback in silence mode (iOS only)
Sound.setCategory('Playback');

const Door = ({ id, doorOpenSound }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleButton = () => {
    setIsOpen(true);
    // Play the sound when the door is opened
    doorOpenSound.play();
  };

  const toggleButtonClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 2000); // 2 seconds
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    
    <View style={[styles.loopFirstContainer, isOpen && styles.backDark]}>
      <View style={styles.flexRow}>
        <Text style={[styles.entRt, isOpen && styles.backColorSec]}>ENT {id}</Text>
        <View style={styles.switchHt}>
          <Image
            source={isOpen ? require('../../assets/images/doortick_01.png') : require('../../assets/images/doorcross_01.png')}
            style={styles.image}
          />
        </View>
      </View>
      <View style={[styles.creatV4Container, isOpen && styles.backColor]}>
        {!isOpen ? (
          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.innerContainer} onPress={toggleButton}>
              <View style={styles.circleLoop}></View>
            </TouchableOpacity>
            <View style={styles.innerGateOpen}>
              <Text style={styles.innerGateOpenText}>Open</Text>
            </View>
          </View>
        ) : (
          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.innerGateClose} onPress={toggleButtonClose}>
              <Text style={styles.innerGateCloseText}>Close</Text>
            </TouchableOpacity>
            <View style={styles.innerContainerRight}>
              <View style={styles.circleLoopRight}></View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const DoorToggle = () => {
  // Load the sound file
  const doorOpenSound = new Sound(require('../../assets/Sound/doorOpen.wav'), (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
    }
  });

  return (
    <ScrollView>
    <View style={styles.mainContainer}>
      <Door id="001" doorOpenSound={doorOpenSound} />
      <Door id="002" doorOpenSound={doorOpenSound} />
      <Door id="003" doorOpenSound={doorOpenSound} />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  loopFirstContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: 'rgba(0, 0, 0, 0.35) 8px 4px 4px 2px',
    paddingVertical: 0,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    height: 150,
    justifyContent: 'center',
  },
  backDark: {
    backgroundColor: '#00544d',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },
  entRt: {
    color: '#00544d',
  },
  backColorSec: {
    color: '#fff',
  },
  switchHt: {
    width: 40,
    height: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  creatV4Container: {
    backgroundColor: '#00544d',
    borderRadius: 25,
    boxShadow: 'rgba(0, 0, 0, 0.35) 8px 4px 4px 2px',
    height: 40,
    width: 300,
    paddingVertical: 0,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  backColor: {
    backgroundColor: '#fff',
  },
  innerContainerRight: {
    width: 100,
    height: 26,
    marginTop: 8,
    backgroundColor: '#00544d',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    transition: '0.5s ease',
  },
  width: {
    width: '100%',
  },
  innerContainer: {
    width: 100,
    height: 26,
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'flex-end',
    alignItems: 'center',
    transition: '0.5s ease',
  },
  circleLoop: {
    height: 22,
    width: 22,
    backgroundColor: '#00544d',
    borderRadius: 50,
    marginBottom: 2,
    marginLeft: '65%',
  },
  innerGateOpen: {
    marginRight: 10,
    marginTop: 4,
  },
  innerGateOpenText: {
    color: '#fff',
    fontWeight: '500',
  },
  innerGateClose: {
    marginLeft: 10,
    marginTop: 4,
  },
  innerGateCloseText: {
    color: '#00796b',
    fontWeight: '500',
  },
  circleLoopRight: {
    height: 22,
    width: 22,
    backgroundColor: '#bbb',
    borderRadius: 50,
    marginBottom: 1,
    marginRight: '65%',
  },
});

export default DoorToggle;

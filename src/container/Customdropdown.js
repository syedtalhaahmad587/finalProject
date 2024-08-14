import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';

const CustomDropdown = ({ items, value, onChange, color, placeholder, iconName, style, style2 }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter items based on search query
  const filteredItems = items.filter(item =>
    item.label && item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle selection of an item
  const handleSelect = (value) => {
    onChange(value);
    setOpen(false);
  };

  const handleSelectPress = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  return (
    <View style={[styles.container, { zIndex: isOpen ? 1 : 0 }]}>
      <TouchableOpacity style={[style]} onPress={handleSelectPress}>
        <Icon name={iconName} size={20} color={color} style={styles.icon} />
        <Text style={[style2]}>
          {value !== null ?
            (items.find(item => item.value === value)?.label || value) :
            placeholder
          }
        </Text>
        <Icons name="arrow-drop-down" size={24} color={color} />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownList}>
          <TextInput
            placeholder="Type something..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
          <ScrollView nestedScrollEnabled={true}>
            <FlatList
              data={filteredItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedItem(item);
                    setOpen(false);
                    setSearchQuery('');
                    handleSelect(item.value);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{item.label}</Text>
                  {selectedItem && selectedItem.value === item.value && (
                    <Icon name="check" size={24} color="green" />
                  )}
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative', // Ensure proper stacking context
  },
  icon: {
    marginRight: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  dropdownList: {
   // marginTop: 5,
   borderWidth: 1,
   borderColor: 'green',
   color:'green',
   backgroundColor: 'white',
   borderRadius: 5,
   maxHeight: 200,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropdownItemText: {
    fontSize: 16,
  },
});

export default CustomDropdown;

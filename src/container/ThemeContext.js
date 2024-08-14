// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const themes = {
  light: {
    backgroundColor: '#00544d',
    textColor: 'black',
    modalBackgroundColor: 'white',
    buttonBackgroundColor: '#00544d',
    buttonBackgroundColorR2: '#00544d',
    buttonTextColor: '#00544d',
    buttonTextColorR2: '#FFFF',
    inputBackgroundColor: 'white',
    inputTextColor: 'green',
    borderColor: 'green',
    linkColor: 'blue',
  },
  dark: {
    backgroundColor: 'black',
    textColor: 'white',
    modalBackgroundColor: '#333',
    buttonBackgroundColor: 'gray',
    buttonTextColor: 'black',
    inputBackgroundColor: '#555',
    inputTextColor: 'white',
    borderColor: 'gray',
    linkColor: 'lightblue',
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

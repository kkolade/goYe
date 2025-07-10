import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('themePreference');
        if (savedTheme !== null) {
          setIsDark(savedTheme === 'dark');
        } else {
          // If no saved preference, use system preference
          setIsDark(colorScheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, [colorScheme]);

  // Toggle between light and dark theme
  const toggleTheme = async () => {
    try {
      const newThemeValue = !isDark;
      setIsDark(newThemeValue);
      await AsyncStorage.setItem('themePreference', newThemeValue ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  // Set theme without toggling
  const setTheme = async (dark) => {
    try {
      setIsDark(dark);
      await AsyncStorage.setItem('themePreference', dark ? 'dark' : 'light');
    } catch (error) {
      console.error('Error setting theme preference:', error);
    }
  };

  if (isLoading) {
    return null; // Or a loading indicator
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

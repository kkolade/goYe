import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './src/store';
import Navigation from './src/navigation';

// Define theme
const theme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#fff',
    surface: '#fff',
    surfaceVariant: '#f5f5f5',
    text: '#000',
    onSurface: '#000',
    onSurfaceVariant: '#666',
    disabled: '#aaa',
    placeholder: '#666',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    shadow: '#000',
    error: '#B00020',
  },
  roundness: 4,
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Navigation />
        </PaperProvider>
      </SafeAreaProvider>
    </StoreProvider>
  );
}

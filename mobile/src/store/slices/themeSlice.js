import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light', // 'light' or 'dark'
  colors: {
    light: {
      primary: '#6200ee',
      background: '#ffffff',
      card: '#ffffff',
      text: '#000000',
      border: '#e0e0e0',
      notification: '#ff3b30',
    },
    dark: {
      primary: '#bb86fc',
      background: '#121212',
      card: '#1e1e1e',
      text: '#ffffff',
      border: '#383838',
      notification: '#cf6679',
    },
  },
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      if (['light', 'dark'].includes(action.payload)) {
        state.theme = action.payload;
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export const selectTheme = (state) => ({
  ...state.theme.colors[state.theme.theme],
  mode: state.theme.theme,
});

export default themeSlice.reducer;

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

type Mode = 'light' | 'dark';

type Colors = {
  background: string;
  text: string;
  label: string;
  inputBg: string;
  inputBorder: string;
  primary: string;
  link: string;
  muted: string;
};

type ThemeContextType = {
  mode: Mode;
  colors: Colors;
  toggleTheme: () => void;
};

const light: Colors = {
  background: '#ffffff',
  text: '#111111',
  label: '#333333',
  inputBg: '#ffffff',
  inputBorder: '#dddddd',
  primary: '#007aff',
  link: '#007aff',
  muted: '#666666',
};

const dark: Colors = {
  background: '#121212',
  text: '#ffffff',
  label: '#e5e5e5',
  inputBg: '#1c1c1e',
  inputBorder: '#2c2c2e',
  primary: '#0a84ff',
  link: '#0a84ff',
  muted: '#999999',
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  colors: light,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('light');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('@theme');
      if (saved === 'light' || saved === 'dark') setMode(saved);
      else {
        const sys = Appearance.getColorScheme();
        setMode(sys === 'dark' ? 'dark' : 'light');
      }
    })();
  }, []);

  const toggleTheme = async () => {
    const next = mode === 'light' ? 'dark' : 'light';
    setMode(next);
    await AsyncStorage.setItem('@theme', next);
  };

  const colors = mode === 'dark' ? dark : light;

  const value = useMemo(() => ({ mode, colors, toggleTheme }), [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

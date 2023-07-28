'use client';

import React, { useEffect, useState } from 'react';
import {
  createTheme,
  PaletteMode,
  ThemeOptions,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import NextAppDirEmotionCacheProvider from '@/cache/EmotionCache';
import CssBaseline from '@mui/material/CssBaseline';

type ConTextType = null | { toggleThemeMode: () => void };

export const ThemeModeContext = React.createContext<ConTextType>(null);

const getThemeOptions = (mode: PaletteMode) => {
  return {
    palette: {
      mode,
    },
    components: {
      MuiTypography: {
        defaultProps: {
          align: 'center',
          textTransform: 'capitalize',
        },
      },
    },
  } as ThemeOptions;
};

const CustomThemeProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeMode, setThemeMode] = useState<PaletteMode>('dark');

  const value = React.useMemo(
    () => ({
      toggleThemeMode: () => {
        setThemeMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        );
      },
    }),
    []
  );

  const theme = React.useMemo(
    () => createTheme(getThemeOptions(themeMode)),
    [themeMode]
  );

  useEffect(() => {
    prefersDarkMode && setThemeMode('dark');
  }, [prefersDarkMode]);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeModeContext.Provider value={value}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </NextAppDirEmotionCacheProvider>
  );
};

export default CustomThemeProvider;

'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeModeContext } from '@/reducers/ThemeProvider';
import { Button } from '@mui/material';
import { useContext } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { toggleThemeMode } = useContext(ThemeModeContext);

  return (
    <>
      <Button
        onClick={toggleThemeMode}
        variant={'outlined'}
        sx={{
          textTransform: 'capitalize',
          position: 'fixed',
          top: 10,
          right: 20,
          borderRadius: 5,
          color: 'common.white',
          borderColor: 'common.white',
        }}
      >
        Change Theme
      </Button>
      <Box
        component="main"
        sx={{
          p: 3,
        }}
      >
        {children}
      </Box>
    </>
  );
}

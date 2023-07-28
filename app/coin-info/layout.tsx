'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeModeContext } from '@/reducers/ThemeProvider';
import { AppBar, Button, Toolbar, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { useContext } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const { toggleThemeMode } = useContext(ThemeModeContext);

  return (
    <>
      <AppBar position="static" sx={{ boxShadow: 20 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link href={'/'} style={{ textDecoration: 'none' }}>
            <Typography
              color={
                theme.palette.mode === 'dark' ? 'warning.main' : 'common.white'
              }
            >
              Test Project
            </Typography>
          </Link>
          <Button
            color={theme.palette.mode === 'dark' ? 'warning' : 'inherit'}
            sx={{ textTransform: 'capitalize' }}
            onClick={toggleThemeMode}
          >
            Change Theme
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          bgcolor: 'background.default',
        }}
      >
        {children}
      </Box>
    </>
  );
}

import * as React from 'react';
import CustomThemeProvider from '@/reducers/ThemeProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CustomThemeProvider>{children}</CustomThemeProvider>
      </body>
    </html>
  );
}

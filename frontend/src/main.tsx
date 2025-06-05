import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './app/theme/theme';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
    </BrowserRouter>
  // </StrictMode>
);
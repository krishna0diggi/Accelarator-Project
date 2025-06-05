// src/theme/index.ts
import { createTheme } from '@mui/material/styles';
import { alpha, PaletteMode } from '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    transparent: true;
    cancel: true;
    danger: true;
    'new-features': true;
  }
}

const PRIMARY_COLOR = '#2d5876';
const PRIMARY_HOVER = '#23234a'; // 20% darker for hover
const SECONDARY_COLOR = '#2d5876';
const BACKGROUND_WHITE = '#FFFFFF'; // 
const TEXT_PRIMARY = '#323232'; // 
const TEXT_SECONDARY = '#6e6e6e';
const BORDER_RADIUS = 12;
const INPUT_HEIGHT = 50;
const FONT_SIZE = 14;

const theme = createTheme({
  palette: {
    mode: 'light' as PaletteMode,
    primary: {
      main: PRIMARY_COLOR,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: SECONDARY_COLOR,
      contrastText: '#FFFFFF',
    },
    background: {
      default: BACKGROUND_WHITE,
      paper: BACKGROUND_WHITE,
    },
    text: {
      primary: TEXT_PRIMARY,
      secondary: TEXT_SECONDARY,
    },
    divider: '#e0e0e0',
  },

  shape: {
    borderRadius: BORDER_RADIUS,
  },

  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: FONT_SIZE,
    button: {
      textTransform: 'none',
      fontWeight: 700,
      font:PRIMARY_COLOR
    },
  },

  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        InputLabelProps: { shrink: true },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: BACKGROUND_WHITE,
          borderRadius: BORDER_RADIUS,
          height: INPUT_HEIGHT,
          padding: '0 8px',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: PRIMARY_COLOR,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: PRIMARY_COLOR,
          },
        },
        notchedOutline: {
          borderColor: '#ccc',
        },
        input: {
          fontSize: FONT_SIZE,
          fontWeight: 500,
          color: TEXT_PRIMARY,
          padding: '14px 0',
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: TEXT_PRIMARY,
          fontWeight: 500,
          '&.Mui-focused': {
            color: PRIMARY_COLOR,
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS,
          padding: '10px 24px',
          fontWeight: 600,
          fontSize: FONT_SIZE,
          textTransform: 'capitalize',
        },
        contained: {
          backgroundColor: PRIMARY_COLOR,
          color: '#ffffff',
          '&:hover': {
            backgroundColor: PRIMARY_HOVER,
            color: '#ffffff',
            opacity: 1,
          },
          '&:disabled': {
            backgroundColor: '#e5e7eb',
            color: '#9ca3af',
          },
        },
      },
      variants: [
        {
          props: { variant: 'transparent' },
          style: {
            backgroundColor: 'transparent',
            color: PRIMARY_COLOR,
            border: `2px solid ${PRIMARY_COLOR}`,
            '&:hover': {
              backgroundColor: PRIMARY_COLOR,
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'cancel' },
          style: {
            backgroundColor: '#DFE0E1',
            color: '#000000',
            '&:hover': {
              backgroundColor: '#cccccc',
            },
          },
        },
        {
          props: { variant: 'danger' },
          style: {
            backgroundColor: '#dc2626',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#b91c1c',
            },
          },
        },
        {
          props: { variant: 'new-features' },
          style: {
            background: 'transparent',
            transition: 'background 0.3s, box-shadow 0.3s, transform 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            '&:hover': {
              transform: 'translateY(-2px) scale(1.04)',
            },
          },
        },
      ],
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: BACKGROUND_WHITE,
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: BACKGROUND_WHITE,
          borderRadius: BORDER_RADIUS,
          padding: 8,
          minWidth: 180,
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: TEXT_PRIMARY,
          fontSize: FONT_SIZE,
          fontWeight: 500,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 16,
          paddingRight: 16,
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: PRIMARY_COLOR,
          color: '#fff',
          fontWeight: 600,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#f6f7fb',
          },
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: '#fff !important',
          '&.Mui-active': {
            color: '#fff !important',
          },
        },
        icon: {
          color: '#fff !important',
        },
      },
    },
     MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: SECONDARY_COLOR,
            '&:hover': {
              backgroundColor: alpha(SECONDARY_COLOR, 0.08),
            },
          },
        },
        track: {
          '.Mui-checked + &': {
            backgroundColor: SECONDARY_COLOR,
          },
        },
      },
    }
  },
  
});

export default theme;

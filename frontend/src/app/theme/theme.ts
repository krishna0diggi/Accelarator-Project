// src/theme/index.ts
import { createTheme } from '@mui/material/styles';
import { alpha, PaletteMode } from '@mui/material';

// Extend ButtonPropsVariantOverrides to allow custom variants
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    transparent: true;
    cancel: true;
    danger: true;
    'new-features': true;
  }
}

// const PRIMARY_COLOR = '#2d5876';
// const PRIMARY_HOVER = '#23234a'; // 20% darker for hover
// const SECONDARY_COLOR = '#2d5876';
// const BACKGROUND_WHITE = '#FFFFFF'; //
// const TEXT_PRIMARY = '#323232'; //
// const TEXT_SECONDARY = '#6e6e6e';
const BORDER_RADIUS = 4;
const INPUT_HEIGHT = 50;
const FONT_SIZE = 14;
const DROP_DOWN_HEIGHT = 300;

const PRIMARY_COLOR = '#C73610';        // Deep orange-red
const PRIMARY_HOVER = '#A62808';        // Darker hover
const SECONDARY_COLOR = '#121212';      // Very dark gray / near black
const BACKGROUND_WHITE = '#e9ebee';     // Light background, not pure white
const TEXT_PRIMARY = '#121212';         // Strong dark text
const TEXT_SECONDARY = '#3c3c3c'; 

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
      borderRadius: BORDER_RADIUS,
      textTransform: 'none',
      fontWeight: 700,
      font: PRIMARY_COLOR,
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
      MuiDialog: {
      styleOverrides: {
        root:{
          borderRadius: BORDER_RADIUS,

        },
        paper: {
          width: 'auto',
          maxWidth: 'none',
          padding: '20px',
          backgroundColor: BACKGROUND_WHITE,
        },
      },
    },

 MuiOutlinedInput: {
  styleOverrides: {
    root: {
      backgroundColor: BACKGROUND_WHITE,
      borderRadius: BORDER_RADIUS, // already correct
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
      borderRadius: BORDER_RADIUS, // optional, if outline shape looks off
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

//  MuiButton: {
//   styleOverrides: {
//     root: {
//       borderRadius: BORDER_RADIUS, // already correct
//       padding: '10px 24px',
//       fontWeight: 600,
//       fontSize: FONT_SIZE,
//       textTransform: 'capitalize',
//     },
//     contained: {
//       backgroundColor: PRIMARY_COLOR,
//       color: '#ffffff',
//       '&:hover': {
//         backgroundColor: PRIMARY_HOVER,
//         color: '#ffffff',
//         opacity: 1,
//       },
//       '&:disabled': {
//         backgroundColor: '#e5e7eb',
//         color: '#9ca3af',
//       },
//     },
//   },
// },

  MuiPaper: {
  styleOverrides: {
    root: {
      backgroundColor: BACKGROUND_WHITE,
      borderRadius: BORDER_RADIUS, // changed from 16 to 4
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    },
  },
},

MuiMenu: {
  styleOverrides: {
    paper: {
      backgroundColor: BACKGROUND_WHITE,
      borderRadius: BORDER_RADIUS, // already correct
      padding: 8,
      minWidth: 180,
      maxHeight: DROP_DOWN_HEIGHT,
      overflowY: 'auto',
    },
  },
},

 MuiMenuItem: {
  styleOverrides: {
    root: {
      borderRadius: BORDER_RADIUS, // if using Paper-style menu items
      maxHeight: '50px',
      color: '#6b7280',
      fontSize: FONT_SIZE,
      fontWeight: 400,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 16,
      paddingRight: 16,
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    },
  },
},


MuiTableCell: {
  styleOverrides: {
    // root: {
    //   borderRadius: BORDER_RADIUS, // optional: only if needed in custom designs
    // },
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
      borderRadius: BORDER_RADIUS,
      '&.Mui-checked': {
        color: SECONDARY_COLOR,
        '&:hover': {
          backgroundColor: alpha(SECONDARY_COLOR, 0.08),
        },
      },
    },
    track: {
      borderRadius: BORDER_RADIUS,
      '.Mui-checked + &': {
        backgroundColor: SECONDARY_COLOR,
      },
    },
  },
},
 MuiFormControl: {
    styleOverrides: {
      root: {
        borderRadius: BORDER_RADIUS,
        minWidth: 220,
        '& label': {
          marginBottom: 4,
          fontSize: FONT_SIZE,
          fontWeight: 600,
          color: TEXT_PRIMARY,
        },
      },
    },
  },
   MuiSelect: {
    styleOverrides: {
      root: {
        borderRadius: BORDER_RADIUS + 13, // To match your `17px`
        height: 50,
        backgroundColor: BACKGROUND_WHITE,
      },
      outlined: {
        borderColor: '#011e41',
        '&:hover': {
          borderColor: '#011e41',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#011e41',
        },
      },
      icon: {
        color: TEXT_PRIMARY,
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
        '&:disabled': {
          color: '#9ca3af',
          borderColor: '#e5e7eb',
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

  // MuiOutlinedInput: {
  //   styleOverrides: {
  //     notchedOutline: {
  //       borderColor: '#011e41',
  //     },
  //   },
  // },

  },
});

export default theme;

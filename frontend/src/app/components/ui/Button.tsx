import React, { useState } from 'react';
import {
    Box,
  Button,
  CircularProgress,
  Icon,
  ButtonProps as MuiButtonProps,
  SxProps,
} from '@mui/material';

type CustomButtonProps = {
  label?: string;
  disabled?: boolean;
  btnType?: 'normal' | 'transparent' | 'cancel' | 'danger' | 'new-features';
  iconName?: string;
  iconComponent?: React.ReactNode;
  imgURL?: string;
  loadingSpinner?: boolean;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  sx?: SxProps; 
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  disabled = false,
  btnType = 'normal',
  iconName,
  iconComponent,
  imgURL,
  loadingSpinner = false,
  isLoading = false,
  onClick,
  sx,
}) => {
  const [imgHoverCheck, setImgHoverCheck] = useState(false);

  const getMuiVariant = (): MuiButtonProps['variant'] => {
    switch (btnType) {
      case 'transparent':
        return 'text';
      case 'cancel':
        return 'outlined';
      case 'danger':
        return 'contained';
      case 'new-features':
        return 'contained'; 
      default:
        return 'contained';
    }
  };

  const handleMouseEnter = () => {
    if (imgURL) setImgHoverCheck(true);
  };

  const handleMouseLeave = () => {
    if (imgURL) setImgHoverCheck(false);
  };

  const getHoverImgUrl = () => {
    if (!imgURL) return '';
    const parts = imgURL.split('/');
    return `/public/images/hover_${parts[parts.length - 1]}`;
  };

  const customSx: SxProps = {
    ...(btnType === 'danger' && {
      backgroundColor: '#d32f2f',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#b71c1c',
      },
    }),
    ...(btnType === 'new-features' && {
      backgroundColor: '#4527a0',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#311b92',
      },
    }),
    ...sx,
  };

  return (
    <Button
      variant={getMuiVariant()}
      disableElevation
      disableRipple
      disabled={disabled || loadingSpinner || isLoading}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={customSx}
    >
      {loadingSpinner || isLoading ? (
        <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
      ) : iconComponent ? (
        <Box component="span" mr={1}>
          {iconComponent}
        </Box>
      ) : iconName ? (
        <Icon sx={{ mr: 1 }}>{iconName}</Icon>
      ) : imgURL && !disabled ? (
        <Box component="span" mr={1}>
          <img
            src={imgHoverCheck ? getHoverImgUrl() : imgURL}
            alt="icon"
            width="25"
            height="25"
          />
        </Box>
      ) : null}

      <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
        {label}
      </Box>
    </Button>
  );
};

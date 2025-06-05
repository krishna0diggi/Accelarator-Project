import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Divider, useTheme } from "@mui/material";
import { LogOut } from 'lucide-react';
// Your custom colors
import {
  FORM_BACKGROUND,
  TEXT_COLOR,
  PRIMARY_TEXT,
  BULK_BG,
} from "../../lib/colors"; 

const SideNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const theme = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  const isActive = (path: string) => location.pathname === path;

  const getButtonStyle = (path: string) => ({
    justifyContent: "flex-start",
    color: isActive(path) ? PRIMARY_TEXT : TEXT_COLOR,
    backgroundColor: isActive(path) ? BULK_BG : "transparent",
    fontWeight: isActive(path) ? "bold" : "normal",
    textTransform: "none",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: BULK_BG,
      color: PRIMARY_TEXT,
    },
  });

  return (
    <Box
      component="aside"
      sx={{
        backgroundColor: FORM_BACKGROUND,
        mt: "70px",
        // borderRadius: theme.shape.borderRadius,
        height: "78vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
      }}
    >
      {/* Navigation */}
      <Box
        component="nav"
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Button onClick={() => navigate("/user")} sx={getButtonStyle("/user")}>
          User
        </Button>

        <Button
          onClick={() => navigate("/category")}
          sx={getButtonStyle("/category")}
        >
          Category
        </Button>

        <Button onClick={() => navigate("/apps")} sx={getButtonStyle("/apps")}>
          App
        </Button>
      </Box>

      {/* Logout */}
       <Box sx={{ p: 2, borderTop: '1px solid #f0f0f0' }}>
      <Button
        onClick={handleLogout}
        fullWidth
        variant="outlined"
        startIcon={<LogOut size={20} color="#5E35B1" />} // Lucide icon customized
        sx={{
          px: 6,
          py: 1.5,
        //   bgcolor: 'background.paper',
          color: '#5E35B1',
          fontWeight: 500,
        //   borderRadius: 2,
          textTransform: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            bgcolor: '#E3F2FD',
            color: '#1565C0',
          },
        }}
      >
        Sign out
      </Button>
    </Box>
    </Box>
  );
};

export default SideNav;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, useTheme } from "@mui/material";
import { LogOut } from 'lucide-react';
import {
  FORM_BACKGROUND,
  TEXT_COLOR,
  PRIMARY_TEXT,
  BULK_BG,
} from "../../lib/colors";
import { useAuth } from "../../contexts/AuthContext";

type Subcategory = {
  id: number;
  name: string;
  url: string;
  title: string;
  description: string;
};

type SideNavProps = {
  subcategories: Subcategory[];
  selectedSubcategoryId: number | "";
  setSelectedSubcategoryId: (id: number | "") => void;
};

const SideNav = ({
  subcategories,
  selectedSubcategoryId,
  setSelectedSubcategoryId,
}: SideNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
    const { logout } = useAuth();

  const isActive = (id: number) => selectedSubcategoryId === id;

  const getButtonStyle = (active: boolean) => ({
    justifyContent: "flex-start",
    color: active ? PRIMARY_TEXT : TEXT_COLOR,
    backgroundColor: active ? BULK_BG : "transparent",
    fontWeight: active ? "bold" : "normal",
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
        {subcategories.length === 0 ? (
          <Button disabled sx={{ justifyContent: "flex-start" }}>
            No subcategories
          </Button>
        ) : (
          subcategories.map(subcat => (
            <Button
              key={subcat.id}
              onClick={() => setSelectedSubcategoryId(subcat.id)}
              sx={getButtonStyle(isActive(subcat.id))}
            >
              {subcat.name}
            </Button>
          ))
        )}
      </Box>

      {/* Logout */}
      <Box sx={{ p: 2, borderTop: '1px solid #f0f0f0' }}>
        <Button
          onClick={logout}
          fullWidth
          variant="outlined"
          startIcon={<LogOut size={20} color="#5E35B1" />}
          sx={{
            px: 6,
            py: 1.5,
            color: '#5E35B1',
            fontWeight: 500,
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

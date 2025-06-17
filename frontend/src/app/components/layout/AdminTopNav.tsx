// TopNav.tsx
import React, { useState } from "react";
import { useTheme, Avatar, Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Popover, Typography } from "@mui/material";
import ProfileLayout from "./ProfileLayout";
import { User } from "lucide-react";
import {
  BACK_GROUND_COLOR,
  FORM_BACKGROUND,
  TEXT_COLOR,
} from "../../lib/colors";
import { Category } from "../../models/dataCruize";

// type TopNavProps = {
//   layoutData: Category[];
//   selectedCategoryId: number | "";
//   setSelectedCategoryId: (id: number | "") => void;
//   selectedSubcategoryId: number | "";
//   setSelectedSubcategoryId: (id: number | "") => void;
// };

export default function AdminTopNav() {
  const theme = useTheme();
  const [profileElement, setProfileElements] = React.useState<HTMLDivElement | null>(null);

  // Find the selected category object
  // const selectedCategory = layoutData.find(cat => cat.id === selectedCategoryId);

  const handleProfileClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setProfileElements(event.currentTarget as HTMLDivElement | null);
  }
  const handleClose = () => {
    setProfileElements(null)
  }
  const open = Boolean(profileElement)
  const id = open ? 'Profile' : undefined;

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        px: 3,
        backgroundColor: FORM_BACKGROUND,
        color: TEXT_COLOR,
        boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
        zIndex: theme.zIndex.appBar,
      }}
    >
      {/* Category Select */}
      <Box sx={{ minWidth: 180, mr: 2 }}>
       <Typography>Admin Panel</Typography>
      </Box>

      {/* Right Side Avatar */}
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          sx={{
            bgcolor: BACK_GROUND_COLOR,
            width: 40,
            height: 40,
            border: `1px solid #ccc`,
            color: TEXT_COLOR,
            cursor: "pointer"
          }}
          onClick={handleProfileClick}
          aria-describedby={id}
        >
          <User size={20} />
        </Avatar>
        <Popover
          id={id}
          open={open}
          anchorEl={profileElement}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p:2 }}>
            <ProfileLayout />
          </Box>
        </Popover>
      </Box>
    </Box>
  );
}

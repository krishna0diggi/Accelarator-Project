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
import img from '../../../assets/logo.svg'

type TopNavProps = {
  layoutData: Category[];
  selectedCategoryId: number | "";
  setSelectedCategoryId: (id: number | "") => void;
  selectedSubcategoryId: number | "";
  setSelectedSubcategoryId: (id: number | "") => void;
};

export default function TopNav({
  layoutData,
  selectedCategoryId,
  setSelectedCategoryId,
  selectedSubcategoryId,
  setSelectedSubcategoryId
}: TopNavProps) {
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
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategoryId === "" ? "" : selectedCategoryId.toString()}
            label="Category"
            onChange={e => {
              const value = e.target.value as string;
              setSelectedCategoryId(value === "" ? "" : Number(value));
              setSelectedSubcategoryId(""); // reset subcategory
            }}
          >
            {/* <MenuItem value="">
              <em>Select Category</em>
            </MenuItem> */}
            {layoutData.map(cat => (
              <MenuItem key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>

        </FormControl>
      </Box>

      <Box>
       <img src={img} alt="DataCruize Logo" style={{ width: '200px', height: 'auto', margin: '20px' }} />
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
          <Box sx={{ p: 2, minWidth: 250, minHeight: 100 }}>
            <ProfileLayout />
          </Box>
        </Popover>
      </Box>
    </Box>
  );
}

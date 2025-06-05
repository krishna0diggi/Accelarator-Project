// TopNav.tsx
import { useState } from "react";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { User } from "lucide-react";

// Custom color constants
import {
  BACK_GROUND_COLOR,
  FORM_BACKGROUND,
  TEXT_COLOR,
  PRIMARY_TEXT,
} from "../../lib/colors"; // adjust path based on your project structure

export default function TopNav() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        px: 3,
        // borderRadius: theme.shape.borderRadius,
        backgroundColor: FORM_BACKGROUND,
        color: TEXT_COLOR,
        boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
        zIndex: theme.zIndex.appBar,
      }}
    >
      {/* Project Title */}
      <Typography
        variant="h6"
        fontWeight="600"
        sx={{
          color: PRIMARY_TEXT,
        }}
      >
        Accelerator Project
      </Typography>

      {/* Right Side Avatar */}
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          sx={{
            bgcolor: BACK_GROUND_COLOR,
            width: 40,
            height: 40,
            border: `1px solid #ccc`,
            color: TEXT_COLOR,
          }}
        >
          <User size={20} />
        </Avatar>
      </Box>
    </Box>
  );
}

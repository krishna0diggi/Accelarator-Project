import { NavLink as RouterLink } from "react-router-dom"; // Use NavLink instead of Link for active state
import { useLayout } from "../../contexts/layoutContext";
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    Button,
    Box,
    ListItemButton
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { LogOut } from "lucide-react";

export const AdminSidebar = () => {
    const { logout } = useAuth()
    // const { toggleMenu } = useLayout();

    return (
        <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Admin Menu
            </Typography>
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        component={RouterLink}
                        to="/datacruize/category"
                    // sx={({ isActive }) => ({
                    //     backgroundColor: isActive ? "primary.main" : "transparent",
                    //     color: isActive ? "#fff" : "inherit",
                    //     '&:hover': {
                    //         backgroundColor: isActive ? "primary.dark" : "#f5f5f5"
                    //     }
                    // })}
                    >
                        <ListItemText primary="Category" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        component={RouterLink}
                        to="/datacruize/subcategory"
                    // sx={({ isActive }) => ({
                    //     backgroundColor: isActive ? "primary.main" : "transparent",
                    //     color: isActive ? "#fff" : "inherit",
                    //     '&:hover': {
                    //         backgroundColor: isActive ? "primary.dark" : "#f5f5f5"
                    //     }
                    // })}
                    >
                        <ListItemText primary="Subcategory" />
                    </ListItemButton>
                </ListItem>
            </List>

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

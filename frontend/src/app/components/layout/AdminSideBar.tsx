import { NavLink as RouterLink } from "react-router-dom"; // Use NavLink instead of Link for active state
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
import { FORM_BACKGROUND } from "../../lib/colors";

export const AdminSidebar = () => {
    const { logout } = useAuth()

    return (
        <Box component="aside"
            sx={{
                backgroundColor: FORM_BACKGROUND,
                mt: "70px",
                height: "78vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
            }}>
            {/* <Typography variant="h6" fontWeight="bold" gutterBottom>
                Admin Menu
            </Typography> */}
            <Box component="nav"
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}>


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
                            <ListItemText primary="Application" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>

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

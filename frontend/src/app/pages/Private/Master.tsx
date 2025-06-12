import { Box, Tab, Tabs } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const tabRoutes = [
    { label: 'Category', path: '/datacruize/category' },
    { label: 'Sub-Category', path: '/datacruize/subcategory' },
];

const Master = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentTab = tabRoutes.findIndex(
        (tab) => location.pathname === tab.path
    );
    const [value, setValue] = React.useState(currentTab === -1 ? 0 : currentTab);
    useEffect(() => {
        setValue(currentTab === -1 ? 0 : currentTab);
    }, [location.pathname, currentTab]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        navigate(tabRoutes[newValue].path);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    width: 'fit-content',
                    marginLeft: '16px',
                }}
            >
                <Tabs value={value} onChange={handleChange} aria-label="inventory tabs">
                    {tabRoutes.map((tab, index) => (
                        <Tab
                            key={tab.path}
                            label={tab.label}
                            sx={{
                                fontWeight: '600',
                                textTransform: 'none',
                                fontSize: '1rem',
                            }}
                        />
                    ))}
                </Tabs>
            </Box>
            <Box sx={{ p: 2 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Master;

import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { Box, CssBaseline, Drawer } from '@mui/material';
import AdminTopNav from './AdminTopNav';
import { AdminSidebar } from './AdminSideBar';

const drawerWidth = 300;

const AdminLayout = () => {
 const [isSidenavOpen, setIsSidenavOpen] = useState(true);
  return (
   <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#F2F4F9' }}>
      <CssBaseline />

      {/* Header (TopNav) */}
      <Box
        component="header"
        sx={{
          width: '100%',
          position: 'fixed',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          px: 2,
        }}
      >
        {/* <TopNav /> */}
        <AdminTopNav/>
      </Box>

      {/* Sidebar (SideNav) */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={isSidenavOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#F2F4F9',
            p: 2,
            pt: 0,
          },
        }}
      >
        <AdminSidebar />
      </Drawer>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8,
          px: 3,
          width: `calc(100% - ${isSidenavOpen ? drawerWidth : 0}px)`,
        //   ml: isSidenavOpen ? `${drawerWidth}px` : 0,
          transition: 'margin-left 0.3s ease-in-out',
        //   overflowY: 'auto',
          bgcolor: '#F2F4F9',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;

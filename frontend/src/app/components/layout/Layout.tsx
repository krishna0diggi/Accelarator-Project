import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import SideNav from './SideNav';
import { useEffect, useState } from 'react';
import { Box, Toolbar, Drawer, CssBaseline } from '@mui/material';
import { getCategoryWithSubcategory } from '../../service/dataCruizeApi/category';
import { Category, Subcategory } from '../../models/dataCruize';
import { useAuth } from '../../contexts/AuthContext';
const drawerWidth = 300;

const Layout = () => {
  const [isSidenavOpen, setIsSidenavOpen] = useState(true);
  const [age, setAge] = useState(''); // <--- lifted state
  const [isAdmin, setIsAdmin] = useState(false)
  const [layoutData, setLayoutData] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | "">("");
  const selectedCategory = layoutData.find(cat => cat.id === selectedCategoryId);
  const selectedSubcategories = selectedCategory ? selectedCategory.subcategories : [];

  const {user} = useAuth()

  

  useEffect(() => {
    fetchLayout()
  }, [])
  const fetchLayout = async () => {
    const response = await getCategoryWithSubcategory();
    setLayoutData(response);

    if (response.length > 0) {
      setSelectedCategoryId(response[0].id);
      // Optionally set first subcategory as selected
      if (response[0].subcategories && response[0].subcategories.length > 0) {
        setSelectedSubcategoryId(response[0].subcategories[0].id);
      } else {
        setSelectedSubcategoryId("");
      }
    }
  };
   const selectedCategoryForSubcat = layoutData.find(cat => cat.id === selectedCategoryId);
  const selectedSubcategory: Subcategory | null =
    selectedCategoryForSubcat?.subcategories.find(sub => sub.id === selectedSubcategoryId) || null;

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
        <TopNav
          layoutData={layoutData}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          selectedSubcategoryId={selectedSubcategoryId}
          setSelectedSubcategoryId={setSelectedSubcategoryId}
        />
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
        {/* <SideNav selectedAge={age} /> */}
        <SideNav
          subcategories={selectedSubcategories}
          selectedSubcategoryId={selectedSubcategoryId}
          setSelectedSubcategoryId={setSelectedSubcategoryId}
        />
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
          <Outlet context={{ selectedSubcategory }} />
      </Box>
    </Box>
  );
};

export default Layout;

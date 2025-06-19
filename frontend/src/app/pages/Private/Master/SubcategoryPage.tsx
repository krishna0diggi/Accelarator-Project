import { Box, CircularProgress, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/ui/Table';
import DeleteDialog from '../../../components/ui/Delete';
import AddSubcategory from './AddSubcategory';
import { CustomButton } from '../../../components/ui/Button';
import { CirclePlus } from 'lucide-react';
import { createSubcategory, deleteSubcategory, getAllSubcategory, updateSubcategory } from '../../../service/dataCruizeApi/subcategory';
import { toast } from 'react-toastify';
import { getAllActiveCategory, getAllCategory } from '../../../service/dataCruizeApi/category';
import { subcategoryColumn } from '../../../utils/utils';

const SubcategoryPage = () => {
  const [subcategory, setSubcategories] = useState<any[]>([]);
  const [paginator, setPaginator] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [searchValue, setSearchValue] = useState("");


  const [categoryDataDropdown, setCategoryDataDropdown] = useState<any[]>([]);

  useEffect(() => {
    fetchSubcategories();
  }, [pageIndex, pageSize, searchValue]);

  const fetchSubcategories = async () => {
    setIsLoading(true);
    try {
      const data = await getAllSubcategory(pageIndex, pageSize, searchValue);
      // console.log(data);
      setSubcategories(data.result || []);
      setPaginator(data.paginatorValue || null);
    } catch (error: any) {
      toast.error(error.message || 'Failesd to fetch categories');
    } finally {
      setIsLoading(false);
    }
    const activeCategories = await getAllActiveCategory();
    setCategoryDataDropdown(activeCategories);
  };
  const tableData = subcategory.map((item) => ({
    ...item,
    categoryName: item.categoryName,
  }));
  const category = categoryDataDropdown.map((item: any) => ({
    id: item.id,
    name: item.categoryName
  }))
  const formFields = [
    { label: 'Category', id: 'category', placeholder: 'Select Category', type: 'select', options: category },
    { label: 'Name', id: 'name', placeholder: 'Enter Name', },
    { label: 'URL', id: 'url', placeholder: 'Enter URL', },
    { label: 'Title', id: 'title', placeholder: 'Enter Title', },
    { label: 'Description', id: 'description', placeholder: 'Enter Description', },
    // { label: 'Order', id: 'order', placeholder: 'Enter Order', type: 'number' },
  ];
  const handleClickOpen = () => {
    setIsEditMode(false);
    setSelectedItemId(null);
    setFormData({});
    setOpen(true);
  };

  const handleSubmit = async () => {
    setOpen(false);
    const payload = {
      id: 0,
      name: formData.name,
      // categoryId: formData.category.id,
      url: formData.url,
      title: formData.title,
      description: formData.description,
      order: formData.order,
      status: formData.status,
      categoryId: formData.categoryId?.id ?? 0
    };
    try {
      if (isEditMode && selectedItemId) {
        await updateSubcategory(selectedItemId, payload);
        toast.success('Updated Successfully');
      } else {
        await createSubcategory(payload);
        toast.success(`${payload.name} Created`);
      }
      fetchSubcategories();
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong!');
    }
    setFormData({});
    setSelectedItemId(null);
    setIsEditMode(false);
  };

  const handleEdit = (row: any) => {
    // console.log("Data from categoryDropdownm", categoryDataDropdown);

    const selectedCategory = categoryDataDropdown.find(
      (cat) => cat.id === row.categoryId
    );
    // console.log("Selected Category", selectedCategory);

    setIsEditMode(true);
    setSelectedItemId(row.id);
    setFormData({
      id: row.id,
      category: selectedCategory || null,
      order: row.order,
      name: row.name,
      title: row.title,
      url: row.url,
      description: row.description

    });
    setOpen(true);
  };

  const handleDeleteConfirm = async (action: 'confirm' | 'cancel') => {
    setOpenDeleteDialog(false);
    if (action === 'confirm' && deleteItem) {
      try {
        await deleteSubcategory(deleteItem.id);
        toast.success(`${deleteItem.name} deleted successfully`);
        fetchSubcategories();
      } catch (error: any) {
        toast.error(error.message || 'Delete failed');
      }
      setDeleteItem(null);
    }
  };


  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [fieldId]: value }));
  };


  const handleDelete = (row: any) => {
    setDeleteItem(row);
    setOpenDeleteDialog(true);
  };


  // Toggle Change
  const handleToggleStatus = async (row: any, checked: boolean) => {
    setSubcategories((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, status: checked } : item
      )
    );
    // Prepare payload for backend
    const payload = {
      name: row.name,
      order: row.order,
      status: checked,
      categoryId: row.category?.id ?? row.categoryId ?? 0,
      url: row.url,
      title: row.title,
      description: row.description,
    };

    try {
      if (row.id) {
        await updateSubcategory(row.id, payload);
        toast.success(`Status Sucessfully Updated for ${row.name}`)
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong!');
      setSubcategories((prev) =>
        prev.map((item) =>
          item.id === row.id ? { ...item, status: !checked } : item
        )
      );
    }
  };

  return (
    <Stack direction="column" spacing={3} pt={3}>
      {/* Delete Confirmation Dialog */}
      <Box>
        <CustomButton
          iconComponent={<CirclePlus size={20} />}
          label="Add"
          btnType="normal"
          onClick={handleClickOpen}
        />
        {/* You can insert a SearchInput component here if needed */}
      </Box>
      <AddSubcategory
        open={open}
        isEditMode={isEditMode}
        formFields={formFields}
        formData={formData}
        onClose={() => setOpen(false)}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <DeleteDialog
        open={openDeleteDialog}
        title={deleteItem?.name || ''}
        onClose={handleDeleteConfirm}
      />


      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          {/* If CustomLoader is MUI-based, fine. Otherwise use MUI CircularProgress */}
          <CircularProgress />
        </Box>
      ) : (
        <DataTable
          columns={subcategoryColumn}
          rows={tableData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalCount={paginator?.totalData ?? 0}
          onPageSizeChange={({ pageIndex, pageSize }) => {
            setPageIndex(pageIndex);
            setPageSize(pageSize);
          }}
          onDecrement={setPageIndex}
          onIncrement={setPageIndex}
          onOverIncrement={setPageIndex}
          onOverDecrement={() => setPageIndex(0)}
          from={paginator?.from ?? 0}
          to={paginator?.to ?? 0}
        />
      )}
    </Stack>
  )
}

export default SubcategoryPage
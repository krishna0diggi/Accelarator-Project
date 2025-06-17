import { useEffect, useState } from 'react';
import { CustomButton } from '../../../components/ui/Button';
import { CirclePlus } from 'lucide-react';
// import SearchInput from '../../../components/ui/Search';
import DeleteDialog from '../../../components/ui/Delete';
import DataTable from '../../../components/ui/Table';
import { subcategoryColumns } from '../../../utils/utils';
// import SubCategoryDialog from './SubCategoryDialog';
import AddCategory from './AddCategory';
import { toast } from 'react-toastify';
// import {
//   createSubCategory,
//   deleteSubCategory,
//   getAllSubcategory,
//   updateSubCategory,
// } from '../../../service/subCategory';
import { createCategory, deleteCategory, getAllCategory, updateCategory } from '../../../service/dataCruizeApi/category';
import { CustomLoader } from '../../../components/ui/loading';
import { Box, CircularProgress, Stack } from '@mui/material';

const CategoryPage = () => {
  const [categories, setcategories] = useState<any[]>([]);
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

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await getAllCategory(pageIndex, pageSize, searchValue);
      console.log(data);
      setcategories(data.result || []);
      setPaginator(data.paginatorValue || null);
    } catch (error: any) {
      toast.error(error.message || 'Failesd to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, [pageIndex, pageSize, searchValue]);

  const tableData = categories.map((item) => ({
    ...item,
    categoryName: item.category?.name,
  }));

  const handleClickOpen = () => {
    setIsEditMode(false);
    setSelectedItemId(null);
    setFormData({});
    setOpen(true);
  };

  const handleSubmit = async () => {
    setOpen(false);
    const payload = {
      name: formData.name,
      // categoryId: formData.category.id,
      order:formData.order,
      status: true
    };
    try {
      if (isEditMode && selectedItemId) {
        await updateCategory(selectedItemId, payload);
        toast.success('Updated Successfully');
      } else {
        await createCategory(payload);
        toast.success(`${payload.name} Created`);
      }
      fetchCategories();
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong!');
    }
    setFormData({});
    setSelectedItemId(null);
    setIsEditMode(false);
  };

  const handleEdit = (row: any) => {
    setIsEditMode(true);
    setSelectedItemId(row.id);
    setFormData({
      category: row.category,
      order:row.order,
      name: row.name,
    });
    setOpen(true);
  };

  const handleDelete = (row: any) => {
    setDeleteItem(row);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async (action: 'confirm' | 'cancel') => {
    setOpenDeleteDialog(false);
    if (action === 'confirm' && deleteItem) {
      try {
        await deleteCategory(deleteItem.id);
        toast.success(`${deleteItem.name} deleted successfully`);
        fetchCategories();
      } catch (error: any) {
        toast.error(error.message || 'Delete failed');
      }
      setDeleteItem(null);
    }
  };

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [fieldId]: value }));
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setPageIndex(0);
  };

  // Toggle Change
  const handleToggleStatus = async (row: any, checked: boolean) => {
    setcategories((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, status: checked } : item
      )
    );
    // Prepare payload for backend
    const payload = {
      name: row.name,
      order:row.order,
      status: checked,
    };

    try {
      if (row.id) {
        await updateCategory(row.id, payload);
        toast.success(`Status Sucessfully Updated for ${row.name}`)
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong!');
      setcategories((prev) =>
        prev.map((item) =>
          item.id === row.id ? { ...item, status: !checked } : item
        )
      );
    }
  };
  
    const formFields = [
        { label: 'Name', id: 'name', placeholder: 'Select Name', },
        { label: 'Order', id: 'order', placeholder: 'Enter Order' , type:'number'},
    ];

  return (
    <Stack direction="column" spacing={3} pt={3}>
      {/* Top Bar */}
      <Box>
        <CustomButton
          iconComponent={<CirclePlus size={20} />}
          label="Add"
          btnType="normal"
          onClick={handleClickOpen}
        />
        {/* You can insert a SearchInput component here if needed */}
      </Box>

      {/* Add Category Modal */}
      <AddCategory
        open={open}
        isEditMode={isEditMode}
        formFields={formFields}
        formData={formData}
        onClose={() => setOpen(false)}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        open={openDeleteDialog}
        title={deleteItem?.name || ''}
        onClose={handleDeleteConfirm}
      />

      {/* Conditional Loading or Table */}
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
          columns={subcategoryColumns}
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
  );
};

export default CategoryPage;

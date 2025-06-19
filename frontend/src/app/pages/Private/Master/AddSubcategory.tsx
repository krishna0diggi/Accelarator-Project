import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react'
import { CustomButton } from '../../../components/ui/Button';
interface FormField {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
  options?: { id: number; name: string }[];
}
export interface SubCategoryDialogProps {
  open: boolean;
  isEditMode: boolean;
  formData: any;
  onClose: () => void;
  onChange: (fieldId: string, value: any) => void;
  onSubmit: () => void;
}
interface SubcategoryFormProps {
  open: boolean;
  isEditMode: boolean;
  formFields: FormField[];
  formData: any;
  onClose: () => void;
  onChange: (fieldId: string, value: any) => void;
  onSubmit: () => void;
}
const AddSubcategory = ({
  open,
  isEditMode,
  formFields,
  formData,
  onClose,
  onChange,
  onSubmit,
}: SubcategoryFormProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle className='text-deepPurple' sx={{ fontWeight: 700 }}>{isEditMode ? 'Update Subcategory' : 'Add Subcategory'}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'row', alignItems: 'center' }}>
          {formFields.map((field) => (
            <div key={field.id} style={{ marginBottom: '1rem' }}>
              <p>{field.label}</p>
              <TextField
                id={field.id}
                variant="outlined"
                placeholder={field.placeholder || ''}
                type={field.type === 'number' ? 'number' : 'text'} // ✅ Allow number input
                value={formData[field.id] || ''}
                onChange={(e) => onChange(field.id, field.type === 'number' ? Number(e.target.value) : e.target.value)}
              />
            </div>
          ))}

        </Box>
      </DialogContent>
      <DialogActions>
        <CustomButton
          label="Cancel"
          btnType="cancel"
          onClick={onClose} />
        <CustomButton
          label={isEditMode ? 'Update' : 'Create'}
          btnType="normal"
          onClick={onSubmit} />
      </DialogActions>


    </Dialog>
  )
}

export default AddSubcategory
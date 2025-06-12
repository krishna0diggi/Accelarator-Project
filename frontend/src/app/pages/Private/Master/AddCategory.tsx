import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'
import { CustomButton } from '../../../components/ui/Button';

export interface SubCategoryDialogProps {
    open: boolean;
    isEditMode: boolean;
    formData: any;
    onClose: () => void;
    onChange: (fieldId: string, value: any) => void;
    onSubmit: () => void;
}
interface FormField {
    open: boolean;
    isEditMode: boolean;
    // formFields: FormField[];
    formData: any;
    onClose: () => void;
    onChange: (fieldId: string, value: any) => void;
    onSubmit: () => void;
}
const AddCategory = ({
     open,
    isEditMode,
    onClose,
    onSubmit,
}: SubCategoryDialogProps) => {
    return (
        <Dialog
        open={open}
        onClose={onClose}
    // sx={{
    //     '& .MuiDialog-paper': {
    //         width: '44%',
    //         maxWidth: 'none',
    //         padding: '20px',
    //         borderRadius: '20px',
    //         backgroundColor: `${FORM_BACKGROUND}`
    //     },
    // }}
    >
        <DialogTitle className="text-deepPurple" sx={{ fontWeight: 700 }}>{isEditMode ? 'Update Brand' : 'Add Brand'}</DialogTitle>
        <hr className="bg-stone-600" />
        <DialogContent sx={{ padding: '7px 21px' }}>
            {/* <div className="grid lg:grid-cols-2 md:grid-cols-1  text-sm pt-3 text-textColor font-semibold leading-8 gap-2">
                {formFields.map((field) => (
                    <div key={field.id}>
                        <p>{field.label}</p>
                        {field.type === 'select' ? (
                            <TextField
                                select
                                id={field.id}
                                variant="outlined"
                                value={formData[field.id]?.id || ''}
                                onChange={(e) => {
                                    const selected = field.options?.find((opt: any) => opt.id === e.target.value);
                                    onChange(field.id, selected);
                                }}
                                SelectProps={{ displayEmpty: true }}
                                sx={{
                                    '& .MuiSelect-icon': {
                                        width: '2rem',
                                    },
                                    ...formStyle
                                }}
                            >
                                <MenuItem value="" disabled>{field.placeholder}</MenuItem>
                                {field.options?.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ) : (
                            <TextField
                                id={field.id}
                                variant="outlined"
                                placeholder={field.placeholder || ''}
                                value={formData[field.id] || ''}
                                onChange={(e) => onChange(field.id, e.target.value)}
                                sx={formStyle} />
                        )}
                    </div>
                ))}
            </div> */}
            Dialog content for the category
        </DialogContent>
        <DialogActions sx={{ padding: '30px', gap: '15px' }}>
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

export default AddCategory
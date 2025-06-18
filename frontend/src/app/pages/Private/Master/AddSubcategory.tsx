import React from 'react'
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
interface CategoryFormProps {
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
}: CategoryFormProps) => {
  return (
    <div>AddSubcategory</div>
  )
}

export default AddSubcategory
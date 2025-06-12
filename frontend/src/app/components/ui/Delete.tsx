import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { CustomButton } from '../ui/Button'; // adjust the path based on your project structure

interface DeleteDialogProps {
  open: boolean;
  title: string;
  onClose: (action: 'confirm' | 'cancel') => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, title, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={() => onClose('cancel')}
      // PaperProps={{
      //   sx: {
      //     borderRadius: '15px',
      //     backgroundColor: '#fafafa',
      //   },
      // }}
    >
      <DialogContent sx={{ padding: '2rem' }}>
        <Typography align="center" fontSize={16}>
          Are you sure you want to delete this record <strong>{title}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions sx={{ padding: '1rem 2rem' }}>
        <CustomButton
          label="Cancel"
          btnType="cancel"
          onClick={() => onClose('cancel')}
        />
        <CustomButton
          label="Delete"
          btnType="danger"
          onClick={() => onClose('confirm')}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;

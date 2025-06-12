import React from 'react';
import {
  Select,
  MenuItem,
  Typography,
  IconButton,
  Box,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react'; // ✅ Lucide icons

interface PaginatorProps {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  from: number;
  to: number;
  customizedPagiantor?: boolean;
  isBlock?: boolean;

  onPageSizeChange: (event: { pageIndex: number; pageSize: number }) => void;
  onDecrement: (newIndex: number) => void;
  onIncrement: (newIndex: number) => void;
  onOverIncrement: (lastPage: number) => void;
  onOverDecrement: () => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  pageIndex,
  pageSize,
  totalCount,
  from,
  to,
  customizedPagiantor = false,
  isBlock = false,
  onPageSizeChange,
  onDecrement,
  onIncrement,
  onOverIncrement,
  onOverDecrement,
}) => {
  const pageSizes = [5, 10, 20];
  const lastPageIndex = Math.max(0, Math.ceil(totalCount / pageSize) - 1);

  const handlePageSizeChange = (
    event: React.ChangeEvent<{ value: unknown }> | React.ChangeEvent<HTMLInputElement> | any
  ) => {
    const newSize = Number(event.target.value);
    onPageSizeChange?.({ pageIndex: 0, pageSize: newSize });
  };

  const handleDecrement = () => {
    if (pageIndex > 0) onDecrement?.(pageIndex - 1);
  };

  const handleIncrement = () => {
    if (pageIndex < lastPageIndex) onIncrement?.(pageIndex + 1);
  };

  if (customizedPagiantor) return null;

  return (
    <Box
      display="flex"
      justifyContent="end"
      alignItems="center"
      height={60}
      px={3}
      py={1}
      sx={{
        backgroundColor: isBlock ? 'purple.200' : 'grey.100',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      }}
    >
      {/* Page size selector */}
      <FormControl variant="outlined" size="small">
        <InputLabel id="page-size-label">Rows</InputLabel>
        <Select
          labelId="page-size-label"
          value={pageSize}
          onChange={handlePageSizeChange}
          label="Rows"
        >
          {pageSizes.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Page range info */}
      <Typography variant="body1" color="textSecondary">
        {from} - {to} of {totalCount}
      </Typography>

      {/* Navigation buttons with Lucide Icons */}
      <Box display="flex" gap={1} alignItems="center">
        <IconButton onClick={onOverDecrement} disabled={pageIndex === 0}>
          <ChevronsLeft size={20} />
        </IconButton>
        <IconButton onClick={handleDecrement} disabled={pageIndex === 0}>
          <ChevronLeft size={20} />
        </IconButton>
        <IconButton onClick={handleIncrement} disabled={pageIndex >= lastPageIndex}>
          <ChevronRight size={20} />
        </IconButton>
        <IconButton onClick={() => onOverIncrement(lastPageIndex)} disabled={pageIndex >= lastPageIndex}>
          <ChevronsRight size={20} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Paginator;

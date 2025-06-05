import React, { JSX, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Chip,
  IconButton,
  TableSortLabel,
  Typography,
  MenuItem,
  Menu,
} from '@mui/material';
// import Paginator from './Paginater';
import Paginator from './Paginator';
import Switch from '@mui/material/Switch';
// import { DataTableProps } from '../../types/models';
import { DataTableProps } from '../../models/types';
import { Info, Laptop, Mouse, Tablet, Monitor, Keyboard, PrinterCheck, History, Ellipsis, SquarePen, Trash2, User, Eye, RefreshCcw } from 'lucide-react';

// Map for status display
export const AssetStatusDisplayMap = {
  assigned: 'Assigned',
  repair: 'Under-Repair',
  not_assigned: 'Un-Assigned',
  new: 'New',
  expired: 'Expired',
};

// Status color mapping, you can later move these to the theme if you want
const getStatusColor = (status: string) => {
  const colors: Record<string, { color: string; bg: string }> = {
    Expired: { color: '#D32F2F', bg: '#FFEBEE' }, // Red
    'Not-Assigned': { color: '#d6a017de', bg: '#FFF9C4' }, // Yellow
    Repair: { color: '#FB8C00', bg: '#FFF3E0' }, // Orange
    Assigned: { color: '#43A047', bg: '#E8F5E9' }, // Green
    New: { color: '#32325D', bg: '#c5cae9' }, // Blue
  };
  return colors[status] || { color: '#757575', bg: '#EEEEEE' };
};

const SubcategoryIconMap: Record<string, JSX.Element> = {
  Laptop: <Laptop fontSize="small" />,
  Monitor: <Monitor fontSize="small" />,
  Keyboard: <Keyboard fontSize="small" />,
  Mouse: <Mouse fontSize="small" />,
  Printer: <PrinterCheck fontSize="small" />,
};

const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  onEdit,
  onAssignedAsset,
  onDelete,
  onInfo,
  onHistory,
  onChangeStatus,
  onToggleStatus,
  onRowSelect,
  onRowClick,
  withCheckbox = false,
  isBlock = false,
  customizedPaginator = false,
  pageIndex = 0, // 0-based
  pageSize = 5,
  totalCount,
  onPageSizeChange,
  onDecrement,
  onIncrement,
  onOverIncrement,
  onOverDecrement,
  from = 1,
  to = 5,
}) => {
  const [selected, setSelected] = useState<any[]>([]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.checked ? rows : []);
  };

  const handleSelectRow = (row: any) => {
    const updated = selected.includes(row)
      ? selected.filter((item) => item !== row)
      : [...selected, row];
    setSelected(updated);
  };

  const isRowSelected = (row: any) => selected.includes(row);

  // Sorting
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('');

  const handleSort = (field: string) => {
    const isAsc = orderBy === field && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const sortedRows = React.useMemo(() => {
    if (!orderBy) return rows;
    return [...rows].sort((a, b) => {
      const valA = a[orderBy];
      const valB = b[orderBy];
      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rows, order, orderBy]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  
  const open = Boolean(anchorEl);


  return (
    <Paper className="shadow" sx={{ borderRadius: '15px' }}>
      <TableContainer
        sx={{
          maxHeight: '50vh',
          overflowY: 'auto',
          overflowX: 'auto',
          width: '100%',
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px',
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {withCheckbox && (
                <TableCell
                  padding="checkbox"
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.primary.contrastText,
                  }}
                >
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align ?? 'left'}
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.primary.contrastText,
                    fontWeight: 600,
                  }}
                >
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={orderBy === col.id ? order : 'asc'}
                    onClick={() => handleSort(col.id)}
                    sx={{
                      color: 'inherit',
                      '&:hover': { color: 'inherit' },
                      '&:focus': { color: 'inherit' },
                      '&.Mui-active': { color: 'inherit' },
                    }}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}

              {(onInfo ||
                onEdit ||
                onDelete ||
                onAssignedAsset ||
                onHistory ||
                onChangeStatus) && (
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.primary.contrastText,
                    fontWeight: 600,
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedRows.map((row, idx) => (
              <TableRow
                key={idx}
                hover
                onClick={() => onRowClick?.(row)}
                style={{ cursor: 'pointer', height: '73px' }}
              >
                {withCheckbox && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isRowSelected(row)}
                      onChange={() => handleSelectRow(row)}
                    />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.id} align={col.align ?? 'left'}>
                    {col.id === 'status' ? (
                      <Chip
                        label={String(row.status)}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(row.status).bg,
                          color: getStatusColor(row.status).color,
                          fontWeight: 500,
                        }}
                      />
                    ) : col.id === 'qrCode' &&
                      typeof row.qrCode === 'string' &&
                      row.qrCode ? (
                      <img
                        src={`data:image/png;base64,${row.qrCode}`}
                        alt="QR Code"
                        style={{ width: 30, height: 30, objectFit: 'contain' }}
                      />
                    ) : col.id === 'condition' ? (
                      <Chip
                        label={
                          AssetStatusDisplayMap[
                            row.condition as keyof typeof AssetStatusDisplayMap
                          ] || row.condition
                        }
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(row.condition).bg,
                          color: getStatusColor(row.condition).color,
                          fontWeight: 500,
                        }}
                      />
                    ) : col.id === 'toggleStatus' ? (
                      <Switch
                        checked={!!row.status}
                        onChange={(e) =>
                          onToggleStatus?.(row, e.target.checked)
                        }
                      />
                    ) : col.id === 'nameEmail' ? (
                      <div className="flex flex-col">
                        <Typography variant="body2" fontWeight={500}>
                          {row.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {row.email}
                        </Typography>
                      </div>
                    ) : col.id === 'assetName' ? (
                      <div className="flex  gap-1">
                        {SubcategoryIconMap[row.subcategoryName] || (
                          <Tablet fontSize="small" />
                        )}
                        <div className="flex flex-col">
                          <Typography variant="body2" fontWeight={500}>
                            {row.assetName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {row.serialNumber}
                          </Typography>
                        </div>
                      </div>
                    ) : (
                      row[col.id] ?? '-'
                    )}
                  </TableCell>
                ))}

                {(onInfo ||
                  onEdit ||
                  onDelete ||
                  onAssignedAsset ||
                  onHistory ||
                  onChangeStatus) && (
                  <TableCell
                    align="center"
                    sx={{
                      justifyContent: 'center',
                      height: '73px',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, row)}
                      size="small"
                      aria-controls={open ? 'action-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <Ellipsis />
                    </IconButton>
                    <Menu
                      id="action-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      PaperProps={{
                        sx: {
                          boxShadow: 'none !important',
                          transition: 'none !important',
                          border: '1px solid #E8E8E8',
                          width: '185px',
                          padding: '4px'
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {onInfo && (
                        <MenuItem onClick={() => { handleClose(); onInfo(selectedRow); }}>
                          <Eye fontSize="small" style={{ marginRight: 8 }} /> View Details
                        </MenuItem>
                      )}
                      {onEdit && (
                        <MenuItem onClick={() => { handleClose(); onEdit(selectedRow); }}>
                          <SquarePen fontSize="small" style={{ marginRight: 8, color: 'blue' }} /> Edit
                        </MenuItem>
                      )}
                       {onChangeStatus && (
                        <MenuItem onClick={() => onChangeStatus(selectedRow)}>
                          <RefreshCcw fontSize="small" style={{ marginRight: 8, color: 'blue' }} /> Change Status
                        </MenuItem>
                      )}
                       {onHistory && (
                        <MenuItem onClick={() => { handleClose(); onHistory(selectedRow); }}>
                          <History fontSize="small" style={{ marginRight: 8 }} /> Asset History
                        </MenuItem>
                      )}
                      {onAssignedAsset && (row.status === 'not_assigned' || row.status === 'new') && (
                        <MenuItem onClick={() => { handleClose(); onAssignedAsset(selectedRow); }}>
                          <User fontSize="small" style={{ marginRight: 8, color: '#43A047' }} /> Assign 
                        </MenuItem>
                      )}
                      {/* {onAssignedAsset &&
                        (row.status === 'not_assigned' ||
                          row.status === 'new') && (
                          <MenuItem
                            onClick={() => {
                              handleClose();
                              onAssignedAsset(row);
                            }}
                          >
                            <User
                              fontSize="small"
                              style={{ marginRight: 8, color: '#43A047' }}
                            />{' '}
                            Assign
                          </MenuItem>
                        )} */}
                      <hr className="bg-stone-600" />
                      {onDelete && (
                        <MenuItem onClick={() => { handleClose(); onDelete(selectedRow); }} sx={{ color: 'red'}}>
                          <Trash2 fontSize="small" style={{ marginRight: 8 }} /> Delete
                        </MenuItem>
                      )}
                    </Menu>
                  </TableCell>
                )}
              </TableRow>
            ))}

            {sortedRows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (withCheckbox ? 2 : 1) + 1}
                  align="center"
                >
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Paginator
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalCount={totalCount ?? rows.length}
        onPageSizeChange={onPageSizeChange ?? (() => {})}
        onDecrement={onDecrement ?? (() => {})}
        onIncrement={onIncrement ?? (() => {})}
        onOverIncrement={onOverIncrement ?? (() => {})}
        onOverDecrement={onOverDecrement ?? (() => {})}
        from={from}
        to={to}
      />
    </Paper>
  );
};

export default DataTable;

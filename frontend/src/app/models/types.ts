export interface Column {
  id: string;
  label: string;
  align?: 'left' | 'right' | 'center';
}
export interface DataTableProps {
  columns: Column[];
  rows: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onInfo?:(row:any) => void;
  onHistory?:(row:any) => void;
  onChangeStatus?:(row:any) => void;
  onRowClick?: (row: any) => void;
  onAssignedAsset?: (row: any) => void;
  onRowSelect?: (selectedRows: any[]) => void;
  withCheckbox?: boolean;
  isBlock?: boolean;
  customizedPaginator?: boolean;
  pageIndex?: number;
  pageSize?: number;
  totalCount?: number;
  onPageSizeChange?: (data: { pageIndex: number; pageSize: number }) => void;
  onDecrement?: (pageIndex: number) => void;
  onIncrement?: (pageIndex: number) => void;
  onOverIncrement?: (pageIndex: number) => void;
  onOverDecrement?: () => void;
  from?: number;
  to?: number;
  onToggleStatus?: (row: any, checked: boolean) => void;
}
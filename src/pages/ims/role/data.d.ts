export interface RoleListItem {
  id: number;
  name: string;
  code: string;
  description?: string;
  createTime?: Date;
}

// export interface TableListPagination {
//   total: number;
//   pageSize: number;
//   current: number;
// }

// export interface TableListData {
//   list: TableListItem[];
//   pagination: Partial<TableListPagination>;
// }

export interface RoleListParams {
  name?: string;
  code?: string;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

export interface UserListItem {
  id: number;
  username: string;
  avatar?: string;
  name: string;
  email: string;
  locked?: number;
  createdTime?: Date;
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

export interface UserListParams {
  locked?: number;
  name?: string;
  username?: string;
  email?: string;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

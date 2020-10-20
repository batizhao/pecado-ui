export interface DsListItem {
  id: number;
  username: string;
  url: string;
  name: string;
  password: string;
  status?: number;
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

export interface DsListParams {
  status?: number;
  name?: string;
  username?: string;
  url?: string;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

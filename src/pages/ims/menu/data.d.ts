export interface MenuTreeItem {
  id: number;
  pid: number;
  title: string;
  key: string;
  isLeaf: boolean;
  children: MenuTreeItem[]|[];
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

// export interface TableListParams {
//   locked?: number;
//   name?: string;
//   username?: string;
//   email?: string;
//   pageSize?: number;
//   current?: number;
//   filter?: { [key: string]: any[] };
//   sorter?: { [key: string]: any };
// }

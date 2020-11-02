export interface GenConfigItem {
  tableName: string;
  packageName?: string;
  author?: string;
  moduleName?: string;
  tablePrefix?: string;
  comments?: string;
  dsName: string;
}

export interface GenConfigParams {
  tableName?: number;
  dsName?: string;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

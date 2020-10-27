export interface GenConfigItem {
  tableName: string;
  packageName?: string;
  author?: string;
  moduleName?: string;
  tablePrefix?: string;
  comments?: string;
  dsName?:string;
}

// export interface TableMetaItem {
//   tableName: string;
//   tableComment?: string;
//   tableCollation?: string;
//   createTime?: string;
//   engine?: string;
// }

export interface GenConfigParams {
  tableName?: number;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
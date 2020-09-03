export interface MenuTreeItem {
  id: number;
  pid: number;
  title: string;
  key: string;
  isLeaf: boolean;
  children: MenuTreeItem[]|[];
  type?: string;
}

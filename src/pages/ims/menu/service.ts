import request from '@/utils/request';
// import { MenuTreeItem } from './data';

export async function queryMenuTree() {
  return request('/api/ims/menus');
}
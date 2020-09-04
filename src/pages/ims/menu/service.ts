import request from '@/utils/request';
import { MenuTreeItem } from './data';

export async function queryMenuTree() {
  return request('/api/ims/menus');
}

export async function queryMenu(id: number): Promise<any> {
  return request(`/api/ims/menu/${id}`);
}

export async function addOrUpdateMenu(params: MenuTreeItem) {
  return request('/api/ims/menu', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
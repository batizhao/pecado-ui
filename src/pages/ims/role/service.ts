import request from '@/utils/request';
import { RoleListParams, RoleListItem } from './data';

export async function queryRole(params?: RoleListParams) {
  return request('/api/ims/roles', {
    params,
  });
}

export async function queryRoleByUserId(userId : number): Promise<any> {
  return request(`/api/ims/role?userId=${userId}`);
}

export async function removeRole(ids: number[]) {
  return request.delete(`/api/ims/role?ids=${ids}`);
}

export async function addOrUpdateRole(params: RoleListItem) {
  return request.post('/api/ims/role', {
    data: {
      ...params,
    },
  });
}

export async function handleAddRoleMenus(id: number, menus: string[]) {
  return request.post(`/api/ims/role/menu?id=${id}&&menus=${menus}`);
}
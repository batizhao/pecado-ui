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

export async function removeRole(params: { id: number[] }) {
  return request.delete(`/api/ims/role?ids=${params.id}`);
}

export async function addOrUpdateRole(params: RoleListItem) {
  return request.post('/api/ims/role', {
    data: {
      ...params,
    },
  });
}

export async function handleAddRoleMenus(menus: string[]) {
  return request.post(`/api/ims/role/menu?menus=${menus}`);
}
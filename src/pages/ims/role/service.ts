import request from '@/utils/request';
import { TableListParams, TableListItem } from './data';

export async function queryRole(params?: TableListParams) {
  return request('/api/ims/roles', {
    params,
  });
}

export async function queryRoleByUserId(userId : number): Promise<any> {
  return request(`/api/ims/role?userId=${userId}`, {
    method: 'GET',
  });
}

export async function removeRole(params: { id: number[] }) {
  return request(`/api/ims/role?ids=${params.id}`, {
    method: 'DELETE',
  });
}

export async function addOrUpdateRole(params: TableListItem) {
  return request('/api/ims/role', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
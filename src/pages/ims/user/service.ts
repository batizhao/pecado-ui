import request from '@/utils/request';
import { TableListParams, TableListItem } from './data';

export async function query(params?: TableListParams) {
  return request('/api/ims/users', {
    params,
  });
}

export async function remove(params: { id: number[] }) {
  return request(`/api/ims/user?ids=${params.id}`, {
    method: 'DELETE',
  });
}

export async function addOrUpdate(params: TableListItem) {
  return request('/api/ims/user', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
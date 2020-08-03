import request from '@/utils/request';
import { TableListParams, TableListItem } from './data';

export async function queryUser(params?: TableListParams) {
  return request('/api/ims/user', {
    params,
  });
}

export async function removeUser(params: { id: number[] }) {
  return request('/api/ims/user', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addOrUpdateUser(params: TableListItem) {
  return request('/api/ims/user', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
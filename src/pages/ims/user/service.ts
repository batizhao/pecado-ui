import request from '@/utils/request';
import { TableListParams, TableListItem } from './data';

export async function queryUser(params?: TableListParams) {
  return request('/api/ims/users', {
    params,
  });
}

export async function removeUser(params: { id: number[] }) {
  return request(`/api/ims/user?ids=${params.id}`, {
    method: 'DELETE',
  });
}

export async function addOrUpdateUser(params: TableListItem) {
  return request('/api/ims/user', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function lockUser(params: { id: number }) {
  return request(`/api/ims/user/lock?id=${params.id}`, {
    method: 'POST',
  });
}

export async function unLockUser(params: { id: number }) {
  return request(`/api/ims/user/unlock?id=${params.id}`, {
    method: 'POST',
  });
}
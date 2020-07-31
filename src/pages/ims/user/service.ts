import request from '@/utils/request';
import { TableListParams, TableListItem } from './data';

export async function queryRule(params?: TableListParams) {
  return request('/api/ims/user', {
    params,
  });
}

export async function removeRule(params: { id: number[] }) {
  return request('/api/ims/user', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/ims/user', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/ims/user', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

import request from '@/utils/request';
import { DsListParams, DsListItem } from './data';

export async function queryDs(params?: DsListParams) {
  return request('/api/dp/dss', {
    params,
  });
}

export async function removeDs(id: number[]) {
  return request.delete(`/api/dp/ds?ids=${id}`);
}

export async function addOrUpdateDs(params: DsListItem) {
  return request.post('/api/dp/ds', {
    data: {
      ...params,
    },
  });
}

export async function lockDs(id: number) {
  return request.post(`/api/dp/ds/lock?id=${id}`);
}

export async function unLockDs(id: number ) {
  return request.post(`/api/dp/ds/unlock?id=${id}`);
}
import request from '@/utils/request';
import { GenConfigItem, GenConfigParams } from './data';

export async function queryTables(params?: GenConfigParams) {
  return request('/api/dp/codes', {
    params,
  });
}

export async function generateCode(params: GenConfigItem) {
  return request.post('/api/dp/code', {
    data: {
      ...params,
    },
  });
}
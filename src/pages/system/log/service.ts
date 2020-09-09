import request from '@/utils/request';
import { SystemLog } from './data.d';

interface ParamsType extends Partial<SystemLog> {
  current?: number;
}

export async function queryLog(params: ParamsType) {
  return request('/api/system/logs', {
    params,
  });
}

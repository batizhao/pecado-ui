import request from '@/utils/request';
import { GenConfigItem } from './data';

export async function addOrUpdateConfig(params: GenConfigItem) {
  return request.post('/api/dp/code', {
    data: {
      ...params,
    },
  });
}
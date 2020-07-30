import request from '@/utils/request';

export async function fetchCurrent(): Promise<any> {
  return request(`/api/ims/menu`, {
    method: 'GET',
  });
}
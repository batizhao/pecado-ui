import request from '@/utils/request';

export async function queryCurrent() {
  return request('/api/ims/user/me');
}

export async function queryFakeList(params: { count: number }) {
  return request('/api/fake_list', {
    params,
  });
}

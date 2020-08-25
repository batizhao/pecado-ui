import request from '@/utils/request';

export async function queryCurrent() {
  return request('/api/ims/user/me');
}

// export async function query() {
//   return request('/api/ims/users');
// }

import request from '@/utils/request';
import { UserListParams, UserListItem } from './data';

export async function queryUser(params?: UserListParams) {
  return request('/api/ims/users', {
    params,
  });
}

export async function removeUser(id: number[]) {
  return request.delete(`/api/ims/user?ids=${id}`);
}

export async function addOrUpdateUser(params: UserListItem) {
  return request.post('/api/ims/user', {
    data: {
      ...params,
    },
  });
}

export async function lockUser(id: number) {
  return request.post(`/api/ims/user/lock?id=${id}`);
}

export async function unLockUser(id: number ) {
  return request.post(`/api/ims/user/unlock?id=${id}`);
}

export async function handleAddUserRoles(id: number, roles: string[]) {
  return request.post(`/api/ims/user/role?id=${id}&&roles=${roles}`);
}

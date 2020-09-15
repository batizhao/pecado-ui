import request from '@/utils/request';
import { UserListParams, UserListItem } from './data';

export async function queryUser(params?: UserListParams) {
  return request('/api/ims/users', {
    params,
  });
}

export async function removeUser(params: { id: number[] }) {
  return request.delete(`/api/ims/user?ids=${params.id}`);
}

export async function addOrUpdateUser(params: UserListItem) {
  return request.post('/api/ims/user', {
    data: {
      ...params,
    },
  });
}

export async function lockUser(params: { id: number }) {
  return request.post(`/api/ims/user/lock?id=${params.id}`);
}

export async function unLockUser(params: { id: number }) {
  return request.post(`/api/ims/user/unlock?id=${params.id}`);
}

export async function handleAddUserRoles(roles: string[]) {
  return request.post(`/api/ims/user/role?roles=${roles}`);
}

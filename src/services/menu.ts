import request from '@/utils/request';

export async function fetchCurrent(): Promise<any> {
  return request('/api/ims/menu/me', {
    method: 'GET',
  });
}

export async function fetchByRoleId(roleId : number): Promise<any> {
  return request(`/api/ims/menu?roleId=${roleId}`, {
    method: 'GET',
  });
}
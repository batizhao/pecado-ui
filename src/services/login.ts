import request from '@/utils/request';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request(`/api/uaa/oauth/token?username=${params.username}&password=${params.password}&grant_type=password`, {
    method: 'POST',
    headers: {'Authorization': 'Basic Y2xpZW50X2FwcDoxMjM0NTY='}
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

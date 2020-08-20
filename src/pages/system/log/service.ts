import request from '@/utils/request';
import { BasicListItemDataType } from './data.d';

interface ParamsType extends Partial<BasicListItemDataType> {
  current?: number;
  // filter?: { [key: string]: any[] };
  // sorter?: { [key: string]: any };
}

export async function queryFakeList(params: ParamsType) {
  return request('/api/system/logs', {
    params,
  });
}

// export async function removeFakeList(params: ParamsType) {
//   const { size = 5, ...restParams } = params;
//   return request('/api/fake_list', {
//     method: 'POST',
//     params: {
//       size,
//     },
//     data: {
//       ...restParams,
//       method: 'delete',
//     },
//   });
// }

// export async function addFakeList(params: ParamsType) {
//   const { size = 5, ...restParams } = params;
//   return request('/api/fake_list', {
//     method: 'POST',
//     params: {
//       size,
//     },
//     data: {
//       ...restParams,
//       method: 'post',
//     },
//   });
// }

// export async function updateFakeList(params: ParamsType) {
//   const { size = 5, ...restParams } = params;
//   return request('/api/fake_list', {
//     method: 'POST',
//     params: {
//       size,
//     },
//     data: {
//       ...restParams,
//       method: 'update',
//     },
//   });
// }

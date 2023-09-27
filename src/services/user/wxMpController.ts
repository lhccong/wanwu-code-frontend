// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** check GET /api/ */
export async function checkUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** receiveMessage POST /api/ */
export async function receiveMessageUsingPOST(options?: { [key: string]: any }) {
  return request<any>('/api/', {
    method: 'POST',
    ...(options || {}),
  });
}

/** setMenu GET /api/setMenu */
export async function setMenuUsingGET(options?: { [key: string]: any }) {
  return request<string>('/api/setMenu', {
    method: 'GET',
    ...(options || {}),
  });
}

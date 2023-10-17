// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequestApi';

/** getUserInterfaceInfoById GET /api/userInterfaceInfo/get */
export async function getUserInterfaceInfoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserInterfaceInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserInterfaceInfo_>('/api/userInterfaceInfo/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserInterfaceInfo GET /api/userInterfaceInfo/list */
export async function listUserInterfaceInfoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserInterfaceInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListUserInterfaceInfo_>('/api/userInterfaceInfo/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserInterfaceInfoByPage GET /api/userInterfaceInfo/list/page */
export async function listUserInterfaceInfoByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserInterfaceInfoByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserInterfaceInfo_>('/api/userInterfaceInfo/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

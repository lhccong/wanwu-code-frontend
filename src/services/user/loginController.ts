// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** doLogin GET /api/acc/doLogin */
export async function doLoginUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.doLoginUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/acc/doLogin', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** doLogin PUT /api/acc/doLogin */
export async function doLoginUsingPUT(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.doLoginUsingPUTParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/acc/doLogin', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** doLogin POST /api/acc/doLogin */
export async function doLoginUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.doLoginUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/acc/doLogin', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** doLogin DELETE /api/acc/doLogin */
export async function doLoginUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.doLoginUsingDELETEParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/acc/doLogin', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** doLogin PATCH /api/acc/doLogin */
export async function doLoginUsingPATCH(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.doLoginUsingPATCHParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/acc/doLogin', {
    method: 'PATCH',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** isLogin GET /api/acc/isLogin */
export async function isLoginUsingGET(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/acc/isLogin', {
    method: 'GET',
    ...(options || {}),
  });
}

/** isLogin PUT /api/acc/isLogin */
export async function isLoginUsingPUT(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/acc/isLogin', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** isLogin POST /api/acc/isLogin */
export async function isLoginUsingPOST(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/acc/isLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** isLogin DELETE /api/acc/isLogin */
export async function isLoginUsingDELETE(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/acc/isLogin', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** isLogin PATCH /api/acc/isLogin */
export async function isLoginUsingPATCH(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/acc/isLogin', {
    method: 'PATCH',
    ...(options || {}),
  });
}

/** logout GET /api/acc/logout */
export async function logoutUsingGET(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/acc/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** logout PUT /api/acc/logout */
export async function logoutUsingPUT(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/acc/logout', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** logout POST /api/acc/logout */
export async function logoutUsingPOST(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/acc/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** logout DELETE /api/acc/logout */
export async function logoutUsingDELETE(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/acc/logout', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** logout PATCH /api/acc/logout */
export async function logoutUsingPATCH(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/acc/logout', {
    method: 'PATCH',
    ...(options || {}),
  });
}

/** tokenInfo GET /api/acc/tokenInfo */
export async function tokenInfoUsingGET(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/acc/tokenInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** tokenInfo PUT /api/acc/tokenInfo */
export async function tokenInfoUsingPUT(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/acc/tokenInfo', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** tokenInfo POST /api/acc/tokenInfo */
export async function tokenInfoUsingPOST(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/acc/tokenInfo', {
    method: 'POST',
    ...(options || {}),
  });
}

/** tokenInfo DELETE /api/acc/tokenInfo */
export async function tokenInfoUsingDELETE(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/acc/tokenInfo', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** tokenInfo PATCH /api/acc/tokenInfo */
export async function tokenInfoUsingPATCH(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/acc/tokenInfo', {
    method: 'PATCH',
    ...(options || {}),
  });
}

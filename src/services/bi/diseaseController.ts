// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequestBi';

/** addDisease POST /api/disease/add */
export async function addDiseaseUsingPOST(
  body: API.DiseaseAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/disease/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteDisease POST /api/disease/delete */
export async function deleteDiseaseUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/disease/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editDisease POST /api/disease/edit */
export async function editDiseaseUsingPOST(
  body: API.DiseaseEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/disease/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** genDiseaseByAi POST /api/disease/gen */
export async function genDiseaseByAiUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.genDiseaseByAiUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBiDiseaseResponse_>('/api/disease/gen', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getDiseaseById GET /api/disease/get */
export async function getDiseaseByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDiseaseByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseDisease_>('/api/disease/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listDiseaseByPage POST /api/disease/list/page */
export async function listDiseaseByPageUsingPOST(
  body: API.DiseaseQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageDisease_>('/api/disease/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyDiseaseByPage POST /api/disease/my/list/page */
export async function listMyDiseaseByPageUsingPOST(
  body: API.DiseaseQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageDisease_>('/api/disease/my/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateDisease POST /api/disease/update */
export async function updateDiseaseUsingPOST(
  body: API.DiseaseUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/disease/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

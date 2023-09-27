// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** policy GET /api/member/oss/policy */
export async function policyUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseQiNiuPolicyVo_>('/api/member/oss/policy', {
    method: 'GET',
    ...(options || {}),
  });
}

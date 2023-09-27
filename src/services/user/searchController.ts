// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** searchAll POST /api/search/all */
export async function searchAllUsingPOST(
  body: API.SearchQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseSearchVO_>('/api/search/all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

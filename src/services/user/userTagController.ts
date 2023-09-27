// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** getAllTags GET /api/member/tags */
export async function getAllTagsUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListUserTagCategoryVo_>('/api/member/tags', {
    method: 'GET',
    ...(options || {}),
  });
}

/** addTag POST /api/member/tags */
export async function addTagUsingPOST(
  body: API.UserTagAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserTagVo_>('/api/member/tags', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

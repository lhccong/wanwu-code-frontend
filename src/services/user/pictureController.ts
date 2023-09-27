// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** listPictureVOByPage POST /api/picture/list/page/vo */
export async function listPictureVOByPageUsingPOST(
  body: API.PictureQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePicture_>('/api/picture/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

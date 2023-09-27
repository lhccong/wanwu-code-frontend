// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** clearNotification POST /api/notification/clear */
export async function clearNotificationUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.clearNotificationUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/notification/clear', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getNoticeCount GET /api/notification/count */
export async function getNoticeCountUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseNotificationCountVo_>('/api/notification/count', {
    method: 'GET',
    ...(options || {}),
  });
}

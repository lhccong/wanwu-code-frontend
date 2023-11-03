// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** 发送消息 POST /api/capi/chat/msg */
export async function sendMsgUsingPOST(body: API.ChatMessageReq, options?: { [key: string]: any }) {
  return request<API.BaseResponseChatMessageResp_>('/api/capi/chat/msg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 消息标记 PUT /api/capi/chat/msg/mark */
export async function setMsgMarkUsingPUT(
  body: API.ChatMessageMarkReq,
  options?: { [key: string]: any },
) {
  return request<any>('/api/capi/chat/msg/mark', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 群成员列表 GET /api/capi/chat/public/member/page */
export async function getMemberPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMemberPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatMemberResp_>('/api/capi/chat/public/member/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 群成员人数统计 GET /api/capi/chat/public/member/statistic */
export async function getMemberStatisticUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseChatMemberStatisticResp_>(
    '/api/capi/chat/public/member/statistic',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 消息列表 GET /api/capi/chat/public/msg/page */
export async function getMsgPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMsgPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatMessageResp2>('/api/capi/chat/public/msg/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 会话私聊列表 GET /api/capi/chat/public/private/room/page */
export async function getRoomFriendVoPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoomFriendVoPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseRoomFriendVo_>('/api/capi/chat/public/private/room/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 会话列表 GET /api/capi/chat/public/room/page */
export async function getRoomPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoomPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatRoomResp_>('/api/capi/chat/public/room/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

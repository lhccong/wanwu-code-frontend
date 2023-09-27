// import {request} from "umi";
//
//
// export async function uploadAvatar(body: FormData, options?: Record<string, any>) {
//   return request<any>('https://upload-z2.qiniup.com', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     data: body,
//     ...(options || {}),
//   });
// }
import axios from 'axios';

export async function uploadAvatar(body: FormData, options?: Record<string, any>) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...options,
  };

  try {
    return await axios.post('https://upload-z2.qiniup.com', body, config);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// export async function uploadAvatar(body: FormData, options?: Record<string, any>) {
//   return request<any>('http://localhost:8102/api/member/oss/policy', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     data: body,
//     ...(options || {}),
//   });
// }

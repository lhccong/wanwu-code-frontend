import type {MenuProps} from 'antd';
import {Badge, Dropdown, message} from 'antd';
import React, {useEffect, useState} from 'react';
import {BellOutlined, InfoCircleOutlined, LikeOutlined, MailOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {history, useModel} from "umi";
import {getNoticeCountUsingGET} from "@/services/user/notificationController";


const MessageList: React.FC = () => {
  const {initialState} = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const [count, setCount] = useState<API.NotificationCountVo>()
  const [total, setTotal] = useState(0);
// 定义一个函数，用于获取数据并更新状态
  const fetchData = () => {
    getNoticeCountUsingGET().then(res => {
      setCount(res.data);
      setTotal(res.data?.likeCount as any + res.data?.commentCount  + res.data?.msgCount + res.data?.noticeCount);
    });
  };
  //获取消息信息
  useEffect(() => {
    fetchData();
    // const intervalId = setInterval(fetchData, 3000);
    //
    // // 在组件卸载时清除定时器
    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [])

  const goNotification = (type: string) => {
    if (currentUser) {
      history.push(`/notification?type=${type}`);
    } else {
      message.info('请先登录');
    }
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <>
          <a onClick={() => goNotification('like')}>收到的赞</a>
          <Badge style={{padding: '0 4px'}} count={count?.likeCount} offset={[5, -4]}/>
        </>
      ),
      icon: <LikeOutlined/>
    },
    {
      key: '2',
      label: (
        <>
          <a onClick={() => goNotification('comment')}>回复我的</a>
          <Badge style={{padding: '0 4px'}} count={count?.commentCount} offset={[5, -4]}/>
        </>
      ),
      icon: <UnorderedListOutlined/>
    },
    {
      key: '3',
      label: (
        <>
          <a onClick={() => goNotification('chat')}>我的消息</a>
          <Badge style={{padding: '0 4px'}} count={count?.msgCount} offset={[5, -4]}/>
        </>
      ),
      icon: <MailOutlined/>
    },
    {
      key: '4',
      label: (
        <>
          <a onClick={() => goNotification('notice')}>系统消息</a>
          <Badge style={{padding: '0 4px'}} count={count?.noticeCount} offset={[5, -4]}/>
        </>
      ),
      icon: <InfoCircleOutlined/>
    },
  ];

  return (
    <Dropdown placement='bottom' menu={{items}}>
      <a onClick={e => e.preventDefault()} style={{marginTop: 2}}>
        <Badge style={{padding: '0 4px'}} count={total}>
          <BellOutlined style={{fontSize: 20, color: '#FA541C'}}/>
        </Badge>
      </a>
    </Dropdown>
  );
};
export default MessageList;

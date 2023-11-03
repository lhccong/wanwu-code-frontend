import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import './styles.min.css'
import {
  Avatar,
  ChatContainer,
  Conversation,
  ConversationHeader,
  ConversationList,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  Search,
  Sidebar,
  VideoCallButton,
  VoiceCallButton
} from "@chatscope/chat-ui-kit-react";
import {useLocation, useModel,history} from "umi";
import {StringUtils} from "@/utils";
import {getMsgPageUsingGET, getRoomFriendVoPageUsingGET} from "@/services/user/liaotianshixiangguanjiekou";

const Chat: React.FC<{ref: any}> = forwardRef(({}, ref) => {
  const { initialState} = useModel('@@initialState');
  const currentUser= initialState?.currentUser;
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const targetUid = Number(urlSearchParams.get('targetUid'));
  const msgListRef = useRef(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [conversations, setConversations] = useState<API.RoomFriendVo[]>([]);
  const [msgPageNum, setMsgPageNum] = useState(1);
  const [msgTotal, setMsgTotal] = useState(0);
  const [messages, setMessages] = useState<API.ChatMessageResp[]>([]);
  const [activeConversation, setActiveConversation] = useState<API.RoomFriendVo>();
  const [messageInputValue, setMessageInputValue] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [initLoaded, setInitLoaded] = useState(false);
  const [value, setValue] = useState("");
  const [searchConversations, setSearchConversations] = useState<API.RoomFriendVo[]>([]);

  //暴露的方法
  useImperativeHandle(ref, () => ({
    clearMsg: () => {
      setConversations(conversations.map(conversation => {
        return {...conversation, unread: 0}}
      ));
    }
  }));

  //首先获取所有conversation
  useEffect(()=>{
    getRoomFriendVoPageUsingGET({pageSize: 30}).then(res => {
      if(res.code === 0) {
        const records = res.data?.list;
        //没有指定私聊对象
        if(records&&records.length > 0 && targetUid === 0){
          setConversations(records);
        }
        //指定了私聊对象
        else if(targetUid !== 0&&records){
          console.log(records);
          const filter = records.filter((record: API.RoomFriendVo) => record.fromUid === targetUid);
          //没跟这个人私聊过（新建conversation并将其置顶）
          if(filter.length === 0){
            alert("没有私聊过哇")
            // getConversationByTargetUid(targetUid).then(res => {
            //   setConversations([res.data, ...records]);
            //   setActiveConversation({...res.data});
            // })
          }
          //私聊过了
          else {
            setConversations(records);
            setActiveConversation({...filter[0]});
          }
        }
      }
    })
    const tokenValue = localStorage.getItem('tokenValue');
    const newSocket = new WebSocket('wss://qingxin.store/ws?token='+tokenValue);
    setSocket(newSocket);

    // 在组件卸载时关闭WebSocket连接
    return () => {
      newSocket.close();
    };
  }, [])

  useEffect(() => {
    if (socket && currentUser) {
      // 添加WebSocket事件处理程序
      socket.onopen = () => {
        console.log('WebSocket连接已建立');
        //发送建立连接的请求
        const connectCommand = {
          type: 4,
        };
        socket.send(JSON.stringify(connectCommand));
      };

      socket.onmessage = (event) => {
        const res: API.R = JSON.parse(event.data);
        if(res.data){
          console.log(res.data);
          const {roomId} = res.data;
          let target: API.RoomFriendVo | null = null;
          const others: API.RoomFriendVo[] = [];
          //消息来自当前打开的聊天窗口
          if(activeConversation && roomId  == activeConversation.roomId){
            setMessages([...messages, res.data])
            // alert("Active进来了")
            for (const conversation of conversations) {
            // alert("进来了")
              if(conversation.roomId == roomId){
                console.log("conversation")
                console.log(conversation)
                target = {...conversation, lastMessage: res.data.content};
              } else {

                others.push(conversation);
              }
            }
          }
          //消息来自其他聊天窗口（或者不属于任何一个聊天窗口）
          else {
            // alert("没进来")
            for (const conversation of conversations) {
              if(conversation.roomId == roomId){
                target = {...conversation, unread: conversation.unread as any + 1, lastMessage: res.data.content};
              } else {
                others.push(conversation);
              }
            }
            if(!target){
              const {avatar, content, conversationId, fromUid, fromUsername, createTime} = res.data;
              target = {
                id: conversationId,
                fromUid,
                fromUsername,
                avatar,
                unread: 1,
                lastMessage: content,
                updateTime: createTime
              }
            }
          }
          setConversations([target as API.RoomFriendVo, ...others]);
        }
      };

      socket.onclose = () => {
        console.log('WebSocket连接已关闭');
      };

      socket.onerror = (error) => {
        console.error('WebSocket发生错误:', error);
      };
    }
  }, [socket, conversations]);

  useEffect(()=>{
    //获取与用户的所有聊天消息
    if(activeConversation &&activeConversation.fromUid&& activeConversation.fromUid > 0){
      getMsgPageUsingGET({
        pageSize: 30,
        roomId: activeConversation.roomId as any
      }).then(res => {
        if(res.code === 0){
          if (res.data?.list){
            setMessages(res.data?.list);
            setMsgTotal(10);

          }
        }
      })
    }
  }, [activeConversation]);

  //监听搜索关键词变化
  useEffect(()=>{
    if(StringUtils.isNotEmpty(value)){
      const keyword = value.trim(); // 去除搜索关键词左右的空格
      const regex = new RegExp(keyword, "i"); // 创建正则表达式对象，i 表示不区分大小写


        setSearchConversations(conversations.filter(conversation =>
          regex.test(conversation.fromUsername as any))
        );
    }
  }, [value]);

  const sendMessage = (message: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const command = {
        type: 5,
        uid: message.toUid,
        data:message
      };
      socket.send(JSON.stringify(command));
    }
  };

  const changeConversation = (newConversation: API.RoomFriendVo) => {
    if(!activeConversation || newConversation.roomId !== activeConversation.roomId){
      setActiveConversation({...newConversation, unread: 0});
      setConversations(conversations.map(conversation =>
        conversation.roomId == newConversation.roomId ? {...newConversation, unread: 0} : conversation));
      setInitLoaded(false);
      setMsgPageNum(1);
      if (socket && socket.readyState === WebSocket.OPEN) {
        //TODO 切换会话
        // const command = {
        //   code: 10003,
        //   uid: currentUser?.uid,
        //   conversationId: newConversation.id
        // };
        // socket.send(JSON.stringify(command));
      }
    }
    // @ts-ignore
    msgListRef.current?.scrollToBottom();
  }

  const onYReachStart = () => {
    setInitLoaded(true);
    if (loadingMore) {
      return;
    }
    if(initLoaded && activeConversation && messages.length < msgTotal){
      setLoadingMore(true);
      setMsgPageNum(msgPageNum + 1);
      getMsgPageUsingGET({
        cursor : (msgPageNum +10).toString(),
        pageSize: 10,
        roomId: activeConversation.id as any
      }).then(res => {
        if(res.code === 0){
          const records = res.data?.list;
          // @ts-ignore
          setMessages([...records, ...messages]);
          setLoadingMore(false);
        }
      })
    }
  };


  if(!currentUser || currentUser.id === targetUid){
    history.push('/note');
    return <></>
  }

  // @ts-ignore
  return (
    <MainContainer responsive>
      <Sidebar position="left" scrollable={false}>
        <Search
          value={value}
          placeholder="搜索用户"
          onChange={v => setValue(v)}
          onClearClick={() => setValue("")}
        />
        <ConversationList>
          {
            StringUtils.isNotEmpty(value) ?
            searchConversations.map(conversation =>
              <Conversation
                active={activeConversation && activeConversation.roomId == conversation.roomId}
                onClick={()=>changeConversation(conversation)}
                key={conversation.roomId}
                name={conversation.fromUsername}
                info={conversation.lastMessage}
                unreadCnt={conversation.unread}
              >
                <Avatar src={conversation.avatar} status="available"/>
              </Conversation>) :
            conversations.map(conversation =>
              <Conversation
                active={activeConversation && activeConversation.roomId == conversation.roomId}
                onClick={()=>changeConversation(conversation)}
                key={conversation.roomId}
                name={conversation.fromUsername}
                info={conversation.lastMessage}
                unreadCnt={conversation.unread}
              >
                <Avatar src={conversation.avatar} status="available"/>
              </Conversation>)
          }
        </ConversationList>
      </Sidebar>

      {
        !activeConversation ?
        <div style={{width: '100%', height: '100%', display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{backgroundImage: 'url(/images/empty.png)',
            backgroundSize: '402px 204px',
            marginBottom: 32,
            width: 402,
            height: 204}} />
          <div style={{color:' #8896b8', fontSize: 14, lineHeight: '1.5em'}}>
            快找小伙伴聊天吧 ( ゜- ゜)つロ
          </div>
        </div> :
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <ConversationHeader.Content userName={activeConversation.fromUsername}/>
            <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList ref={msgListRef} loadingMore={loadingMore} onYReachStart={onYReachStart}>
            {
              messages.map((message, index) => {
                const flag = message.fromUser?.uid === currentUser.id;
                return <Message key={message.message?.id} model={{
                  message: message.message?.content,
                  sender: message.fromUser?.username,
                  direction: flag ? "outgoing" : "incoming",
                  position: "single"
                }} avatarPosition={flag ? 'tr' : 'tl'}>
                  <Avatar style={{width: 36,minWidth: 36,height:36,minHeight: 36}} src={message.fromUser?.avatar} name="Zoe" />
                </Message>
              })
            }
          </MessageList>
          <MessageInput
            value={messageInputValue}
            onChange={val => setMessageInputValue(val)}
            onSend={() => {
              const msg = {
                type: 2,
                toUid: activeConversation.fromUid,
                content: messageInputValue,

              }
              const msgVo: API.ChatMessageResp = {
                fromUser: {
                  uid: currentUser.id,
                  username: currentUser.userName,
                  avatar: currentUser.userAvatar,
                },
                message: {
                  content: messageInputValue,
                },
              }
              setMessages([...messages, msgVo]);
              // setMessages([...messages]);
              setConversations([
                {...activeConversation, lastMessage: messageInputValue},
                ...conversations.filter(conversation =>
                  conversation.roomId !== activeConversation?.roomId)]);
              sendMessage(msg);
              setMessageInputValue("");
            }}
          />
        </ChatContainer>
      }
    </MainContainer>
  );
});

export default Chat;

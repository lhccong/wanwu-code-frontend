import {Card, Col, message, Row, Skeleton} from 'antd';
import React, {useEffect, useState} from 'react';
import Articles from "@/pages/user/Center/components/Articles";
import { useParams,history} from "umi";
import UserCard from "@/pages/Home/components/UserCard";
import {getUserVOByIdUsingGET} from "@/services/user/userController";
// import Stars from "@/pages/user/Center/components/Stars";
// import Follows from "@/pages/user/Center/components/Follows";
// import Fans from "@/pages/user/Center/components/Fans";

const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>文章</span>
    ),
  },
  {
    key: 'stars',
    tab: (
      <span>收藏</span>
    ),
  },
  {
    key: 'follows',
    tab: (
      <span>关注</span>
    ),
  },
  {
    key: 'fans',
    tab: (
      <span>粉丝</span>
    ),
  },
];

const Center: React.FC = () => {
  const params = useParams();
  const [targetUser, setTargetUser] = useState<API.UserVO>();
  const [tabKey, setTabKey] = useState<string>('articles');
  //获取用户信息
  useEffect(() => {
    async function fetchUserInfo(){
      if(!params?.userId){
        message.error('用户不存在！');
        history.push('/');
        return ;
      }
      return await getUserVOByIdUsingGET({id:params.userId});
    }
    fetchUserInfo().then((res) => {
      if(res && res.code === 0){
        setTargetUser(res.data);
      }
    })
  },[])

  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: string) => {
    if(!targetUser){
      return <Skeleton/>
    }

    if (tabValue === 'articles') {
      return <Articles targetUser={targetUser}/>;
    } else if (tabValue === 'stars') {
      // return <Stars userId={targetUser?.id}/>;
    } else if (tabValue === 'follows') {
      // return <Follows userId={targetUser?.id}/>;
    } else if (tabValue === 'fans') {
      // return <Fans userId={targetUser?.id}/>;
    }

    return null;
  };

  return (
    <Row style={{width: 1180, margin: '0 auto'}}>
      <Col span={17} style={{paddingRight: 8}}>
        <Card
          bordered={false}
          tabList={operationTabList}
          activeTabKey={tabKey}
          onTabChange={(_tabKey: string) => {
            setTabKey(_tabKey);
          }}
        >
          {renderChildrenByTabKey(tabKey)}
        </Card>
      </Col>

      <Col span={7}>
        {targetUser && <Card bodyStyle={{padding: '12px 20px'}} style={{marginBottom: 8}}>
          {targetUser && <UserCard data={targetUser} afterFollow={() => {
            setTargetUser({
              ...targetUser,
              fansNum: targetUser?.hasConcern ? targetUser.fansNum as number - 1 : targetUser.fansNum as number + 1,
              hasConcern: !targetUser.hasConcern
            })
          }}/>}
        </Card>}
      </Col>
    </Row>
  );
};
export default Center;

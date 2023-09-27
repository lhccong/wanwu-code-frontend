import { ReloadOutlined } from '@ant-design/icons';
import { Avatar, Badge, Card, Empty, List, Popover, Statistic, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
// import {useEmotionCss} from "@ant-design/use-emotion-css";
import UserCard from '@/pages/Home/components/UserCard';
import { listUserVOByPageUsingPOST, recommendUserUsingGET } from '@/services/user/userController';
import { IconFont } from '@/utils';
import { css } from '@emotion/css';
import { history, useModel } from 'umi';

const RecommendUsers: React.FC = () => {
  const [recommendUsers, setRecommendUsers] = useState<API.UserVO[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;

  useEffect(() => {
    //获取推荐用户
    recommendUserUsingGET({ num: 8 }).then((res) => {
      setRecommendUsers(res.data as API.UserVO[]);
      setUsersLoading(false);
    });
  }, []);

  const listItemCss = css`
    &:hover {
      background-color: #fafbfc;
    }
  `;

  const refreshCss = css`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.45);
    font-weight: 800;

    &:hover {
      color: #fa541c;
      cursor: pointer;
      transition: color 0.3s;
    }
  `;

  const refreshRecommend = () => {
    setUsersLoading(true);
    recommendUserUsingGET({ num: 8 }).then((res) => {
      setRecommendUsers(res.data as API.UserVO[]);
      setUsersLoading(false);
    });
  };

  const avatarCss = css`
    &:hover {
      cursor: pointer;
    }
  `;

  // @ts-ignore
  return (
    <Card
      style={{ borderRadius: 8 }}
      bodyStyle={{ padding: 0 }}
      title="推荐用户"
      extra={<ReloadOutlined onClick={refreshRecommend} className={refreshCss} />}
    >
      {
        recommendUsers===null?<Empty />:
          (<List
            style={{ margin: '8px 0' }}
            loading={usersLoading}
            itemLayout="horizontal"
            dataSource={recommendUsers}
            renderItem={(recommendUser) => (
              <List.Item className={listItemCss}>
                <Popover
                  content={
                    <UserCard
                      data={recommendUser}
                      // afterFollow={(user) => {
                      //   // setRecommendUsers(recommendUsers.map(recommendUser =>
                      //   //   recommendUser.userInfo.uid === user.uid ? {
                      //   //     ...recommendUser,
                      //   //     userInfo: {
                      //   //       ...recommendUser.userInfo,
                      //   //       fans: recommendUser.userInfo.isFollow ? recommendUser.userInfo.fans - 1 : recommendUser.userInfo.fans + 1,
                      //   //       isFollow: !recommendUser.userInfo.isFollow,
                      //   //     }
                      //   //   }
                      //   //   : recommendUser))
                      // }}
                    />
                  }
                >
                  <div className="pageHeaderContent">
                    <div style={{ marginLeft: 16 }}>
                      {
                        <Badge size="small" offset={[-4, 35]} count={<IconFont type="icon-checked" />}>
                          <Avatar
                            onClick={() => history.push(`/userMessage/${recommendUser.id}`)}
                            className={avatarCss}
                            size="large"
                            src={recommendUser.userAvatar}
                          />
                        </Badge>
                      }
                    </div>
                    <div className="content">
                      <div>{recommendUser.userName}</div>
                      <div className="tags">
                        {recommendUser && recommendUser.tags && recommendUser?.tags.length > 0 ? (
                          recommendUser?.tags?.map((tag) => (
                            <Tag
                              onClick={() => history.push(`/search?type=user&tags=${tag.name}`)}
                              className={avatarCss}
                              key={tag.id}
                              color={tag.color}
                              style={{ marginBottom: 6 }}
                            >
                              {tag.name}
                            </Tag>
                          ))
                        ) : (
                          <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>暂未选择标签</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Popover>
                {currentUser && 1 > 0.5 && (
                  <div style={{ float: 'right', width: '60px', marginRight: 16 }}>
                    <Statistic
                      title="相似度"
                      value={recommendUser.similarity}
                      precision={1}
                      valueStyle={{ color: '#3f8600', fontSize: 14 }}
                      suffix="%"
                    />
                  </div>
                )}
              </List.Item>
            )}
          />)
      }

    </Card>
  );
};

export default RecommendUsers;

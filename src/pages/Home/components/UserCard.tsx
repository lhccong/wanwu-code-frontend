import { CheckOutlined, MailOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Avatar, Button, Divider, Space, Statistic, Tag, Tooltip } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import './style.less';
type UserCardProps = {
  data: API.UserVO;
  afterFollow?: (user: API.UserVO) => void;
};

const UserCard: React.FC<UserCardProps> = ({ data, afterFollow }) => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;

  // const verifyUserStatus = () => {
  //   if (currentUser) {
  //     return true;
  //   } else {
  //     message.info('请先登录');
  //     return false;
  //   }
  // };

  // const doFollow = (user: API.UserVO) => {
  //   if (verifyUserStatus()) {
  //     // follow(user.uid).then((res) => {
  //     //   if (res.code === 200) {
  //     //     if (data.isFollow) {
  //     //       message.success('取关成功！');
  //     //     } else {
  //     //       message.success('关注成功！');
  //     //     }
  //     //     afterFollow?.(user);
  //     //   }
  //     // });
  //   }
  // };

  // const goChat = (uid: number) => {
  //   if (verifyUserStatus()) {
  //     history.push(`/notification?type=chat&targetUid=${uid}`);
  //   }
  // };

  //一些css
  const statisticCss = css`
    &:hover {
      cursor: pointer;
    }

    .ant-statistic-title {
      margin-bottom: 0;
      font-size: 12px;
    }
  `;

  const avatarCss = css`
    &:hover {
      cursor: pointer;
    }
  `;

  const signatureCss = css`
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 3em;
    line-height: 1.5em;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
  `;

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <>
      <div className="pageHeaderContent">
        <div>
          <Avatar style={{ width: 60, height: 60 }} className={avatarCss} src={data?.userAvatar} />
        </div>
        <div className="content">
          <div>
            <a>{data?.userName}</a>
            <Tooltip color="green" overlayStyle={{ fontSize: 12 }} title="never forever">
              <div className={signatureCss}>{data?.userProfile}</div>
            </Tooltip>
          </div>
          <Space size="large" style={{ marginTop: 3 }}>
            <Statistic
              className={statisticCss}
              valueStyle={{ color: '#3f8600', fontSize: 12 }}
              title="关注"
              value={data.concernNum}
            />
            <Statistic
              className={statisticCss}
              valueStyle={{ color: '#3f8600', fontSize: 12 }}
              title="粉丝"
              value={data.fansNum}
            />
            <Statistic
              className={statisticCss}
              valueStyle={{ color: '#3f8600', fontSize: 12 }}
              title="投稿"
              value={data.postNum}
            />
          </Space>
          {(!currentUser || currentUser.id !== data.id) && (
            <div style={{ marginTop: 5 }}>
              <Space>
                {data.hasConcern ? (
                  <Button icon={<CheckOutlined />} type="primary" style={{ width: 100 }}>
                    已关注
                  </Button>
                ) : (
                  <Button style={{ width: 100 }}>关注 </Button>
                )}
                <Button type="primary" icon={<MailOutlined />} style={{ width: 100 }}>
                  发消息
                </Button>
              </Space>
            </div>
          )}
        </div>
      </div>

      <Divider />

      <div style={{ maxWidth: 300 }}>
        <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>标签：</span>
        {data?.tags && data.tags.length > 0 ? (
          data.tags.map((tag) => (
            <Tag className={avatarCss} key={tag.id} color={tag.color} style={{ marginBottom: 6 }}>
              {tag.name}
            </Tag>
          ))
        ) : (
          <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>暂未选择标签</span>
        )}
      </div>
    </>
  );
};

export default UserCard;

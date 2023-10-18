import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  PushpinOutlined,
  SettingOutlined,
  StarOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Card, Dropdown, Image, List, message, Space, Tag } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { css } from '@emotion/css';
// @ts-ignore
import { history, useModel } from 'umi';
import { IconFont } from '@/utils';
import { deletePostUsingPOST, publishMyPostUsingPOST } from '@/services/user/postController';
import { doThumbUsingPOST } from '@/services/user/postThumbController';

type ArticleProps = {
  data: API.PostVO;
  type: string; //user是用户中心式，带有编辑按钮；normal
  updateInfo: (
    id: number,
    hasThumb: boolean,
    thumbNum: number,
    hasFavour: undefined | boolean,
    favourNum: number | undefined,
  ) => void;
};

const Article: React.FC<ArticleProps> = ({ data, type, updateInfo }) => {
  const {
    id,
    title,
    synopsis,
    user,
    userId,
    createTime,
    updateTime,
    tagList,
    hasThumb,
    thumbNum,
    hasFavour,
    imgList,
    favourNum,
  } = data;
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const [visible, setVisible] = useState(false);
  const [setStarModalVisible] = useState(false);

  //作者执行编辑操作
  const items: MenuProps['items'] = [
    {
      key: '0',
      label: '发布',
      icon: <IconFont type="icon-fabu" />,
      disabled: (status as any) === 1,
    },
    {
      key: '1',
      label: <a onClick={() => history.push(`/note/settings/${id}`)}>配置</a>,
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: '删除',
      icon: <DeleteOutlined />,
    },
  ];

  const onClick: MenuProps['onClick'] = async ({ key }) => {
    //如果点击的是退出，则要请求退出
    switch (key) {
      case '0':
        const publishRequest: API.PostPublishRequest = {
          postId: id,
        };
        publishMyPostUsingPOST(publishRequest).then((res) => {
          if (res.data) {
            message.success('发布成功！');
            window.location.reload();
          }
        });
        message.success('发布成功！');
        break;

      case '3':
        const deleteRequest: API.DeleteRequest = {
          id: id,
        };
        deletePostUsingPOST(deleteRequest).then(() => {
          message.success('删除成功');
          window.location.reload();
        });
    }
    console.log(key);
  };

  //样式
  const listContent = css`
    .ant-image {
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 0 10px rgb(0 0 0 / 20%);

      .ant-image-img {
        cursor: pointer;
        transition: all 0.6s;

        &:hover {
          transform: scale(1.4);
        }

        &:hover + .ant-image-mask {
          opacity: 1;
        }
      }

      .ant-image-mask {
        pointer-events: none;
      }
    }

    .description {
      display: flex;
      margin-top: 12px;
      line-height: 22px;

      a {
        color: rgba(0, 0, 0, 0.88);

        &:hover {
          color: #fa541c;
          transition: all 0.3s;
        }
      }
    }

    .extra {
      margin-top: 16px;
      color: fade(#000, 45%);
      line-height: 22px;
    }
  `;
  const cardCss = css`
    margin: 8px 0;
    padding: 0;

    &:hover {
      cursor: default;
    }
  `;

  const countCss = css`
    position: absolute;
    right: 6px;
    bottom: 10px;
    z-index: 10;
    display: block;
    color: #fff;
    padding: 0 4px;
    line-height: normal;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
  `;

  // 定义样式
  const contentCss = css`
    color: #555666;
    word-break: break-all;

    &:hover {
      color: #fa541c;
      transition: color 0.3s;
    }
  `;

  const avatarCss = css`
    &:hover {
      cursor: pointer;
    }
  `;

  const iconCss = css`
    &:hover {
      color: #fa541c;
      cursor: pointer;
      transition: color 0.2s;
    }
  `;

  //点击点赞按钮
  const likeArticle = () => {
    if (!currentUser) {
      message.info('请先登录');
      return;
    }

    //todo: 后端这里最好用消息队列优化，保证点赞接口快速返回
    doThumbUsingPOST({
      postId: id,
    }).then((res) => {
      if (res.data && res.data > 0) {
        message.success('点赞成功！');
        updateInfo(id as number, !hasThumb, (thumbNum as number) + res.data, hasFavour, favourNum);
      } else if (res.data && res.data < 0) {
        message.success('取消点赞成功！');
        updateInfo(id as number, !hasThumb, (thumbNum as number) + res.data, hasFavour, favourNum);
      } else {
        message.error('系统出差啦💥');
      }
    });
  };

  //点击收藏按钮
  const starArticle = () => {
    if (!currentUser) {
      message.info('请先登录');
      return;
    }
    // @ts-ignore
    setStarModalVisible(true);
  };

  return (
    <Card
      hoverable={true}
      className={cardCss}
      bodyStyle={{ padding: 0 }}
      style={{ borderRadius: 8, marginBottom: 16 }}
    >
      <List.Item
        style={{ padding: '16px 24px 12px 24px' }}
        key={id}
        actions={[
          // 不判断当前用户是否点赞或者收藏了
          <Space className={iconCss} onClick={likeArticle} key="list-vertical-like-o">
            {hasThumb ? (
              <IconFont
                style={{ display: 'flex', alignItems: 'center', fontSize: 18, color: 'red' }}
                type="icon-like-fill"
              />
            ) : (
              <IconFont
                style={{ display: 'flex', alignItems: 'center', fontSize: 18 }}
                type="icon-like"
              />
            )}
            {String(thumbNum)}
          </Space>,
          <Space className={iconCss} onClick={starArticle} key="list-vertical-star-o">
            {hasFavour ? (
              <IconFont
                style={{ display: 'flex', alignItems: 'center', fontSize: 18, color: 'red' }}
                type="icon-star2"
              />
            ) : (
              <IconFont
                style={{ display: 'flex', alignItems: 'center', fontSize: 18 }}
                type="icon-star"
              />
            )}
            {String(favourNum)}
          </Space>,
          <Space
            className={iconCss}
            onClick={() => history.push(`/note/${id}?open=true`)}
            key="list-vertical-message"
          >
            <IconFont
              style={{ display: 'flex', alignItems: 'center', fontSize: 18 }}
              type="icon-comment"
            />
            {String(520)}
          </Space>,
        ]}
      >
        <List.Item.Meta
          title={
            <>
              <a onClick={() => history.push(`/note/${id}`)}>{title}</a>
              {/*{prime === 1 && <Tag style={{float: 'right'}} icon={<StarOutlined/>} color="#FA541C">精华</Tag>}*/}
              {
                <Tag style={{ float: 'right' }} icon={<StarOutlined />} color="#FA541C">
                  精华
                </Tag>
              }
              {/*{type === 'user' && isTop === 1 && <Tag style={{float: 'right'}} icon={<PushpinOutlined/>} color="#FA541C">置顶</Tag>}*/}
              {type === 'user' && (
                <Tag style={{ float: 'right' }} icon={<PushpinOutlined />} color="#FA541C">
                  置顶
                </Tag>
              )}
              {type === 'user' && (status as any) === 0 && (
                <Tag
                  style={{ float: 'right' }}
                  icon={<IconFont type="icon-caogaoxiang" />}
                  color="rgb(22, 119, 255)"
                >
                  草稿
                </Tag>
              )}
            </>
          }
          description={
            <div>
              <div>
                <Space>
                  {(type === 'user' && (
                    <>
                      <div>创建于</div>
                      <div>
                        <ClockCircleOutlined />
                        <em>
                          {' '}
                          {moment(new Date(createTime as string).toISOString()).format(
                            'YYYY-MM-DD HH:mm',
                          )}
                        </em>
                      </div>

                      <div>更新于</div>
                      <div>
                        <ClockCircleOutlined />
                        <em>
                          {' '}
                          {moment(new Date(updateTime as string).toISOString()).format(
                            'YYYY-MM-DD HH:mm',
                          )}
                        </em>
                      </div>
                    </>
                  )) ||
                    (type === 'normal' && (
                      <>
                        <div>
                          <Avatar
                            onClick={() => history.push(`/userMessage/${userId}`)}
                            className={avatarCss}
                            src={user?.userAvatar}
                            size="small"
                          />
                          <a onClick={() => history.push(`/userMessage/${userId}`)}> {user?.userName} </a>
                        </div>

                        <div>发布于</div>
                        <div>
                          <ClockCircleOutlined />
                          <em>
                            {' '}
                            {moment(new Date(updateTime as any).toISOString()).format(
                              'YYYY-MM-DD HH:mm',
                            )}
                          </em>
                        </div>
                      </>
                    ))}
                  <div>
                    <EyeOutlined /> {666}
                  </div>
                </Space>
              </div>
              {tagList && (
                <div>
                  文章标签：
                  {tagList.length > 0
                    ? tagList.map((tag) => (
                        <Tag
                          // onClick={() => history.push(`/search?type=blog&tagList=${tag.name}`)}
                          className={avatarCss}
                          key={tag}
                          color={'blue'}
                        >
                          {tag}
                        </Tag>
                      ))
                    : '无'}
                </div>
              )}
            </div>
          }
        />

        <div className={listContent}>
          <div className="description">
            <div style={{ flexGrow: 1, paddingRight: '12px' }}>
              <a
                onClick={() => history.push(`/note/${id}`)}
                style={{ color: '#555666' }}
                className={contentCss}
              >
                {synopsis}
              </a>
            </div>
            {imgList && imgList.length > 0 && (
              <div style={{ position: 'sticky', top: 0 }}>
                <Image
                  preview={{ visible: false }}
                  style={{ borderRadius: 8, width: 200, height: 120, objectFit: 'cover' }}
                  src={imgList[0]}
                  onClick={() => setVisible(true)}
                />
                <span className={countCss}>{imgList.length}</span>
                <div style={{ display: 'none' }}>
                  <Image.PreviewGroup
                    preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
                  >
                    {imgList.map((img, index) => (
                      <Image key={index} src={img} />
                    ))}
                  </Image.PreviewGroup>
                </div>
              </div>
            )}
          </div>

          {type === 'user' && currentUser?.id === userId && (
            <div className="extra" style={{ float: 'right' }}>
              <Button
                onClick={() => {
                  history.push(`/note/edit/${id}`);
                }}
                size="small"
                style={{ borderRadius: '6px 0 0 6px' }}
                icon={<EditOutlined />}
              >
                编辑
              </Button>
              <Dropdown menu={{ items, onClick }} placement="bottom">
                <Button
                  size="small"
                  style={{ borderRadius: '0 6px 6px 0', margin: '0 16px 0 -1px' }}
                  icon={<EllipsisOutlined />}
                />
              </Dropdown>
            </div>
          )}
        </div>
      </List.Item>

      {/*收藏Modal*/}
      {/*{*/}
      {/*  starModalVisible &&*/}
      {/*  <StarModal*/}
      {/*    articleId={id}*/}
      {/*    visible={true}*/}
      {/*    onCancel={()=>setStarModalVisible(false)}*/}
      {/*    onOver={(type)=>{*/}
      {/*      setStarModalVisible(false);*/}
      {/*      switch (type){*/}
      {/*        case 0: updateInfo(id, hasThumb, thumbNum, false, favourNum - 1);break;*/}
      {/*        case 2: updateInfo(id, hasThumb, thumbNum, true, favourNum + 1);break;*/}
      {/*      }*/}
      {/*    }}*/}
      {/*  />*/}
      {/*}*/}
    </Card>
  );
};

export default Article;

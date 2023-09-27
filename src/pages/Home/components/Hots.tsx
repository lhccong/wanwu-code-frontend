import { IconFont } from '@/utils';
import { history } from '@@/core/history';
import { css } from '@emotion/css';
import { Card, List } from 'antd';
import React, { useEffect, useState } from 'react';
import {listPostVOByPageUsingPOST} from "@/services/user/postController";

const Hots: React.FC = () => {
  const [hots,setHots] = useState<API.PostVO[]>([]);
  const [hotsLoading,setHotsLoading] = useState(true);

  useEffect(() => {
    const params: API.PostQueryRequest = {
      sortOrder: 'desc',
      pageSize: 5,
      current:1,
      sortField: 'thumbNum',
    };
    // 获取全局热门文章
    listPostVOByPageUsingPOST(params).then((res) => {
        setHots(res.data?.records as API.PostVO[]);
        setHotsLoading(false);
    });
  }, []);

  const listItemCss = css`
    :hover {
      background: #f8f9fa;
      cursor: pointer;
    }
  `;

  const topIcons = [
    <IconFont key="1" type="icon-daochu1024-26" />,
    <IconFont key="2" type="icon-daochu1024-27" />,
    <IconFont key="3" type="icon-daochu1024-28" />,
    <IconFont key="4" type="icon-4_round_solid" />,
    <IconFont key="5" type="icon-5_round_solid" />,
    <IconFont key="6" type="icon-6_round_solid" />,
    <IconFont key="7" type="icon-7_round_solid" />,
    <IconFont key="8" type="icon-8_round_solid" />,
  ];

  return (
    <Card bodyStyle={{ padding: '0 0 5px 0' }} style={{ marginBottom: 8,borderRadius:8 }} title="热门文章">
      <List
        loading={hotsLoading}
        size="small"
        dataSource={hots}
        renderItem={(article, index) => (
          <>
            <List.Item
              style={{ padding: '2px 10px' }}
              className={listItemCss}
              onClick={() => history.push(`/note/${article.id}`)}
            >
              <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <span style={{ fontSize: 24, marginRight: 4 }}>{topIcons[index]}</span>
                <span
                  style={{
                    fontSize: 13,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: '#2f3034',
                  }}
                >
                  <b>{article.title}</b> {article.synopsis}
                </span>
              </div>
            </List.Item>
          </>
        )}
      />
    </Card>
  );
};

export default Hots;

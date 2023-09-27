import { Card, List, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { history } from '@@/core/history';
import { getLoginUserUsingGET } from '@/services/user/userController';

const GlobalTop: React.FC = () => {
  const [globalTops, setGlobalTops] = useState<any[]>([]);
  const [topsLoading, setTopsLoading] = useState(true);
  const data = [
    {
      title: '七里香🌹',
      summary: '窗外的麻雀在电线杆上多嘴你说这一句很有夏天的感觉',
      id: '1',
    },
    { title: '暗号🎉', summary: '你停止收讯号 我开始搜寻不到到底有谁知道 是几点钟方向', id: '2' },
  ];

  useEffect(() => {
    //获取全局置顶文章
    getLoginUserUsingGET().then((res) => {
      setGlobalTops(data);
      setTopsLoading(false);
    });
  }, []);

  // const listItemCss = useEmotionCss(() => {
  //   return {
  //     ':hover': {
  //       background: '#F8F9FA',
  //       cursor: 'pointer'
  //     }
  //   }
  // })

  return (
    <Card bodyStyle={{ padding: '5px 0' }} style={{ borderRadius: 8, marginBottom: 8 }}>
      <List
        loading={topsLoading}
        dataSource={globalTops}
        renderItem={(article) => (
          <List.Item
            style={{ padding: '10px 20px' }}
            onClick={() => history.push(`/note/${article.id}`)}
          >
            <div style={{ display: 'flex', width: '100%' }}>
              <Tag color="volcano" style={{ color: '#FA541C' }}>
                置顶
              </Tag>
              <span
                style={{
                  fontSize: 14,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: '#2f3034',
                }}
              >
                <b>{article.title}</b> {article.summary}
              </span>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default GlobalTop;

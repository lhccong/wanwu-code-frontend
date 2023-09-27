import { Button, Card, Col, List, Row, Skeleton, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import Article from '@/pages/Home/components/Article';
import { listPostVOByPageUsingPOST } from '@/services/user/postController';
import RecommendUsers from '@/pages/Home/components/RecommendUsers';
import GlobalTop from '@/pages/Home/components/GlobalTop';
import Hots from '@/pages/Home/components/Hots';
import './index.less';

const Home: React.FC = () => {
  const urlSearchParams = new URLSearchParams(location.search);
  const [type, setType] = useState(() => {
    return urlSearchParams.get('type') || 'latest';
  });
  const [current, setCurrent] = useState(() => {
    return Number(urlSearchParams.get('current')) || 1;
  });
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<API.PostVO[]>([]);
  const [total, setTotal] = useState(0);

  //监听路径参数变化，拿到路径上的参数进行请求，然后向后端发起请求
  useEffect(() => {
    let params: API.PostQueryRequest = {};
    switch (urlSearchParams.get('type') || 'latest') {
      case 'latest':
        params = {
          sortOrder: 'desc',
          pageSize: 5,
          current,
          sortField: 'createTime',
        };
        break;
      case 'score':
        params = {
          sortOrder: 'desc',
          pageSize: 5,
          current,
          sortField: 'createTime',
        };
        break;
      case 'prime':
        params = {
          sortOrder: 'desc',
          pageSize: 5,
          current,
          sortField: 'createTime',
        };
        break;
    }

    //分页获取文章
    listPostVOByPageUsingPOST(params).then((res) => {
      setLoading(false);
      setArticles(res.data?.records as API.PostVO[]);
      setTotal(res.data?.total as number);
    });
  }, [location.search]);

  const changeChoice = (newType: string) => {
    setCurrent(1);
    setType(newType);
    setLoading(true);
    const queryString = new URLSearchParams({ type: newType, current: '1' }).toString();

    // 改变 URL，并更新 query 参数
    window.history.pushState(null, '', `?${queryString}`);
    // window.history.pushState = `?${new URLSearchParams({ type: newType, current: '1' }).toString()}`;
  };

  return (
    <Row style={{ width: 1480, margin: '0 auto' }}>
      <Col span={17} style={{ paddingRight: 8 }}>
        <Card bodyStyle={{ padding: '12px 20px' }} style={{ marginBottom: 8, borderRadius: 8 }}>
          <Space>
            <Button
              size="small"
              onClick={() => changeChoice('latest')}
              type={type === 'latest' ? 'primary' : 'default'}
            >
              🌹最新
            </Button>
            <Button
              size="small"
              onClick={() => changeChoice('score')}
              type={type === 'score' ? 'primary' : 'default'}
            >
              <span>🌈热门</span>
            </Button>
            <Button
              size="small"
              onClick={() => changeChoice('prime')}
              type={type === 'prime' ? 'primary' : 'default'}
            >
              <span>✨ 精华</span>
            </Button>
          </Space>
        </Card>
        <GlobalTop />

        {loading ? (
          <>
            <Card style={{ marginBottom: 8 }}>
              <Skeleton avatar paragraph={{ rows: 4 }} />
            </Card>
            <Card style={{ marginBottom: 8 }}>
              <Skeleton avatar paragraph={{ rows: 4 }} />
            </Card>
            <Card style={{ marginBottom: 8 }}>
              <Skeleton avatar paragraph={{ rows: 4 }} />
            </Card>
          </>
        ) : (
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 5,
              current: Number(urlSearchParams.get('current')) || 1,
              onChange: (page) => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
                setLoading(true);
                setCurrent(page);
                const queryString = new URLSearchParams({
                  type,
                  current: page.toString(),
                }).toString();

                // 改变 URL，并更新 query 参数
                window.history.pushState(null, '', `?${queryString}`);
                // window.location.href = `?${new URLSearchParams({ type, current: page.toString() }).toString()}`;
              },
              showSizeChanger: false,
              showQuickJumper: true,
              total,
            }}
            dataSource={articles}
            renderItem={(article) => (
              <Article
                data={{ ...article }}
                type="normal"
                updateInfo={(id, hasThumb, thumbNum, hasFavour, favourNum) => {
                  setArticles(
                    articles.map((tmp) =>
                      tmp.id === id ? { ...tmp, hasThumb, thumbNum, hasFavour, favourNum } : tmp,
                    ),
                  );
                }}
              />
            )}
          />
        )}
      </Col>
      <Col span={7}>
        <Hots />
        <RecommendUsers />
      </Col>
    </Row>
  );
};

export default Home;

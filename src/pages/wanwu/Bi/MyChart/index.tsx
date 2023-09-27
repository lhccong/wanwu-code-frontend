import { listMyChartByPageUsingPOST } from '@/services/bi/chartController';
import { useModel } from 'umi';
import { Avatar, Card, List, message, Result } from 'antd';
import Search from 'antd/es/input/Search';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

/**
 * 添加图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 4,
    sortField: 'createTime',
    sortOrder: 'desc'
  };

  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({
    ...initSearchParams,
  });
  const [chartList, setChartList] = useState<API.Chart[]>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [total, setTotal] = useState<number>(0);
  const [loading, setloading] = useState<boolean>(true);
  const loadData = async () => {
    setloading(true);
    try {
      await listMyChartByPageUsingPOST(searchParams).then(result=>{
        if (result.data) {
          setChartList(result.data.records ?? []);
          setTotal(result.data.total ?? 0);
          //隐藏图表title
          if (result.data.records) {
            result.data.records.forEach((data) => {
              if (data.status === 'succeed') {
                const chartOption = JSON.parse(data.genChart ?? '{}');
                chartOption.title = undefined;
                data.genChart = JSON.stringify(chartOption);
              }
            });
          }
        } else {
          message.error('获取我的图表失败');
        }
      })

    } catch (e: any) {
      message.error('获取我的图表失败：' + e.message);
    }
    setloading(false);
  };
  useEffect(() => {
    loadData();
  }, [searchParams]);
  return (
    <div className="my-chart-page">
      <div>
        <Search
          placeholder="请输入图标名称"
          enterButton
          loading={loading}
          onSearch={(value, event) => {
            setSearchParams({
              ...initSearchParams,
              name: value,
            });
          }}
         />
      </div>
      <div className="margin-16" />

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        pagination={{
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize,
            });
          },
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          total: total,
        }}
        loading={loading}
        dataSource={chartList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card>
              <List.Item.Meta
                avatar={<Avatar src={currentUser && currentUser?.userAvatar} />}
                title={item.name}
                description={item.goal ? '分析目标：' + item.goal : undefined}
              />
              <>
                {item.status === 'wait' && (
                  <>
                    <Result
                      status="warning"
                      title="待生成"
                      subTitle={item.execMessage ?? '当前图表生成队列繁忙，请耐心等候'}
                    />
                  </>
                )}
                {item.status === 'running' && (
                  <>
                    <Result status="info" title="图表生成中" subTitle={item.execMessage} />
                  </>
                )}
                {item.status === 'succeed' && (
                  <>
                    <div className="margin-16" />

                    {'分析结论：' + item.genResult}
                    <div className="margin-16" />
                    <ReactECharts option={JSON.parse(item.genChart ?? '{}')} />
                  </>
                )}
                {item.status === 'failed' && (
                  <>
                    <Result status="error" title="图表生成失败" subTitle={item.execMessage} />
                  </>
                )}
              </>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default MyChartPage;

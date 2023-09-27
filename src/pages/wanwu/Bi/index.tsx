import React from 'react';
import AddChart from '@/pages/wanwu/Bi/AddChart';
import AddChartAsync from '@/pages/wanwu/Bi/AddChartAsync';
import AddDisease from '@/pages/wanwu/Bi/AddDisease';
import MyChart from '@/pages/wanwu/Bi/MyChart';
import {Col, Row, Tabs} from 'antd';

const Bi: React.FC = () => {
// 自定义组件
  const CustomComponent = ({id}: any) => {
    if (id==="1"){
      return <AddChart/>;
    }
    if (id==="2"){
      return <AddChartAsync/>;
    }
    if (id==="3"){
      return <AddDisease/>;
    }
    if (id==="4"){
      return <MyChart/>;
    }

    return <AddChart/>;
  };
  const labels = [
    {
      id: "1",
      name: "智能分析📊"
    },
    {
      id: "2",
      name: "智能分析(异步)📊"
    },
    {
      id: "3",
      name: "智能看病👨‍⚕️"
    },
    {
      id: "4",
      name: "我的图表📑"
    }
  ]
  return (
    <Row style={{ width: 1480, margin: 'auto' }}>
      <Col span={24}>
        < Tabs
          style={{background:"white",width:1480,padding:50,borderRadius:8}}
          tabPosition={"left"}
          size={"large"}
          items={
            labels.map((label, i) => {
              return {
                label: label.name,
                key: label.id,
                children: <CustomComponent id={label.id}/>,
              };
            })
          }
        />
      </Col>
      <Col span={8} />
    </Row>
  )
    ;
};

export default Bi;

import React, {useEffect, useState} from 'react';
import {Button, Card, Input, List, message} from 'antd';
import {getLoginUserUsingGET, refreshKeyUsingGET} from "@/services/user/userController";

import copy from 'copy-to-clipboard';
import {CopyOutlined} from '@ant-design/icons';

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.UserVO>();
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getLoginUserUsingGET();
      setData(res.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);
  const refreshKey = async()=> {
    const res = await refreshKeyUsingGET();
    if (res.data){
      loadData();
    }

  }
  return (
    <div>
      <Card type="inner" style={{borderRadius: 8, width: 1204, margin: "auto", fontSize: 17}}
            title="开发者密钥（调用接口的凭证）" extra={<Button onClick={refreshKey}>重新生成</Button>}>
        AccessKey：{data?.accessKey}<CopyOutlined style={{color:"#FFA768"}} onClick={() => {
        copy(data?.accessKey as string);
        message.open({
          type: 'success',
          content: '复制成功',
        });
      }}/>
        <br/>
        <br/>
        SecretKey：{data?.secretKey}<CopyOutlined style={{color:"#FFA768"}} onClick={() => {
        copy(data?.secretKey as string);
        message.open({
          type: 'success',
          content: '复制成功',
        });
      }}/>
      </Card>
    </div>

  );
};

export default Index;

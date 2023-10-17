import React, { useEffect, useState } from 'react';
import {Card, Input, List, message} from 'antd';
import {listInterfaceInfoByPageUsingGET} from "@/services/api/interfaceInfoController";
import {history} from "@@/core/history";

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [interfaceName, setInterfaceName] = useState<string>("");

  const loadData = async (current = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingGET({
        name: interfaceName,
        current,
        pageSize,
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };
   const handleInputChange=(e: any) =>{
     setInterfaceName(e.target.value)
  }
  const onPressEnter=(e: any) =>{
     loadData();
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div style={{borderRadius:8,width:1204,margin:"auto",paddingBottom:20}}>
        <Input
          placeholder="快来查找你想要的接口吧~"
          allowClear
          style={{borderRadius:8,height: 60}}
          onChange={handleInputChange}
          onPressEnter = {onPressEnter}
        />
      </div>

      <Card style={{borderRadius:8,width:1204,margin:"auto"}}>

        <List
          className="my-list"
          loading={loading}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => {
            const apiLink = `/interface_info/${item.id}`;
            return (
              <List.Item actions={[<a key={item.id} onClick={() => history.push(apiLink)} >查看</a>]}>
                <List.Item.Meta
                  title={<a onClick={() => history.push(apiLink)}>{item.name}</a>}
                  description={item.description}
                />
              </List.Item>
            );
          }}
          pagination={{
            // eslint-disable-next-line @typescript-eslint/no-shadow
            showTotal(total: number) {
              return '总数：' + total;
            },
            pageSize: 10,
            total,
            onChange(page, pageSize) {
              loadData(page, pageSize);
            },
          }}
        />
      </Card>
    </div>

  );
};

export default Index;

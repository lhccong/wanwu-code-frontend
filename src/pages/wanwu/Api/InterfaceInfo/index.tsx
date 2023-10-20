import React, {useEffect, useState} from 'react';
import {Button, Card, Descriptions, Form, message, Input, Divider, Row, Col} from 'antd';
import {useParams} from 'umi';
import {getInterfaceInfoByIdUsingGET, invokeInterfaceInfoUsingPOST} from "@/services/api/interfaceInfoController";
import ReactJson from 'react-json-view'
/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);

  const params = useParams();

  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setData(res.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPOST({
        id: params.id,
        ...values,
      });
      setInvokeRes(res.data);
      message.success('请求成功');
    } catch (error: any) {
      message.error('操作失败，' + error.message);
    }
    setInvokeLoading(false);
  };

  return (
    <div>
      <Row gutter={24} style={{margin: "auto",marginTop:30}}>
        <Col span={12}>
          <Card style={{borderRadius:8}}>
            {data ? (
              <Descriptions title={data.name} column={1}>
                <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
                <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
                <Descriptions.Item label="请求地址">https://qingxin.store/wanwu{data.url}</Descriptions.Item>
                <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
                <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
                <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
                <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
                <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
              </Descriptions>
            ) : (
              <>接口不存在</>
            )}
          </Card>
        </Col>

        <Col span={12}>
          <Card style={{borderRadius:8}} title="在线测试">
            {data&&<Form name="invoke" layout="vertical" onFinish={onFinish} initialValues={{"userRequestParams": data?.example}}>
              <Form.Item label="请求参数" name="userRequestParams"  >
                <Input.TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{span: 16}}>
                <Button type="primary" htmlType="submit">
                  调用
                </Button>
              </Form.Item>
            </Form>}
          </Card>
          <Divider/>
          <Card style={{borderRadius:8}} title="返回结果" loading={invokeLoading}>
            {invokeRes && (
              <>
                {
                  (() => {
                    try {
                      const parsedRes = JSON.parse(invokeRes);
                      return <ReactJson src={parsedRes} />
                    } catch (e) {
                      console.error('解析 JSON 数据出错:', e);
                      return <p>无法解析返回结果</p>;
                    }
                  })()
                }
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>

  );
};

export default Index;

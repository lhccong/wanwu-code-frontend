
import {Button, Card, Col, Divider, Empty, Form, message, Row, Select, Space, Spin} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import {genDiseaseByAiUsingPOST} from "@/services/bi/diseaseController";

/**
 * 添加图表页面
 * @constructor
 */
const AddDisease: React.FC = () => {
  const [disease, setDisease] = useState<API.BiDiseaseResponse>();
  const [option,setOption] = useState<any>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    // 避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    setOption(undefined);
    setDisease(undefined);
    // todo 对接后端上传数据
    const param = {
      ...values,
      file: undefined,
    };
    try {
      const res = await genDiseaseByAiUsingPOST(param, {});

      if (!res?.data) {
        message.error('分析失败');
      } else {
        message.success('分析成功');

        setDisease(res?.data);
      }
      console.log(res);
    } catch (e: any) {
      message.error('分析失败', e.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="add-disease">
      <Row gutter={24}>
        <Col span={12}>
          <Card title="智能看病">
            <Form
              name="add_disease"
              onFinish={onFinish}
              initialValues={{}}
              labelAlign="left"
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                name="userDesc"
                label="描述"
                rules={[{ required: true, message: '请输入症状' }]}
              >
                <TextArea placeholder="请输入你的症状比如：头疼，浑身发热" />
              </Form.Item>
              <Form.Item name="sex" label="性别">
                <Select
                  placeholder="请选择你的性别"
                  options={[
                    { value: '0', label: '女' },
                    { value: '1', label: '男' },
                  ]}
                 />
              </Form.Item>
              <Form.Item name="diseaseType" label="科室">
                <Select
                  placeholder="请选择你想要挂的科室"
                  options={[
                    { value: '皮肤科', label: '皮肤科' },
                    { value: '呼吸内科', label: '呼吸内科' },
                    { value: '神经内科', label: '神经内科' },
                    { value: '妇科', label: '妇科' },
                    { value: '幼科', label: '幼科' },
                  ]}
                 />
              </Form.Item>



              <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    disabled={submitting}
                  >
                    提交
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="症状名称">
            <div>
              {disease?.name ?? (
                <div>
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{ height: 60 }}
                    description={
                      <span>
                        <a href="#API">请先在左侧进行提交</a>
                      </span>
                    }
                   />
                </div>
              )}
              <Spin spinning = {submitting}/>
            </div>
          </Card>
          <Divider/>
          <Card title="治疗计划">
            <div>
              {disease?.genResult ?? (
                <div>
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{ height: 60 }}
                    description={
                      <span>
                        <a href="#API">请先在左侧进行提交</a>
                      </span>
                    }
                   />
                </div>
              )}
              <Spin spinning = {submitting}/>
            </div>
          </Card>
          <Divider />
        </Col>
      </Row>
    </div>
  );
};
export default AddDisease;

import {
  genChartByAiAsyncMqUsingPOST
} from '@/services/bi/chartController';
import {DownloadOutlined, UploadOutlined} from '@ant-design/icons';
import {Button, Card, Form, message, Select, Space, Upload} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, {useState} from 'react';
import {ProForm} from "@ant-design/pro-components";


/**
 * 添加图表（异步）页面
 * @constructor
 */
const AddChartAsync: React.FC = () => {
  const [form] = ProForm.useForm();
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

    // todo 对接后端上传数据
    const param = {
      ...values,
      file: undefined,
    };
    try {
      // const res = await genChartByAiAsyncUsingPOST(param, {}, values.file.file.originFileObj);
      const res = await genChartByAiAsyncMqUsingPOST(param, {}, values.file.file.originFileObj);

      if (!res?.data) {
        message.error('分析失败');
      } else {
        message.success('分析任务提交成功，稍后请在我的图表页面查看');
        form.resetFields();
      }
      console.log(res);
    } catch (e: any) {
      message.error('分析失败', e.message);
    }
    setSubmitting(false);
  };
  const handleDownload = () => {
    // 替换为你的文件下载链接
    const fileUrl = '\n' +
      'https://gulimall-lhc.oss-cn-shanghai.aliyuncs.com/Bi分析示例文件.xlsx';

    // 使用<a>标签方式下载文件
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Bi分析示例文件.xlsx';
    link.click();

    // 或者使用window.open()方法下载文件
    // window.open(fileUrl);
  };
  return (
    <div className="add-chart-aync">
      <Card title="智能分析（异步）">
        <Form
          form={form}
          name="add_chart"
          onFinish={onFinish}
          initialValues={{}}
          labelAlign="left"
          labelCol={{span: 4}}
          wrapperCol={{span: 16}}
        >
          <Form.Item
            name="goal"
            label="分析目标"
            rules={[{required: true, message: '请输入分析目标'}]}
          >
            <TextArea placeholder="请输入你的分析需求比如：分析网站用户的增长情况"/>
          </Form.Item>
          <Form.Item name="name" label="图表名称">
            <TextArea placeholder="请输入你的图表名称"/>
          </Form.Item>
          <Form.Item name="chartType" label="图表类型">
            <Select
              placeholder="请选择你想要的图表类型"
              options={[
                {value: '折线图', label: '折线图'},
                {value: '柱状图', label: '柱状图'},
                {value: '堆叠图', label: '堆叠图'},
                {value: '饼图', label: '饼图'},
                {value: '雷达图', label: '雷达图'},
              ]}
            />
          </Form.Item>

          <Form.Item name="file" label="原始数据">
            <Upload name="file" maxCount={1}>
              <Button icon={<UploadOutlined/>}>上传Excel文件</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <a onClick={handleDownload}>
            <DownloadOutlined/>
            下载示例文件
            </a>
          </Form.Item>

          <Form.Item wrapperCol={{span: 16, offset: 4}}>
            <Space>
              <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                提交
              </Button>
              <Button htmlType="reset">重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default AddChartAsync;

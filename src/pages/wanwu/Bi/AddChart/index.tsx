import {genChartByAiUsingPOST} from '@/services/bi/chartController';
import {UploadOutlined,DownloadOutlined } from '@ant-design/icons';
import {Button, Card, Col, Divider, Empty, Form, message, Row, Select, Space, Spin, Upload} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ReactECharts from 'echarts-for-react';
import React, {useState} from 'react';

/**
 * 添加图表页面
 * @constructor
 */
const AddChart: React.FC = () => {
  const [chart, setChart] = useState<API.BiResponse>();
  const [option, setOption] = useState<any>();
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
    setChart(undefined);
    // todo 对接后端上传数据
    const param = {
      ...values,
      file: undefined,
    };
    try {
      const res = await genChartByAiUsingPOST(param, {}, values.file.file.originFileObj);

      if (!res?.data) {
        message.error('分析失败');
      } else {
        message.success('分析成功');
        const chartOption = JSON.parse(res.data.genChart ?? '');
        if (!chartOption) {
          throw new Error('图表代码解析错误');
        }
        setChart(res?.data);
        setOption(chartOption);
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
    <div className="add-chart">
      <Row gutter={24}>
        <Col span={12}>
          <Card title="智能分析">
            <Form
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
          <Card title="分析结论">
            <div>
              {chart?.genResult ?? (
                <div>
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{height: 60}}
                    description={
                      <span>
                        <a href="#API">请先在左侧进行提交</a>
                      </span>
                    }
                  />
                </div>
              )}
              <Spin spinning={submitting}/>
            </div>
          </Card>
          <Divider/>
          <Card title="可视化图表">
            {option ? (
              <ReactECharts option={option}/>
            ) : (
              <div>
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{height: 60}}
                  description={
                    <span>
                      <a href="#API">请先在左侧进行提交</a>
                    </span>
                  }
                />
              </div>
            )}
            <Spin spinning={submitting}/>

          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default AddChart;

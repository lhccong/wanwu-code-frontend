import type { UploadFile, UploadProps, InputRef } from 'antd';
import { Card, Divider, Form, Input, message, Modal, Radio, Tooltip, Tag, Upload } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload';
import { policyUsingGET } from '@/services/user/ossController';
// @ts-ignore
import { v4 as UUID } from 'uuid';
import FormItem from 'antd/es/form/FormItem';
import { StringUtils } from '@/utils';
import { history, useModel } from 'umi';
import {
  addPostUsingPOST,
  editPostUsingPOST,
  getPostVOByIdUsingGET,
  removePostImgUsingPOST,
} from '@/services/user/postController';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

//图片的预览
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export type ArticleData = {
  title?: string;
  synopsis?: string;
  tags?: string[];
  isTop?: string;
  closeComment?: string;
  thumbnails?: string[];
  createTime?: any;
};

//校验
const checksynopsis = (_: any, value: string) => {
  const promise = Promise;
  // 没有值的情况
  if (!value) {
    return promise.reject('文章摘要必须填写!');
  }
  //有值的情况
  if (value.length > 250) {
    return promise.reject('文章摘要的长度不符合要求！');
  }
  return promise.resolve();
};

type Step1Props = {
  articleId?: number;
  ref?: any;
};

const Step1: React.FC<Step1Props> = forwardRef(({ articleId }, ref) => {
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);
  const { initialState } = useModel('@@initialState');
  const [currentUser] = useState(initialState?.currentUser);

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  //初始化获取所有ArticleCategory，如果传来了一个articleId，还要根据articleId查询文章信息
  useEffect(() => {
    if (articleId) {
      //查询文章信息
      getPostVOByIdUsingGET({ id: articleId }).then((res) => {
        form.setFieldValue('title', res.data?.title);
        form.setFieldValue('synopsis', res.data?.synopsis);
        form.setFieldValue('isTop', '0');
        form.setFieldValue('closeComment', '0');
        const imgList = res.data?.imgList as string[];
        if (imgList != null && imgList.length != 0) {
          setFileList(
            imgList
              .filter((thumbnail: string) => StringUtils.isNotEmpty(thumbnail))
              .map((thumbnail: string) => {
                return {
                  uid: thumbnail,
                  name: thumbnail,
                  url: thumbnail,
                };
              }),
          );
        }
        setTags(res?.data?.tagList as any);
      });
    }
  }, []);

  //计算属性根据selectedTags获取ids
  // useEffect(()=>{
  //   setSelectedIds(selectedTags.length > 0 ? selectedTags.map(tag => tag.id) : []);
  // }, [selectedTags])

  const handleCancel = () => {
    setPreviewOpen(false);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    //真实的地址是`http://image.antares.cool/${file.response.key}`
    setFileList(newFileList);
  };
  const removeImg = (file: UploadFile) => {
    const params: API.PostImgRemoveRequest = {
      postId: BigInt(articleId).toString(),
      imgUrl: file.url,
    };
    removePostImgUsingPOST(params).then((res) => {
      return res.data;
    });
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );
  const headers = {};
  const tokenName = localStorage.getItem('tokenName');
  const tokenValue = localStorage.getItem('tokenValue');
  if (tokenName && tokenValue) {
    headers[tokenName] = tokenValue;
  }
  const props: UploadProps = {
    accept: 'image/png, image/jpeg',
    action: 'https://qingxin.store/wanwu/wanwu-usercenter/api/file/minio/upload',
    listType: 'picture-card',
    fileList,
    onPreview: handlePreview,
    onChange: handleChange,
    headers: headers,
    data: async (file) => {
      const ext = file.name
      // const res = await policyUsingGET();
      return {
        key: ext,
      };
    },
  };

  //暴露的方法
  useImperativeHandle(ref, () => ({
    createArticle: () => {
      if (!currentUser) {
        message.error('请先登录');
        return;
      }
      //首先进行参数的校验
      form
        .validateFields()
        .then(async (values) => {
          //首先向服务器发送请求建立文章
          const params: API.PostAddRequest = {
            ...values,
            tags: tags,
            content: '作者尚未填写🌈',
            imgList: fileList.filter((file) => StringUtils.isNotEmpty(file.response))
              .map(
                (file) => `${file.response.data}`,
              ),
          };

          const res = await addPostUsingPOST(params);
          message.success('创建成功！');
          //跳转至编辑界面
          history.push(`/note/edit/${res.data}`);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateSettings: () => {
      if (!currentUser) {
        message.error('请先登录');
        return;
      }
      if (!articleId) {
        return;
      }

      //首先进行参数的校验
      form
        .validateFields()
        .then(async (values) => {
          //首先向服务器发送请求建立文章
          const params: API.PostEditRequest = {
            ...values,
            // content?: string;
            id: BigInt(articleId).toString(),
            tags: tags,
            // synopsis?: string;
            // tags?: string[];
            // title?: string;
            // tags: selectedIds,
            imgList: fileList.filter((file) => StringUtils.isNotEmpty(file.response))
              .map(
              (file) => `${file.response.data}`,
            ),
          };
          const res = await editPostUsingPOST(params);
          if (res.data) {
            message.success('更新成功！');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }));
  //标签配置
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue('');
  };

  const tagInputStyle: React.CSSProperties = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: 'top',
  };

  const tagPlusStyle: React.CSSProperties = {
    borderRadius: 8,
    height: 22,
    background: '#FFA768',
    borderStyle: 'dashed',
  };

  return (
    <Card bordered={true} style={{ borderRadius: 8 }}>
      <div>
        <Form form={form} initialValues={{ isTop: '0', closeComment: '0' }} {...layout}>
          <FormItem
            label="文章标题"
            name="title"
            rules={[{ required: true, message: '文章标题必须填写！' }]}
          >
            <Input placeholder="给你的文章起一个清晰明了的标题" />
          </FormItem>

          <FormItem
            label="文章摘要"
            name="synopsis"
            rules={[{ validator: checksynopsis }]}
            required={true}
          >
            <TextArea placeholder="请输入文章摘要" rows={3} />
          </FormItem>

          <FormItem label="标签">
            {tags.map((tag, index) => {
              if (editInputIndex === index) {
                return (
                  <Input
                    ref={editInputRef}
                    key={tag}
                    style={tagInputStyle}
                    value={editInputValue}
                    onChange={handleEditInputChange}
                    onBlur={handleEditInputConfirm}
                    onPressEnter={handleEditInputConfirm}
                  />
                );
              }
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag
                  key={tag}
                  closable={true}
                  style={{ userSelect: 'none', marginBottom: 8 }}
                  onClose={() => handleClose(tag)}
                >
                  <span
                    onDoubleClick={(e) => {
                      if (index !== 0) {
                        setEditInputIndex(index);
                        setEditInputValue(tag);
                        e.preventDefault();
                      }
                    }}
                  >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </span>
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              );
            })}
            {inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                style={tagInputStyle}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            ) : (
              <Tag style={tagPlusStyle} onClick={showInput}>
                <PlusOutlined /> 创建标签
              </Tag>
            )}
          </FormItem>

          <FormItem name="isTop" label="置顶">
            <Radio.Group>
              <Radio value={'0'}>否</Radio>
              <Radio value={'1'}>是</Radio>
            </Radio.Group>
          </FormItem>

          <FormItem name="closeComment" label="关闭评论">
            <Radio.Group>
              <Radio value={'0'}>否</Radio>
              <Radio value={'1'}>是</Radio>
            </Radio.Group>
          </FormItem>

          <FormItem label="缩略图">
            <Upload {...props} onRemove={removeImg}>
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </FormItem>
        </Form>
      </div>

      <Modal
        centered={true}
        open={visible}
        title={<div style={{ fontWeight: 600, fontSize: 16, textAlign: 'center' }}>添加标签</div>}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      >
        <Divider />
        <FormItem label="已选标签" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <div>
            <Card style={{ width: 400, height: 86 }} bodyStyle={{ padding: 8 }} />
          </div>
        </FormItem>
      </Modal>
    </Card>
  );
});

export default Step1;

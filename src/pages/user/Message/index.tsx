import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, message, Modal, Row, Tabs, Tag } from 'antd';
import { CheckOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import TextArea from 'antd/es/input/TextArea';

import AvatarView from '@/pages/user/Message/components/AvatarView';

import { updateMyUserUsingPOST } from '@/services/user/userController';
import { addTagUsingPOST, getAllTagsUsingGET } from '@/services/user/userTagController';
import { StringUtils } from '@/utils';
import FormItem from 'antd/es/form/FormItem';
import TabPane = Tabs.TabPane;

const Message: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [currentUser, setCurrentUser] = useState(initialState?.currentUser);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState('0');
  const [editingTab, setEditingTab] = useState(0);
  const [tagInputVisible, setTagInputVisible] = useState(false);
  const [tagInputValue, setTagInputValue] = useState('');
  const [allCategory, setAllCategory] = useState<API.UserTagCategoryVo[] | undefined>(undefined);
  const inputRef = useRef(null);

  const [selectedIds, setSelectedIds] = useState(() => {
    if (currentUser && currentUser.tags && currentUser.tags.length > 0) {
      return currentUser.tags.map((tag) => tag.id);
    }
    return [];
  });
  useEffect(() => {
    async function fetchCategoryData() {
      return await getAllTagsUsingGET();
    }

    fetchCategoryData().then((res) => {
      setAllCategory(res.data);
      // @ts-ignore
      setCurrentTab(res.data[0]?.id as any);
    });
  }, []);

  const changeTab = (activeKey: string) => {
    setCurrentTab(activeKey);
  };

  const handleInputChange = (e: any) => {
    setTagInputValue(e.target.value);
  };

  const handleTagInputConfirm = async (index: number) => {
    //当输入标签的长度不符合规范
    if (tagInputValue.length > 8) {
      message.error('标签最长8个字');
      return;
    }
    //当输入的标签值不为空才进行添加
    if (StringUtils.isNotEmpty(tagInputValue) && currentUser) {
      const param: API.UserTagAddRequest = {
        parentId: Number(currentTab),
        name: tagInputValue,
      };
      const res = await addTagUsingPOST(param);
      //添加标签成功
      message.success('添加自定义标签成功');
      if (allCategory) {
        // @ts-ignore
        allCategory[index]?.tags.push(res.data as API.UserTagVo);
      }
      // @ts-ignore
      setAllCategory([...allCategory]);
    }
    setTagInputVisible(false);
    setTagInputValue('');
  };

  useEffect(() => {
    if (tagInputVisible) {
      // @ts-ignore
      inputRef.current?.focus();
    }
  }, [tagInputVisible, editingTab]);

  const showTagInput = (tabKey: number) => {
    setTagInputVisible(true);
    setEditingTab(tabKey);
  };

  const addTagToUser = (tag: API.UserVO) => {
    if (selectedIds && selectedIds.length && selectedIds.length >= 10) {
      message.error('每个用户至多选择10个标签');
    } else {
      if (currentUser) {
        setCurrentUser({ ...currentUser, tags: [...(currentUser?.tags || []), tag] });
        setSelectedIds([...(selectedIds || []), tag.id]);
      }
    }
  };

  const handleTagClose = (tag: API.UserTagVo) => {
    setSelectedIds(selectedIds?.filter((tagId) => tagId !== tag.id));
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        tags: currentUser?.tags?.filter((selectedTag) => selectedTag.id !== tag.id),
      });
    }
  };

  const updateInfo = async () => {
    if (!currentUser) return;
    const params: API.UserUpdateMyRequest = {
      userName: form.getFieldValue('userName'),
      userProfile: form.getFieldValue('userProfile'),
      userAvatar: currentUser?.userAvatar,
      tags: selectedIds as [],
    };
    const res = await updateMyUserUsingPOST(params);
    if (res) {
      message.success('更新成功');
      setInitialState({ ...initialState, currentUser: currentUser });
    }
  };

  // @ts-ignore
  return (
    <Card
      bodyStyle={{ padding: '50px 0' }}
      style={{ borderRadius: 8, marginTop: 40, width: 1180, margin: 'auto' }}
    >
      <div>
        {!initialState?.loading && (
          <Row>
            <Col span={14} style={{ margin: 'auto' }}>
              <Form layout="vertical" form={form} initialValues={{ ...currentUser }}>
                <Form.Item
                  label="昵称"
                  name="userName"
                  rules={[{ required: true, message: '请输入您的昵称!' }]}
                >
                  <Input style={{ borderRadius: 8 }} placeholder="请输入昵称" />
                </Form.Item>
                <Form.Item label="个性签名" name="userProfile">
                  <TextArea style={{ borderRadius: 8 }} placeholder="请输入个性签名" rows={3} />
                </Form.Item>
                <Form.Item label="标签">
                  <div>
                    {currentUser?.tags?.map((tag) => (
                      <Tag key={tag.id} color={tag.color}>
                        {tag.name}
                      </Tag>
                    ))}
                    <Tag
                      onClick={() => {
                        setVisible(true);
                      }}
                      style={{ background: '#fff', borderStyle: 'dashed', borderRadius: 8 }}
                    >
                      <EditOutlined />
                      编辑
                    </Tag>
                  </div>
                </Form.Item>
              </Form>
              <Button onClick={updateInfo} type="primary">
                更新基本信息
              </Button>
            </Col>
            {/*<Col span={3}/>*/}
            <Col span={6}>
              <AvatarView
                avatar={currentUser?.userAvatar || ''}
                onSave={(newAvatar: string) => {
                  if (currentUser) {
                    setCurrentUser({ ...currentUser, userAvatar: newAvatar });
                  }
                }}
              />
            </Col>
          </Row>
        )}

        <Modal
          style={{ borderRadius: 8 }}
          centered={true}
          open={visible}
          title="添加标签"
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
        >
          <Divider />
          <FormItem label="我的标签" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <div>
              <Card style={{ width: 400, height: 86 }} bodyStyle={{ padding: 8 }}>
                {currentUser?.tags?.map((tag) => (
                  <Tag
                    key={tag.id}
                    color={tag.color}
                    closable
                    onClose={() => handleTagClose(tag)}
                    style={{ marginBottom: 10 }}
                  >
                    {tag.name}
                  </Tag>
                ))}
              </Card>
            </div>
          </FormItem>
          <Tabs onChange={changeTab} activeKey={String(currentTab)} tabPosition="left">
            {allCategory?.map((category, index) => (
              <TabPane key={category.id} tab={category.name}>
                {category.tags?.map(
                  (tag) =>
                    (selectedIds?.includes(tag.id) && (
                      <Tag
                        style={{ cursor: 'pointer', marginBottom: 10, borderRadius: 8 }}
                        color="#f50"
                        key={tag.id}
                        onClick={() => handleTagClose(tag)}
                      >
                        {tag.name}
                        <CheckOutlined />
                      </Tag>
                    )) || (
                      <Tag
                        style={{ cursor: 'pointer', marginBottom: 10, borderRadius: 8 }}
                        key={tag.id}
                        onClick={() => {
                          addTagToUser(tag);
                        }}
                      >
                        {tag.name}
                      </Tag>
                    ),
                )}
                {(tagInputVisible && category.id === editingTab && (
                  <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={tagInputValue}
                    onChange={handleInputChange}
                    onBlur={() => handleTagInputConfirm(index)}
                    onPressEnter={() => handleTagInputConfirm(index)}
                  />
                )) || (
                  <Tag
                    onClick={() => showTagInput(category.id as number)}
                    style={{ background: '#fff', borderStyle: 'dashed', borderRadius: 8 }}
                  >
                    <PlusOutlined />
                    添加
                  </Tag>
                )}
              </TabPane>
            ))}
          </Tabs>
        </Modal>
      </div>
    </Card>
  );
};

export default Message;

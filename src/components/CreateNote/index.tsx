import type { MenuProps } from 'antd';
import { Button, Dropdown, message } from 'antd';
import React from 'react';
import { FileTextOutlined, PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { history, useModel } from 'umi';

const CreateNote: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (currentUser) {
              history.push('/note/create');
            } else {
              message.info('请先登录');
            }
          }}
        >
          写笔记
        </a>
      ),
      icon: <FileTextOutlined />,
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={() => message.info('功能待完善')}>
          去提问
        </a>
      ),
      icon: <QuestionCircleOutlined />,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottom">
      <Button
        style={{ borderRadius: 8 }}
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={(e) => e.preventDefault()}
      >
        发布
      </Button>
      {/*<button  onClick={e => e.preventDefault()} >*/}
      {/*  <PlusCircleOutlined/> 发布*/}
      {/*</button>*/}
      {/*<a onClick={e => e.preventDefault()}>*/}
      {/*    */}
      {/*</a>*/}
    </Dropdown>
  );
};
export default CreateNote;

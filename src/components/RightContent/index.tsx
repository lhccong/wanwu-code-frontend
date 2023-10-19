import {Button, Input, Space} from 'antd';
import React from 'react';
import {useModel} from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import {css} from '@emotion/css';
import CreateNote from '@/components/CreateNote';
import MessageList from "@/components/MessageList";
import History from "@/components/History";
import {history} from "@@/core/history";
import Tooltip from 'antd/es/tooltip';
import {SearchOutlined} from "@ant-design/icons";

export type SiderTheme = 'light' | 'dark';
const GlobalHeaderRight: React.FC = () => {
  const {initialState} = useModel('@@initialState');
  if (!initialState || !initialState.settings) {
    return null;
  }
  const {navTheme, layout} = initialState.settings;
  let className = styles.right;
  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  const actionClassName = css`
    display: flex;
    align-items: center;
    height: 48px;
    margin-left: auto;
    overflow: hidden;
    //padding: 0 12px;
    gap: 0px;
    cursor: pointer;
    transition: all 0.3s;
    margin: 0px;
    border-radius: 8px;

    &:hover {
      //background-color: #96ccff;
    }
  `;
  return (
    <Space className={className}>
      {/*<Input*/}
      {/*  placeholder="搜你所想🔍"*/}
      {/*  allowClear*/}
      {/*  onClick={() => history.push(`/search`)}*/}
      {/*  style={{*/}
      {/*    borderRadius: 20,*/}
      {/*    width: 320,*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<Tooltip title="search">*/}
      <Button style={{borderRadius:8}} type="primary" onClick={() => history.push(`/search`)} icon={<SearchOutlined />} >搜你所想🔍</Button>
      {/*</Tooltip>*/}
      <span className={actionClassName}>
        <Avatar/>
      </span>
      <History/>
      <MessageList/>
      <span style={{marginLeft: 10}}>
        <CreateNote />
      </span>
      {/*<span className={actionClassName}>*/}
      {/*  <CreateNote />*/}
      {/*</span>*/}
      {/*<span className={actionClassName}>*/}

      {/*</span>*/}
      {/*<span className={actionClassName}>*/}
      {/*<MessageList/>*/}

      {/*</span>*/}
      <span style={{marginRight: 40}}/>
    </Space>
  );
};
export default GlobalHeaderRight;

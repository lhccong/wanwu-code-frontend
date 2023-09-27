import React, {useRef} from 'react';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {Image, message} from "antd";
import {deleteUserUsingPOST, listUserByPageUsingPOST, updateUserUsingPOST} from "@/services/user/userController";


const App: React.FC = () => {
  const columns: ProColumns<API.User>[] = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      copyable: true,
    },
    {
      title: '用户账户',
      dataIndex: 'userAccount',
      copyable: true,
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      render: (_, record) => (
        <div>
          <Image src={record.userAvatar} width={100}/>
        </div>
      ),
    },
    {
      title: 'unionId',
      dataIndex: 'mpOpenId',
      copyable: true,

    },
    {
      title: '开放平台id',
      dataIndex: 'unionId',
      copyable: true,
    },
    {
      title: '状态',
      dataIndex: 'isDelete',
    },
    {
      title: '用户标签',
      dataIndex: 'tags',
      render: (_, record) => (
        <div>
          {record.tags}
        </div>
      ),
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      valueType: 'select',
      valueEnum: {
        "user": { text: '普通用户', status: 'Default' },
        "admin": {
          text: '管理员',
          status: 'Success',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id as any);
          }}
        >
          编辑
        </a>,
        <a href={record.userAvatar} target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>
      ],
    },
  ];

  const actionRef = useRef<ActionType>();

  return (
    <ProTable<API.User>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        const userList = await listUserByPageUsingPOST(params);
        return {
          data: userList.data?.records,
          total: userList.data?.total
        }
      }}
      editable={{
        type: 'multiple',
        onDelete: async (rowKey, data) => {
          const deleteRequest: API.DeleteRequest = {
            id: data.id
          };
          deleteUserUsingPOST(deleteRequest).then(res => {
            if (res.code === 0) {
              message.success('删除成功');
              // window.location.reload();
            }
          })
        },
        onSave: async (rowKey, newData, oldData) => {
          console.log(rowKey, newData, oldData);
          //保存时触发 rowKey是每行数据的id,newData是新填写的数据,oldData是老数据，依据业务需求向后台传参。
          updateUserUsingPOST(newData).then(res => {
            if (res.code === 0) {
              message.success('修改成功');
            }
          })
        }
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
    />
  );

};
export default App;

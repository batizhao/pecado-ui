import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Modal, Dropdown, Menu, Switch } from 'antd';
import React, { useState, useRef, ReactText, FC } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import OperationModal from './components/OperationModal';
import { UserListItem, UserListParams } from './data';
import { removeUser, queryUser, addOrUpdateUser, lockUser, unLockUser, handleAddUserRoles } from './service';
import { findDOMNode } from 'react-dom';
import RoleForm from './components/RoleForm';
import { queryRoleByUserId } from '../role/service';

  /**
 * 添加
 * @param fields
 */
const handleAddOrUpdate = async (fields: UserListItem) => {
  const hide = message.loading('正在保存...');
  try {
    await addOrUpdateUser({ ...fields });
    hide();
    message.success('保存成功！');
    return true;
  } catch (error) {
    hide();
    message.error('保存失败，请重试！');
    return false;
  }
};

/**
 *  删除
 * @param selectedRows
 */
const handleRemove = async (selectedRows: UserListItem[]) => {
  const hide = message.loading('正在删除...');
  if (!selectedRows) return true;
  try {
    await removeUser({
      id: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功！');
    return true;
  } catch (error) {    
    hide();
    message.error('删除失败，请重试！');
    return false;
  }
};

/**
 * 启用/禁用
 * @param selectedRows
 * @param locked
 */
const handleLockUser = async (selectedRows: UserListItem, locked: number) => {
  const hide = message.loading('正在执行...');
  if (!selectedRows) return true;
  try {
    locked === 1 ? await lockUser({id: selectedRows.id}) : await unLockUser({id: selectedRows.id});
    hide();
    // message.success('执行成功！');
    return true;
  } catch (error) {    
    hide();
    message.error('执行失败，请重试！');
    return false;
  }
};

/**
 *  获取用户角色
 * @param userId
 */
const fetchRoleData = async (userId: number) => {
  try {
    const result = await queryRoleByUserId(userId);
    const data = result.data;
    const value = data.map((row: { id: string; }) => row.id);
    return value;
  } catch (error) {
    message.error('加载失败，请重试！');    
    return false;
  }
};

const TableList: FC = () => {
  const addBtn = useRef(null);
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<Partial<UserListItem> | undefined>(undefined);
  const [selectedRowsState, setSelectedRows] = useState<UserListItem[]>([]);
  const [roleModalVisible, setRoleModalVisible] = useState<boolean>(false);
  const [roleValues, setRoleValues] = useState<string[]>([]);
  const [userId, setUserId] = useState<number>(0);

  const fetchData = async (fields: UserListParams) => {
    const result = await queryUser({ ...fields });
    return {
      data: result.data.records,
      total: result.data.total,
      current: result.data.current,
    }
  }

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: 10
  };

  const showEditModal = (item: UserListItem) => {
    setVisible(true);
    setCurrentData(item);
  };

  const showModal = () => {
    setVisible(true);
    setCurrentData(undefined);
  };  

  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
    setCurrentData(undefined);
  };

  const handleSubmit = async (values: UserListItem) => {
    setAddBtnblur();
    const success = await handleAddOrUpdate(values);
    if (success) {
      setVisible(false);
      actionRef.current?.reload();
    }
  };

  const showRoleModal = async (id: number) => {
    setRoleModalVisible(true);
    setUserId(id);
    fetchRoleData(id).then(result => setRoleValues(result));
  }

  const handleRoleCancel = () => {
    setAddBtnblur();
    setRoleModalVisible(false);
  };

  const handleRoleSubmit = async (id: number, roles: string[]) => {
    handleAddUserRoles(id, roles).then(() => setRoleModalVisible(false));
  };

  const editAndDelete = async (key: ReactText, currentItem: UserListItem) => {
    if (key === 'role') {
      showRoleModal(currentItem.id);
    } else if (key === 'delete') {
      Modal.confirm({
        title: '删除用户',
        content: `确定删除用户 ${currentItem.name} 吗？`,
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          const success = await handleRemove([currentItem]);
          if (success) {
            actionRef.current?.reload();
          }
        }
      });
    }
  };

  //启用禁用用户
  const toggleStatus = async (checked: any, record: UserListItem) => {
    const status = checked ? 0 : 1;
    await handleLockUser(record, status);
  };

  const MoreBtn: React.FC<{
    item: UserListItem;
  }> = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="role">分配角色</Menu.Item>
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );

  const columns: ProColumns<UserListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',  
    },
    {
      title: '状态',
      dataIndex: 'locked',
      hideInForm: true,
      valueEnum: {
        0: { text: '正常'},
        1: { text: '禁用'},
      },
      render: (text, record) => (
          <Switch checkedChildren='开' unCheckedChildren='关'
                  defaultChecked={record.locked === 0 ? true : false} 
                  onChange={(checked) => toggleStatus(checked, record)} />
      ),
    },
    {
      title: '注册时间',
      dataIndex: 'createdTime',
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const locked = form.getFieldValue('locked');
        if (`${locked}` === '0') {
          return false;
        }
        if (`${locked}` === '1') {
          return <Input {...rest} placeholder="请输入禁用原因！" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={(e) => {
              e.preventDefault();
              showEditModal(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <MoreBtn key="more" item={record} />
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<UserListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={showModal} ref={addBtn}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        pagination={paginationProps}
        request={fetchData}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Button type="dashed" danger
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reload();
            }}
          >
            批量删除
          </Button>
          {/* <Button>批量禁用</Button> */}
        </FooterToolbar>
      )}

      <OperationModal
        current={currentData}
        visible={visible}
        handleOk={handleSubmit}
        handleCancel={handleCancel}
      />

      <RoleForm
        handleOk={handleRoleSubmit}
        handleCancel={handleRoleCancel}
        visible={roleModalVisible}
        values={roleValues}
        id={userId}
      />
    </PageContainer>
  );
};

export default TableList;
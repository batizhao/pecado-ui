import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Modal, Dropdown, Menu } from 'antd';
import React, { useState, useRef, ReactText } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import MenuForm from './components/MenuForm';
import { TableListItem } from './data';
import { queryRole, addOrUpdateRole, removeRole } from './service';
import { fetchByRoleId } from '@/services/menu';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addOrUpdateRole({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: TableListItem) => {
  const hide = message.loading('正在编辑');
  try {
    await addOrUpdateRole({ ...fields });
    hide();
    message.success('编辑成功');
    return true;
  } catch (error) {
    hide();
    message.error('编辑失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRole({
      id: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {    
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

/**
 *  获取角色默认菜单
 * @param roleId
 */
const fetchRoleMenuData = async (roleId: number) => {
  try {
    const result = await fetchByRoleId(roleId);
    const data = result.data;
    const value = data.map((row: { permission: string; }) => row.permission);
    return value;
  } catch (error) {
    message.error('加载失败，请重试');    
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [menuModalVisible, handleMenuModalVisible] = useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  const showEditModal = (item: TableListItem) => {
    handleUpdateModalVisible(true);
    setUpdateFormValues(item);
  };

  const showMenuModal = async (id: number) => {
    handleMenuModalVisible(true);
    fetchRoleMenuData(id).then(result => setCheckedValues(result));
  };

  const fetchData = async () => {
    const result = await queryRole();
    return {
      data: result.data,
    }
  }

  const editAndDelete = (key: ReactText, currentItem: TableListItem) => {
    if (key === 'menu') showMenuModal(currentItem.id);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除角色',
        content: `确定删除角色 ${currentItem.name} 吗？`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          handleRemove([currentItem]);
          actionRef.current?.reloadAndRest;
        }
      });
    }
  };

  const MoreBtn: React.FC<{
    item: TableListItem;
  }> = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="menu">分配权限</Menu.Item>
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      rules: [
        {
          required: true,
          message: '名称为必填项',
        },
      ],
    },
    {
      title: '代码',
      dataIndex: 'code',
      rules: [
        {
          required: true,
          message: '代码为必填项',
        },
      ],
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
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
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={fetchData}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        pagination={false}
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
              actionRef.current?.reloadAndRest;
            }}
          >
            批量删除
          </Button>
          <Button>批量禁用</Button>
        </FooterToolbar>
      )}

      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reloadAndRest;
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
      {updateFormValues && Object.keys(updateFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value as TableListItem);
            if (success) {
              handleUpdateModalVisible(false);
              setUpdateFormValues({});
              if (actionRef.current) {
                actionRef.current.reloadAndRest;
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            // setUpdateFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={updateFormValues}
        />
      ) : null}
      {/* {checkedValues ? ( */}
        <MenuForm
          onSubmit={async (value) => {
            const success = await fetchRoleMenuData(1);
            if (success) {
              handleMenuModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reloadAndRest;
              }
            }
          }}
          onCancel={() => {
            handleMenuModalVisible(false);
            // setCheckedValues([]);
          }}
          modalVisible={menuModalVisible}
          values={checkedValues}
        />
      {/* ) : null} */}
    </PageContainer>
  );
};

export default TableList;

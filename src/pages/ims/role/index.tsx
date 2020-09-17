import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Modal, Dropdown, Menu } from 'antd';
import React, { useState, useRef, ReactText, FC } from 'react';
import { findDOMNode } from 'react-dom';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import MenuModal from './components/MenuModal';
import OperationModal from './components/OperationModal';
import { RoleListItem, RoleListParams } from './data';
import { queryRole, addOrUpdateRole, removeRole, handleAddRoleMenus } from './service';
import { fetchByRoleId } from '@/services/menu';

/**
 * 添加节点
 * @param fields
 */
const handleAddOrUpdate = async (fields: RoleListItem) => {
  const hide = message.loading('正在保存...');
  try {
    await addOrUpdateRole({ ...fields });
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
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: RoleListItem[]) => {
  const hide = message.loading('正在删除...');
  if (!selectedRows) return true;
  try {
    await removeRole({
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
 *  获取角色默认菜单
 * @param roleId
 */
const fetchRoleMenuData = async (roleId: number) => {
  try {
    const result = await fetchByRoleId(roleId);
    const data = result.data;
    const value = data.map((row: { id: number; }) => row.id + '');
    console.log(value);
    return value;
  } catch (error) {
    message.error('加载失败，请重试！');    
    return false;
  }
};

const TableList: FC<{}> = () => {
  const addBtn = useRef(null);
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<Partial<RoleListItem> | undefined>(undefined);
  const [menuModalVisible, setMenuModalVisible] = useState<boolean>(false);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [selectedRowsState, setSelectedRows] = useState<RoleListItem[]>([]);
  const [roleId, setRoleId] = useState<number>(0);

  const fetchData = async (fields: RoleListParams) => {
    const result = await queryRole({ ...fields });
    return {
      data: result.data,
    }
  }

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: 10
  };

  const showEditModal = (item: RoleListItem) => {
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

  const handleSubmit = async (values: RoleListItem) => {
    setAddBtnblur();
    const success = await handleAddOrUpdate(values);
    if (success) {
      setVisible(false);
      actionRef.current?.reload();
    }
  };

  const showMenuModal = async (id: number) => {
    setMenuModalVisible(true);
    setRoleId(id);
    fetchRoleMenuData(id).then(result => setCheckedValues(result));
  }

  const handleMenuCancel = () => {
    setAddBtnblur();
    setMenuModalVisible(false);
  };

  const handleMenuSubmit = async (id: number, menus: string[]) => {
    handleAddRoleMenus(id, menus).then(() => setMenuModalVisible(false));
  };

  const editAndDelete = (key: ReactText, currentItem: RoleListItem) => {
    if (key === 'menu') showMenuModal(currentItem.id);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除角色',
        content: `确定删除角色 ${currentItem.name} 吗？`,
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

  const MoreBtn: React.FC<{
    item: RoleListItem;
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

  const columns: ProColumns<RoleListItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '代码',
      dataIndex: 'code',
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
      <ProTable<RoleListItem>
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
      
      {checkedValues ? (
        <MenuModal
          handleOk={handleMenuSubmit}
          handleCancel={handleMenuCancel}
          visible={menuModalVisible}
          values={checkedValues}
          id={roleId}
        />
      ) : null}
    </PageContainer>
  );
};

export default TableList;

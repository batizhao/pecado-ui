import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Modal, Dropdown, Menu } from 'antd';
import React, { useState, useRef, ReactText, FC } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import OperationModal from './components/OperationModal';
import { TableListItem, TableListParams } from './data';
import { removeUser, queryUser, addOrUpdateUser } from './service';
import { findDOMNode } from 'react-dom';

  /**
 * 添加节点
 * @param fields
 */
const handleAddOrUpdate = async (fields: TableListItem) => {
  const hide = message.loading('正在保存');
  try {
    await addOrUpdateUser({ ...fields });
    hide();
    message.success('保存成功');
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
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeUser({
      id: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {    
    hide();
    message.error('删除失败，请重试！');
    return false;
  }
};

const TableList: FC = () => {
  const addBtn = useRef(null);
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<Partial<TableListItem> | undefined>(undefined);
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  const fetchData = async (fields: TableListParams) => {
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

  const showEditModal = (item: TableListItem) => {
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

  const handleSubmit = async (values: TableListItem) => {
    setAddBtnblur();
    const success = await handleAddOrUpdate(values);
    if (success) {
      setVisible(false);
      actionRef.current?.reload();
    }
  };

  const editAndDelete = (key: ReactText, currentItem: TableListItem) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
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

  const MoreBtn: React.FC<{
    item: TableListItem;
  }> = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="edit">编辑</Menu.Item>
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
      title: '姓名',
      dataIndex: 'name',
      rules: [
        {
          required: true,
          message: '姓名为必填项',
        },
      ],
    },
    {
      title: '用户名',
      dataIndex: 'username',
      rules: [
        {
          required: true,
          message: '用户名为必填项',
        },
      ],
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      rules: [
        {
          required: true,
          type: 'email',
          message: '邮箱为必填项',
        },
      ],    
    },
    {
      title: '状态',
      dataIndex: 'locked',
      hideInForm: true,
      valueEnum: {
        0: { text: '正常', status: 'Success' },
        1: { text: '禁用', status: 'Error' },
      },
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
      <ProTable<TableListItem>
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
              actionRef.current?.reloadAndRest;
            }}
          >
            批量删除
          </Button>
          <Button>批量禁用</Button>
        </FooterToolbar>
      )}

      <OperationModal
        current={currentData}
        visible={visible}
        handleOk={handleSubmit}
        handleCancel={handleCancel}

      />
    </PageContainer>
  );
};

export default TableList;
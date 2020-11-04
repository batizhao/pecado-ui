import { PlusOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, Modal, Switch } from 'antd';
import React, { FC, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import OperationModal from './components/OperationModal';
import { DsListItem, DsListParams } from './data';
import { addOrUpdateDs, lockDs, queryDss, removeDs, unLockDs } from './service';


const TableList: FC = () => {
  const addBtn = useRef(null);
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<Partial<DsListItem> | undefined>(undefined);
  const [selectedRowsState, setSelectedRows] = useState<DsListItem[]>([]);

  const fetchData = async (fields: DsListParams) => {
    const result = await queryDss({ ...fields });
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

  const showEditModal = (item: DsListItem) => {
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

  const handleSubmit = async (values: DsListItem) => {
    setAddBtnblur();
    const result = await addOrUpdateDs(values);
    if (result.code === 0) {
      setVisible(false);
      actionRef.current?.reload();
    }
  };


  const handleDelete = async (currentItem: DsListItem) => {
    Modal.confirm({
      title: '删除数据源',
      content: `确定删除数据源 ${currentItem.name} 吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await removeDs([currentItem].map((row) => row.id)).then(() => actionRef.current?.reload());
      }
    });
  };

  //启用禁用用户
  const toggleStatus = async (checked: any, record: DsListItem) => {
    checked ? await unLockDs(record.id) : await lockDs(record.id);
  };

  // const MoreBtn: React.FC<{
  //   item: DsListItem;
  // }> = ({ item }) => (
  //   <Dropdown
  //     overlay={
  //       <Menu onClick={({ key }) => editAndDelete(key, item)}>
  //         <Menu.Item key="role">分配角色</Menu.Item>
  //         <Menu.Item key="delete">删除</Menu.Item>
  //       </Menu>
  //     }
  //   >
  //     <a>
  //       更多 <DownOutlined />
  //     </a>
  //   </Dropdown>
  // );

  const columns: ProColumns<DsListItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: 'url',
      dataIndex: 'url',
      ellipsis: true,
      copyable: true,
      hideInSearch: true,
      width: '40%',  
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: '正常'},
        1: { text: '禁用'},
      },
      render: (text, record) => (
          <Switch checkedChildren='开' unCheckedChildren='关'
                  defaultChecked={record.status === 0 ? true : false} 
                  onChange={(checked) => toggleStatus(checked, record)} />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
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
          <a
            onClick={(e) => {
              e.preventDefault();
              handleDelete(record);
            }}
          >
             删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<DsListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={showModal} ref={addBtn}>
            新建
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
              await removeDs(selectedRowsState.map((row) => row.id)).then(() => {
                setSelectedRows([]);
                actionRef.current?.reload();
              });
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
    </PageContainer>
  );
};

export default TableList;
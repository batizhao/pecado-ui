import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import React, { FC, useRef, useState } from 'react';
import OperationModal from './components/OperationModal';
import { GenConfigItem, GenConfigParams } from './data';
import { generateCode, queryTables } from './service';

const TableList: FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<Partial<GenConfigItem> | undefined>(undefined);

  const fetchData = async (fields: GenConfigParams) => {
    const result = await queryTables({ ...fields });
    return {
      data: result.data.records,
      total: result.data.total,
      current: result.data.current,
    };
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: 10,
  };

  const showModal = (item: GenConfigItem) => {
    setVisible(true);
    setCurrentData(item);
  };

  const handleCancel = () => {
    setVisible(false);
    setCurrentData(undefined);
  };

  const handleSubmit = async (values: GenConfigItem) => {
    await generateCode(values);
  };

  const columns: ProColumns<GenConfigItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 80,
    },
    {
      title: '数据源',
      dataIndex: 'dsName',
      initialValue: 'master',
      filters: true,
      valueType: 'select',
      request: async () => [
        {
          label: 'master',
          value: 'master',
          status: 'Default',
        },
        {
          label: 'ims',
          value: 'ims',
          status: 'Error',
        },
        {
          label: 'system',
          value: 'system',
          status: 'Success',
        },
      ],
    },
    {
      title: '表名',
      dataIndex: 'tableName',
    },
    {
      title: '表说明',
      dataIndex: 'tableComment',
      hideInSearch: true,
    },
    {
      title: '字符集',
      dataIndex: 'tableCollation',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
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
              showModal(record);
            }}
          >
            生成代码
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<GenConfigItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        pagination={paginationProps}
        request={fetchData}
        columns={columns}
        search={{
          filterType: 'light',
        }}
      />

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

import React, { FC, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { TableListItem } from '../data.d';
import styles from '../style.less';

interface OperationModalProps {
  visible: boolean;
  current: Partial<TableListItem> | undefined;
  handleOk: (values: TableListItem) => void;
  handleCancel: () => void;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { 
    visible, 
    current, 
    handleOk,
    handleCancel, 
  } = props;

  const [form] = Form.useForm();
  const FormItem = Form.Item;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
      });
    }
  }, [current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (handleOk) {
      handleOk(values as TableListItem);
    }
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel: handleCancel };

  const getModalContent = () => {
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <FormItem name="id" hidden={true} />
        <FormItem
          name="name"
          label="名称"
          rules={[{ required: true, message: '请输入名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="code"
          label="代码"
          rules={[{ required: true, message: '请输入代码！'}]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="description"
          label="说明"
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    );
  };

  return (
    <Modal
      title={`${current ? '编辑' : '添加'}角色`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={{ padding: '28px 0 0' }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;

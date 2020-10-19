import React, { FC, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { UserListItem } from '../data.d';
import styles from '../style.less';

interface OperationModalProps {
  visible: boolean;
  current: Partial<UserListItem> | undefined;
  handleOk: (values: UserListItem) => void;
  handleCancel: () => void;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { visible, current, handleOk, handleCancel } = props;

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
      handleOk(values as UserListItem);
    }
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel: handleCancel };

  const getModalContent = () => {
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <FormItem name="id" hidden={true} />
        <FormItem name="name" label="姓名" rules={[{ required: true, message: '请输入姓名！' }]}>
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="email"
          label="邮箱"
          rules={[{ required: true, message: '请输入邮箱！', type: 'email' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    );
  };

  return (
    <Modal
      title={`${current ? '编辑' : '添加'}用户`}
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

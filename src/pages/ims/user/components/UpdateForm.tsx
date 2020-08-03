import React, { useState, useEffect } from 'react';
import { Form, Modal, Input } from 'antd';
import { TableListItem } from '../data';

interface UpdateFormProps {
  onCancel: (formVals?: Partial<TableListItem>) => void;
  onSubmit: (values: Partial<TableListItem>) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const [formVals, setFormVals] = useState<Partial<TableListItem>>({
    id: props.values.id,
    name: props.values.name,
    username: props.values.username,
    email: props.values.email,
  });

  useEffect(() => {
    if (values) {
      form.setFieldsValue({
        ...values,
      });
    }
  }, [props.values]);

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });
    handleUpdate({ ...formVals, ...fieldsValue });
  };

  const [form] = Form.useForm();
  const FormItem = Form.Item;

  const renderContent = () => {
    return (
      <Form
        form={form}
      >
        <FormItem
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名！'}]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="email"
          label="邮箱"
          rules={[{ required: true, message: '请输入邮箱！'}]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    );
  }

  return (
    <Modal
      destroyOnClose
      title="编辑用户"
      visible={updateModalVisible}
      onOk={() => handleSubmit()}
      onCancel={() => handleUpdateModalVisible()}
    >
      {renderContent()}
    </Modal>
  );
};

export default UpdateForm;

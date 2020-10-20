import React, { FC, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { DsListItem } from '../data.d';
import styles from '../style.less';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

interface OperationModalProps {
  visible: boolean;
  current: Partial<DsListItem> | undefined;
  handleOk: (values: DsListItem) => void;
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
      handleOk(values as DsListItem);
    }
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel: handleCancel };

  const getModalContent = () => {
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <FormItem name="id" hidden={true} />
        <FormItem name="name" label="名称" rules={[{ required: true, message: '请输入名称！' }]}>
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
          name="password"
          label="密码"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password
            placeholder="请输入"
            iconRender={visibleP => (visibleP ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </FormItem>
        <FormItem
          name="url"
          label="url"
          rules={[{ required: true, message: '请输入url！' }]}
        >
          <Input.TextArea rows={4} placeholder="请输入" />
        </FormItem>
      </Form>
    );
  };

  return (
    <Modal
      title={`${current ? '编辑' : '添加'}数据源`}
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

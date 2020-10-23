import { Form, Input, Modal } from 'antd';
import React, { FC, useEffect } from 'react';
import { GenConfigItem } from '../data.d';
import styles from '../style.less';

interface OperationModalProps {
  visible: boolean;
  current: Partial<GenConfigItem> | undefined;
  handleOk: (values: GenConfigItem) => void;
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
      handleOk(values as GenConfigItem);
    }
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel: handleCancel };

  const getModalContent = () => {
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <FormItem
            label="表名"
            name="tableName"
            rules={[
              {
                required: true,
                message: '请输入表名！',
              },
            ]}
          >
            <Input disabled />
          </FormItem>
          <FormItem label="模块名" name="moduleName">
            <Input placeholder="没有可空" />
          </FormItem>
          <FormItem label="表前缀" name="tablePrefix">
            <Input placeholder="没有可空" />
          </FormItem>
          <FormItem label="包名" name="packageName">
            <Input placeholder="例：me.batizhao.ims，me.batizhao.system" />
          </FormItem>
          <FormItem label="作者" name="author">
            <Input placeholder="batizhao" />
          </FormItem>
          <FormItem label="注释" name="comments">
            <Input placeholder="默认读取表注释" />
          </FormItem>
      </Form>
    );
  };

  return (
    <Modal
      title="生成代码"
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

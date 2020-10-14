import React, { useEffect } from 'react';
import { Form, Input, Radio, InputNumber, Button } from 'antd';
import { MenuTreeItem } from '../data';
import { connect, Dispatch, FormattedMessage } from 'umi';

interface MenuFormProps {
  value?: MenuTreeItem;
  submitting?: boolean;
  dispatch: Dispatch;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

const MenuForm: React.FC<MenuFormProps> = (props) => {
  const { submitting, value } = props;

  const [form] = Form.useForm();
  const FormItem = Form.Item;

  useEffect(() => {
    if (value) {
      form.setFieldsValue({
        ...value,
      });
    }
  }, [value]);

  const onFinish = (values: { [key: string]: any }) => {
    const { dispatch } = props;
    dispatch({
      type: 'imsMenu/submit',
      payload: values,
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form {...layout} form={form} name="menu-form" initialValues={value} onFinish={onFinish}>
      <FormItem name="id" hidden={true} />
      <FormItem name="pid" hidden={true} />
      <FormItem name="name" label="菜单名" rules={[{ required: true }]}>
        <Input />
      </FormItem>
      <FormItem name="permission" label="权限名" rules={[{ required: true }]}>
        <Input />
      </FormItem>
      <FormItem name="path" label="路径" rules={[{ required: true }]}>
        <Input />
      </FormItem>
      <FormItem name="type" label="类型">
        <Radio.Group value="1" defaultValue="0">
          <Radio value="0">菜单</Radio>
          <Radio value="1">按钮</Radio>
        </Radio.Group>
      </FormItem>
      <FormItem name="icon" label="图标">
        <Input />
      </FormItem>
      <FormItem name="sort" label="排序" rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber />
      </FormItem>
      <FormItem name="description" label="权限说明">
        <Input.TextArea />
      </FormItem>

      <FormItem {...tailLayout} style={{ marginTop: 32 }}>
        <Button type="primary" htmlType="submit" loading={submitting}>
          <FormattedMessage id="basic-form.form.submit" />
        </Button>
        <Button htmlType="button" onClick={onReset} style={{ marginLeft: 8 }}>
          <FormattedMessage id="basic-form.form.reset" />
        </Button>
      </FormItem>
    </Form>
  );
};

export default connect(
  ({ 
    loading 
  }: { 
    loading: { 
      effects: { [key: string]: boolean } 
    } 
  }) => ({
    submitting: loading.effects['imsMenu/submit'],
  }),
)(MenuForm);

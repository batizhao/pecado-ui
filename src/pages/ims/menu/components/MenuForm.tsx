import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, InputNumber, Button } from 'antd';
import { MenuTreeItem } from '../../menu/data';

interface MenuFormProps {
  value?: MenuTreeItem;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const MenuForm: React.FC<MenuFormProps> = (props) => {
  const { value } = props;

  const [form] = Form.useForm();
  const FormItem = Form.Item;

  useEffect(() => {
    if (value) {
      form.setFieldsValue({
        ...value,
      });
    }
  }, [value]);

  return (
    <Form {...layout} form={form} name="menu-form" initialValues={value}>
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
        <Radio.Group defaultValue={0}>
          <Radio value={0}>菜单</Radio>
          <Radio value={1}>按钮</Radio>
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
      <FormItem wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  );
};

export default MenuForm;

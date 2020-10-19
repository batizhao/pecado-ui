import { Button, Card, Input, Form } from 'antd';
import { connect, Dispatch, FormattedMessage } from 'umi';
import React, { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

interface BasicFormProps {
  submitting: boolean;
  dispatch: Dispatch;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

const BasicForm: FC<BasicFormProps> = (props) => {
  const { submitting } = props;

  const [form] = Form.useForm();
  const FormItem = Form.Item;

  const onFinish = (values: { [key: string]: any }) => {
    const { dispatch } = props;
    dispatch({
      type: 'dpCode/submit',
      payload: values,
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <PageContainer>
      <Card bordered={false}>
        <Form
          {...layout}
          style={{ marginTop: 8 }}
          form={form}
          name="basic"
          onFinish={onFinish}
        >
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
            <Input placeholder="请输入" />
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
          <FormItem {...tailLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage id="basic-form.form.submit" />
            </Button>
            <Button htmlType="button" onClick={onReset} style={{ marginLeft: 8 }}>
              <FormattedMessage id="basic-form.form.reset" />
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['dpCode/submit'],
}))(BasicForm);

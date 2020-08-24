import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, Form, message } from 'antd';
import { connect } from 'umi';
import React, { Component } from 'react';
import { CurrentUser } from '../data';
import PhoneView from './PhoneView';
import styles from './BaseView.less';

const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>Avatar</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

const validatorPhone = (rule: any, value: string, callback: (message?: string) => void) => {
  const values = value.split('-');

  if (!values[0]) {
    callback('Please input your area code!');
  }

  if (!values[1]) {
    callback('Please input your phone number!');
  }

  callback();
};

interface BaseViewProps {
  currentUser?: CurrentUser;
}

class BaseView extends Component<BaseViewProps> {
  view: HTMLDivElement | undefined = undefined;

  getAvatarURL() {
    const { currentUser } = this.props;

    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  }

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };
  handleFinish = () => {
    message.success('accountsettings.basic.update.success');
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onFinish={this.handleFinish}
            initialValues={currentUser}
            hideRequiredMark
          >
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                {
                  required: true,
                  message: 'accountsettings.basic.email-message',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label="姓名"
              rules={[
                {
                  required: true,
                  message: 'accountsettings.basic.nickname-message',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="地址"
              rules={[
                {
                  required: true,
                  message: 'accountsettings.basic.address-message',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="电话"
              rules={[
                {
                  required: true,
                  message: 'accountsettings.basic.phone-message',
                },
                {
                  validator: validatorPhone,
                },
              ]}
            >
              <PhoneView />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                更新基本信息
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    );
  }
}

export default connect(
  ({
    accountSettings,
  }: {
    accountSettings: {
      currentUser: CurrentUser;
    };
  }) => ({
    currentUser: accountSettings.currentUser,
  }),
)(BaseView);

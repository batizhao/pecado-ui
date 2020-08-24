import { AlipayOutlined, DingdingOutlined, TaobaoOutlined } from '@ant-design/icons';
import { List } from 'antd';
import React, { Component, Fragment } from 'react';

class BindingView extends Component {
  getData = () => [
    {
      title: '绑定淘宝',
      description: '当前未绑定淘宝账号',
      actions: [<a key="Bind">Bind</a>],
      avatar: <TaobaoOutlined className="taobao" />,
    },
    {
      title: '绑定支付宝',
      description: '当前未绑定支付宝账号',
      actions: [<a key="Bind">Bind</a>],
      avatar: <AlipayOutlined className="alipay" />,
    },
    {
      title: '绑定钉钉',
      description: '当前未绑定钉钉账号',
      actions: [<a key="Bind">Bind</a>],
      avatar: <DingdingOutlined className="dingding" />,
    },
  ];

  render() {
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                avatar={item.avatar}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default BindingView;

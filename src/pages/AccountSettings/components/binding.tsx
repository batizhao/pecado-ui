import { FormattedMessage, formatMessage } from 'umi';
import { AlipayOutlined, DingdingOutlined, TaobaoOutlined } from '@ant-design/icons';
import { List } from 'antd';
import React, { Component, Fragment } from 'react';

class BindingView extends Component {
  getData = () => [
    {
      title: 'accountsettings.binding.taobao',
      description: 'accountsettings.binding.taobao-description',
      actions: [<a key="Bind">Bind</a>],
      avatar: <TaobaoOutlined className="taobao" />,
    },
    {
      title: 'accountsettings.binding.alipay',
      description: 'accountsettings.binding.alipay-description',
      actions: [<a key="Bind">Bind</a>],
      avatar: <AlipayOutlined className="alipay" />,
    },
    {
      title: 'accountsettings.binding.dingding',
      description: 'accountsettings.binding.dingding-description',
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

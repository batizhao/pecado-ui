import React, { Component } from 'react';
import { List } from 'antd';
type Unpacked<T> = T extends (infer U)[] ? U : T;
const passwordStrength = {
  strong: <span className="strong">强</span>,
  medium: <span className="medium">中</span>,
  weak: <span className="weak">弱</span>,
};

class SecurityView extends Component {
  getData = () => [
    {
      title: '账户密码',
      description: (
        <>
          当前密码强度：
          {passwordStrength.strong}
        </>
      ),
      actions: [<a key="Modify">Modify</a>],
    },
    {
      title: '密保手机',
      description: '已绑定手机：138****8293',
      actions: [<a key="Modify">Modify</a>],
    },
    {
      title: '密保问题',
      description: '未设置密保问题，密保问题可有效保护账户安全',
      actions: [<a key="Set">Set</a>],
    },
    {
      title: '备用邮箱',
      description: '已绑定邮箱：ant***sign.com',
      actions: [<a key="Modify">Modify</a>],
    },
  ];

  render() {
    const data = this.getData();
    return (
      <>
        <List<Unpacked<typeof data>>
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default SecurityView;

import React, { useState } from 'react';
import { Tree, Card, Col, Row, Form, Input, InputNumber, Button, Radio } from 'antd';
import { PageContainer, GridContent } from '@ant-design/pro-layout';
import { queryMenuTree } from './service';
import { MenuTreeItem } from './data';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const { DirectoryTree } = Tree;

const treeData = [ {
  "id" : 1,
  "pid" : 0,
  "children" : [ ],
  "isLeaf" : true,
  "title" : "工作台",
  "key" : "user_dashboard"
}, {
  "id" : 1000,
  "pid" : 0,
  "children" : [ {
    "id" : 1100,
    "pid" : 1000,
    "children" : [ {
      "id" : 1101,
      "pid" : 1100,
      "children" : [ ],
      "isLeaf" : true,
      "title" : "添加用户",
      "key" : "ims_user_add"
    }, {
      "id" : 1102,
      "pid" : 1100,
      "children" : [ ],
      "isLeaf" : true,
      "title" : "编辑用户",
      "key" : "ims_user_edit"
    } ],
    "isLeaf" : false,
    "title" : "用户管理",
    "key" : "ims_user_admin"
  }, {
    "id" : 1200,
    "pid" : 1000,
    "children" : [ ],
    "isLeaf" : true,
    "title" : "角色管理",
    "key" : "ims_role_admin"
  }, {
    "id" : 1300,
    "pid" : 1000,
    "children" : [ ],
    "isLeaf" : true,
    "title" : "菜单管理",
    "key" : "ims_menu_admin"
  } ],
  "isLeaf" : false,
  "title" : "权限管理",
  "key" : "ims_root"
}, {
  "id" : 2000,
  "pid" : 0,
  "children" : [ {
    "id" : 2100,
    "pid" : 2000,
    "children" : [ ],
    "isLeaf" : true,
    "title" : "日志管理",
    "key" : "system_log_admin"
  } ],
  "isLeaf" : false,
  "title" : "系统管理",
  "key" : "system_root"
} ];

const TreeDemo: React.FC<{}> = () => {
  const onSelect = (keys, event) => {
    console.log('Trigger Select', keys, event);
  };

  const onExpand = () => {
    console.log('Trigger Expand');
  };

  // const fetchData = async () => {
  //   const result = await queryMenuTree();
  //   setTreeData(result.data);
  // }

  return (
    <PageContainer>
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }}>
              <DirectoryTree
                defaultExpandAll
                onSelect={onSelect}
                onExpand={onExpand}
                treeData={treeData}
              />
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card>
              <Form {...layout} name="menu-tree-form">
                <Form.Item name={['menu', 'name']} label="菜单名" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name={['menu', 'permission']} label="权限名" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name={['menu', 'path']} label="路径" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name={['menu', 'type']} label="类型">
                  <Radio.Group defaultValue="{0}">
                    <Radio value="{0}">菜单</Radio>
                    <Radio value="{1}">按钮</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name={['menu', 'icon']} label="图标">
                  <Input />
                </Form.Item>
                <Form.Item
                  name={['menu', 'sort']}
                  label="排序"
                  rules={[{ type: 'number', min: 0, max: 99 }]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item name={['menu', 'description']} label="权限说明">
                  <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </GridContent>
    </PageContainer>
  );
};

export default TreeDemo;

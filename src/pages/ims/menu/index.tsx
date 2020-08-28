import React, { useState, useEffect } from 'react';
import { Tree, Card, Col, Row, Form, Input, InputNumber, Button, Radio } from 'antd';
import { PageContainer, GridContent } from '@ant-design/pro-layout';
import { queryMenuTree } from './service';
import { MenuTreeItem } from './data';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const { DirectoryTree } = Tree;

const TreeDemo: React.FC<{}> = () => {
  const [treeDataValues, setTreeDataValues] = useState<MenuTreeItem[]>([]);

  const onSelect = (keys, event) => {
    console.log('Trigger Select', keys, event);
  };

  const onExpand = () => {
    console.log('Trigger Expand');
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await queryMenuTree();
      setTreeDataValues(result.data);
    };
  
    fetchData();
  }, []);

  return (
    <PageContainer>
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }}>
              {treeDataValues && treeDataValues.length > 0 ? (
                <DirectoryTree
                  defaultExpandAll
                  onSelect={onSelect}
                  onExpand={onExpand}
                  treeData={treeDataValues}
                />
              ) : null}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card>
              <Form {...layout} name="menu-tree-form">
                <Form.Item name={['menu', 'name']} label="菜单名" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name={['menu', 'permission']}
                  label="权限名"
                  rules={[{ required: true }]}
                >
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

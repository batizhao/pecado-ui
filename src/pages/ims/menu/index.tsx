import React, { useState, useEffect, ReactText } from 'react';
import { Tree, Card, Col, Row } from 'antd';
import { PageContainer, GridContent } from '@ant-design/pro-layout';
import { queryMenuTree, queryMenu } from './service';
import { MenuTreeItem } from './data';
import MenuForm from './components/MenuForm'

/**
 * 获取菜单对象
 * @param menuId
 */
const fetchMenu = async (menuId: number) => {
  const result = await queryMenu(menuId);
  return result.data;
};

const MenuTree: React.FC<{}> = () => {
  const [treeDataValues, setTreeDataValues] = useState<MenuTreeItem[]>([]);
  const [currentData, setCurrentData] = useState<MenuTreeItem>();

  const onSelect = (selectedKeys: ReactText[], info: any) => {
    fetchMenu(info.node.id).then(result => setCurrentData(result));
  };

  useEffect(() => {
    const fetchMenuTree = async () => {
      const result = await queryMenuTree();
      setTreeDataValues(result.data);
    };
  
    fetchMenuTree();
  }, []);  

  return (
    <PageContainer>
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }}>
              {treeDataValues && treeDataValues.length > 0 ? (
                <Tree
                  showLine
                  defaultExpandAll
                  onSelect={onSelect}
                  treeData={treeDataValues}
                />
              ) : null}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card>
              <MenuForm value={currentData} />
            </Card>
          </Col>
        </Row>
      </GridContent>
    </PageContainer>
  );
};

export default MenuTree;

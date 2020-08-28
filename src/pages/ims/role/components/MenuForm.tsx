import React, { useState, useEffect } from 'react';
import { Modal, Tree } from 'antd';
import { queryMenuTree } from '../../menu/service';
import { MenuTreeItem } from '../../menu/data';

interface MenuFormProps {
  onCancel: (values?: string[]) => void;
  onSubmit: (values: string[]) => void;
  modalVisible: boolean;
  values: string[];
}

const MenuForm: React.FC<MenuFormProps> = (props) => {
  const {
    onSubmit: handleUpdate,
    onCancel: handleMenuModalVisible,
    modalVisible,
    values,
  } = props;

  const [treeDataValues, setTreeDataValues] = useState<MenuTreeItem[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<string[]>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await queryMenuTree();
      setTreeDataValues(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCheckedKeys(values);
  }, [values]);

  const onCheck = checkedKeys => {
    setCheckedKeys(checkedKeys);
  };

  const handleSubmit = async () => {
    handleUpdate([]);
  };

  return (
    <Modal
      destroyOnClose
      title="分配权限"
      visible={modalVisible}
      onOk={() => handleSubmit()}
      onCancel={() => handleMenuModalVisible()}
    >
      <Tree
        checkable
        defaultExpandAll
        checkedKeys={checkedKeys}
        onCheck={onCheck}
        treeData={treeDataValues}
      />
    </Modal>
  );
};

export default MenuForm;

import React, { useState, useEffect } from 'react';
import { Modal, Tree } from 'antd';
import { queryMenuTree } from '../../menu/service';
import { MenuTreeItem } from '../../menu/data';

interface ModalProps {
  visible: boolean;
  values: string[];
  id: number;
  handleOk: (id: number, menus: string[]) => void;
  handleCancel: () => void;
}

const MenuModal: React.FC<ModalProps> = (props) => {
  const { handleOk: handleUpdate, handleCancel, visible, values, id } = props;

  const [treeDataValues, setTreeDataValues] = useState<MenuTreeItem[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

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

  const onCheck = (checkedKeys) => {
    setCheckedKeys(checkedKeys);
  };

  const handleSubmit = async () => {
    handleUpdate(id, checkedKeys);
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel: handleCancel };

  return (
    <Modal destroyOnClose title="分配权限" visible={visible} {...modalFooter}>
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

export default MenuModal;

import React, { FC, useEffect, useState } from 'react';
import { Modal, Checkbox } from 'antd';
import { queryRole } from '../../role/service';

interface ModalProps {
  visible: boolean;
  values: string[] | undefined;
  handleOk: (values: string[]) => void;
  handleCancel: () => void;
}

const RoleForm: FC<ModalProps> = (props) => {
  const { 
    visible, 
    values, 
    handleOk: handleRoleSubmit,
    handleCancel, 
  } = props;

  const [roleDataValues, setRoleDataValues] = useState<[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<string[]>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await queryRole();
      const data = result.data;

      const arr = [];
      Object.keys(data).forEach(key => arr.push({
        label: data[key].name, 
        value: data[key].code,
      }));
      setRoleDataValues(arr);
    };

    fetchData();
  }, []);

  const CheckboxGroup = Checkbox.Group;

  useEffect(() => {
    setCheckedKeys(values);
  }, [values]);

  const onChange = checkedKeys => {
    setCheckedKeys(checkedKeys);
  }

  const handleSubmit = async () => {
    handleRoleSubmit(checkedKeys);
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel: handleCancel };

  return (
    <Modal
      destroyOnClose
      title="分配角色"
      visible={visible}
      {...modalFooter}
    >
      <CheckboxGroup
        options={roleDataValues}
        value={checkedKeys}
        name="roles"
        onChange={onChange}
      />
    </Modal>
  );
};

export default RoleForm;

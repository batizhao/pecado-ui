import ImgCrop from 'antd-img-crop';
import { Button, Input, Upload, Form, message, Modal } from 'antd';
import { connect } from 'umi';
import React, { FC, useState } from 'react';
import { CurrentUser } from '../data';
import { UserListItem } from '@/pages/ims/user/data';
import { addOrUpdateUser } from '@/pages/ims/user/service';
import styles from './BaseView.less';
import 'antd/es/modal/style';
import 'antd/es/slider/style';

const getBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

interface BaseViewProps {
  currentUser?: CurrentUser;
}

const BaseView: FC<BaseViewProps> = (props) => {
  const view: HTMLDivElement | undefined = undefined;
  const { currentUser } = props;
  const token = localStorage.getItem('token');

  const getAvatarURL = () => {
    if (currentUser && currentUser.avatar) {
      return currentUser.avatar;
    }
    return '';
  };

  const beforeUpload = (file: { type: string; size: number }) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const [fileList, setFileList] = useState<any[]>([
    {
      uid: '-1',
      name: '头像',
      status: 'done',
      url: getAvatarURL(),
    },
  ]);

  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const [previewTitle, setPreviewTitle] = useState<string>();

  const handleChange = ({ fileList }) => setFileList(fileList);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleFinish = async (values: UserListItem) => {
    let avatar = getAvatarURL();
    if (fileList[0] && fileList[0].response){
      avatar = 'http://localhost:8888/api/system/file/image/' + fileList[0].response.data.fileName;
    } 

    const result = await addOrUpdateUser({ avatar: avatar, ...values });
    if (result.code === 0) {
      message.success('更新成功！');
    }
  };

  return (
    <div className={styles.baseView} ref={view}>
      <div className={styles.left}>
        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={currentUser}
          hideRequiredMark
        >
          <Form.Item name="id" hidden={true} />
          <Form.Item name="username" hidden={true} />
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              {
                required: true,
                message: '请输入邮箱！',
                type: 'email',
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
                message: '请输入姓名！',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              更新基本信息
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.right}>
        <ImgCrop grid>
          <Upload
            withCredentials
            headers={{
              Authorization: `Bearer ${token}`,
            }}
            action="/api/system/file/upload"
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            onPreview={handlePreview}
            beforeUpload={beforeUpload}
          >
            {fileList.length === 0 && '+ Upload'}
          </Upload>
        </ImgCrop>
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    </div>
  );
};

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

import { getUser } from '@/api/user';
import ImgDefaultPp from '@/assets/images/defaultPp.jpg';
import { ImgPalette } from '@/res/images';
import User from '@/types/User';
import resizeImage from '@/utils/resizeImage';
import { QuestionCircleOutlined, WarningOutlined } from '@ant-design/icons';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { updateProfilePicture, updateUser } from '../api/user';
import CustomizeColorsModal from './CustomizeColorsModal';
import LoadingScreen from './ui/LoadingScreen';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { Form, Input } from 'antd';

const Col = dynamic(() => import('antd').then((module) => module.Col));
const Modal = dynamic(() => import('antd').then((module) => module.Modal));
const Row = dynamic(() => import('antd').then((module) => module.Row));
const Tooltip = dynamic(() => import('antd').then((module) => module.Tooltip));

interface Props {
  open: boolean;
  onClose: (refresh: boolean) => void;
  userId: string;
  handlePfpUpdate: (newPfp: Buffer) => void;
}

const UpdateUserModal: React.FC<Props> = ({
  open,
  onClose,
  userId,
  handlePfpUpdate,
}) => {
  const { t } = useTranslation('profile');
  const [loading, setLoading] = useState(false);
  const [customLinkError, setCustomLinkError] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [connectedUser, setConnectedUser] = useState<User>();
  const [isColorsUpdated, setIsColorsUpdated] = useState(false);
  const [isLinkAlreadyChanged, setIsLinkAlreadyChanged] = useState(true);
  const [profilePic, setProfilePic] = useState<Buffer>();
  const [form] = Form.useForm();
  const [isCustomizeColorsModalVisible, setIsCustomizeColorsModalVisible] =
    useState(false);

  useEffect(() => {
    async function fetchConnectedUser() {
      setLoading(true);
      const connectedUser = await getUser();
      if (userId.toLocaleLowerCase() == connectedUser.customLink)
        setIsLinkAlreadyChanged(false);
      form.setFieldsValue({
        ['firstName']: connectedUser.firstName,
        ['lastName']: connectedUser.lastName,
        ['description']: connectedUser.description,
        ['customLink']: connectedUser.customLink,
        ['ig']: connectedUser.ig,
      });
      setConnectedUser(connectedUser);
      if (connectedUser.profilePicture?.data) {
        setProfilePic(Buffer.from(connectedUser.profilePicture.data));
      }
      setLoading(false);
    }

    fetchConnectedUser();
  }, [form, userId]);

  const handleOk = () => {
    setCustomLinkError('');
    form
      .validateFields()
      .then((values) => {
        setUpdateLoading(true);
        updateUser(values).then((res) => {
          setUpdateLoading(false);
          if (res && res.status && res.status == 'error') {
            if (res.result.field == 'customLink') {
              switch (res.result.type) {
                case 'INVALID':
                  setCustomLinkError(t('customLink_error_INVALID'));
                  break;
                case 'FORBIDDEN':
                  setCustomLinkError(t('customLink_error_FORBIDDEN'));
                  break;
                case 'UNIQUE':
                  setCustomLinkError(t('customLink_error_UNIQUE'));
                  break;
              }
            }
          } else if (res && res.status && res.status == 'success')
            router.push(`/${values.customLink.toLowerCase()}`);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageSelect = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = handleImageUpload;
    input.click();
  };

  const handleOpenCustomizeColorsModal = () => {
    setIsCustomizeColorsModalVisible(true);
  };

  const handleCloseCustomizeColorsModal = (
    colorsUpdated: boolean,
    userColors: any,
  ) => {
    setIsColorsUpdated(colorsUpdated);
    const tmp = connectedUser;
    if (tmp) {
      tmp.visitedColor1 = userColors.visitedColor1;
      tmp.visitedColor2 = userColors.visitedColor2;
      tmp.visitedColor3 = userColors.visitedColor3;
      tmp.notVisitedColor1 = userColors.notVisitedColor1;
      tmp.notVisitedColor2 = userColors.notVisitedColor2;
      tmp.notVisitedColor3 = userColors.notVisitedColor3;
      tmp.colorBorders = userColors.colorBorders;
      setConnectedUser(tmp);
    }
    setIsCustomizeColorsModalVisible(false);
  };

  const handleClose = () => {
    if (isColorsUpdated && connectedUser) {
      onClose(true);
    } else {
      onClose(false);
    }
  };

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setTimeout(() => {
      reader.onload = async () => {
        if (reader.result instanceof ArrayBuffer) {
          const buffer = Buffer.from(reader.result);

          setProfilePic(buffer);
          handlePfpUpdate(buffer);

          const resizedImg = await resizeImage(reader.result, 320, 320);

          if (resizedImg) updateProfilePicture(resizedImg);
        }
      };
      reader.readAsArrayBuffer(file);
    }, 100);
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      onOk={handleOk}
      cancelText={t('common:Cancel')}
      okText={t('common:Save')}
      title={t('Update profile informations')}
      confirmLoading={updateLoading}>
      {isCustomizeColorsModalVisible && (
        <CustomizeColorsModal
          open={isCustomizeColorsModalVisible}
          onClose={handleCloseCustomizeColorsModal}
          alreadyUpdatedColors={isColorsUpdated}
          userColors={{
            visitedColor1: connectedUser ? connectedUser.visitedColor1 : '',
            visitedColor2: connectedUser ? connectedUser.visitedColor2 : '',
            visitedColor3: connectedUser ? connectedUser.visitedColor3 : '',
            notVisitedColor1: connectedUser
              ? connectedUser.notVisitedColor1
              : '',
            notVisitedColor2: connectedUser
              ? connectedUser.notVisitedColor2
              : '',
            notVisitedColor3: connectedUser
              ? connectedUser.notVisitedColor3
              : '',
            colorBorders: connectedUser ? connectedUser.colorBorders : '',
          }}
        />
      )}
      {loading ? (
        <LoadingScreen />
      ) : (
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          form={form}
          scrollToFirstError
          preserve={false}>
          <Row className="mb-4">
            <Col span={5}>
              <div
                className="rounded-full cursor-pointer w-[90%] overflow-hidden flex justify-center items-center"
                style={{ aspectRatio: '1/1' }}>
                <img
                  src={
                    profilePic
                      ? `data:image/jpg;base64,${profilePic.toString('base64')}`
                      : ImgDefaultPp.src
                  }
                  alt={t('Profile picture')}
                  className="w-full h-full object-cover"
                  onClick={handleImageSelect}
                />
              </div>
            </Col>
            <Col span={14} className="self-center">
              <label
                className="cursor-pointer text-[#007aff]"
                onClick={handleImageSelect}>
                {t('Update profile picture')}
              </label>
            </Col>
          </Row>
          <Form.Item
            label={t('First Name')}
            name="firstName"
            rules={[
              { required: true, message: t('Please enter a first name') },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={t('Last Name')}
            name="lastName"
            rules={[
              { required: true, message: t('Please enter a last name') },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('Bio')} name="description">
            <Input.TextArea showCount maxLength={150} />
          </Form.Item>
          <Form.Item label="Instagram" name="ig">
            <Input addonBefore="@" />
          </Form.Item>
          {/* <Form.Item label={t('Public Profile')} name="isPublic">
            <Switch defaultChecked={form.getFieldValue('isPublic')} />
          </Form.Item> */}
          <Form.Item
            label={t('Profile Link')}
            name="customLink"
            required
            validateStatus={customLinkError != '' ? 'error' : ''}
            help={customLinkError}>
            <Input
              addonBefore={<>atlastrotter.com/</>}
              disabled={isLinkAlreadyChanged}
              suffix={
                isLinkAlreadyChanged ? (
                  <Tooltip title={t('customLink_tooltip_already_updated')}>
                    <QuestionCircleOutlined />
                  </Tooltip>
                ) : (
                  <Tooltip title={t('customLink_tooltip_not_updated')}>
                    <WarningOutlined />
                  </Tooltip>
                )
              }
            />
          </Form.Item>
          <Row className="mb-4">
            <Col span={5}>
              <div className="cursor-pointer w-[90%] overflow-hidden flex justify-end items-center">
                <img
                  src={ImgPalette.src}
                  alt={t('Palette')}
                  className="w-[75%] h-[75%] object-contain"
                  onClick={handleOpenCustomizeColorsModal}
                />
              </div>
            </Col>
            <Col span={14} className="self-center">
              <label
                className="cursor-pointer text-[#007aff]"
                onClick={handleOpenCustomizeColorsModal}>
                {t('Customize map colors')}
              </label>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
};

export default UpdateUserModal;

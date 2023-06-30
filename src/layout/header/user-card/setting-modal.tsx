import React, { useState, useMemo } from 'react';
import { Avatar } from '@/components';
import { Modal } from 'surprisec-react-components';
import { Tabs } from 'antd';
import AvatarColor from './avatar-color';
import AvatarImg from './avatar-img';
import type { UploadFile } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';

import { useDispatch } from 'react-redux';
import type { Dispatch } from '@/stores';

interface SettingModalProps {
  open: boolean;
  setOpen: (params: boolean) => void;
  personalInfo: any;
}

const SettingModal: React.FC<SettingModalProps> = ({
  open,
  setOpen,
  personalInfo
}: SettingModalProps) => {
  const dispatch = useDispatch<Dispatch>();

  const [activeColor, setActiveColor] = useState('');

  const handleChange = async (info: UploadChangeParam<UploadFile>) => {
    const { fileList } = info;
    const {
      result: { url },
      code
    } = (await dispatch.uploadFile.uploadFile({
      file: fileList[0].originFileObj
    })) as any;
    if (code === 0 && url) {
      await dispatch.userInfo.update({
        avatar: url
      });
    }
  };

  const TabItems = useMemo(() => {
    return [
      {
        label: `自定义 `,
        key: '1',
        children: (
          <AvatarColor
            activeColor={activeColor}
            setActiveColor={setActiveColor}
          />
        )
      },
      {
        label: `默认`,
        key: '2',
        children: <AvatarImg onChange={handleChange} />
      }
    ];
  }, []);

  return (
    <Modal
      title="上传图像"
      open={open}
      onOk={() => {
        setOpen(false);
      }}
      onCancel={() => {
        setOpen(false);
      }}>
      <div className="w-full flex ">
        <div className="w-[210px] flex flex-col">
          <div className="h-[46px] leading-[46px]">预览</div>
          <div className="w-full flex justify-center items-center">
            <div className="w-24 h-24 mt-[70px] mb-[20px] relative overflow-hidden group">
              <Avatar
                personalInfo={personalInfo}
                className="bg-amber-200 text-white text-[30px] font-bold"
                style={{ backgroundColor: activeColor }}
              />
            </div>
          </div>
        </div>
        <div className="w-[436px]">
          <Tabs className="h-full" defaultActiveKey="1" items={TabItems} />
        </div>
      </div>
    </Modal>
  );
};
export default SettingModal;

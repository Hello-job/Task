import React, { useState, useMemo, useContext, useCallback } from 'react';
import { Modal } from 'surprisec-react-components';
import { Tabs } from 'antd';
import AvatarColor from './avatar-color';
import AvatarImg from './avatar-img';
import type { UploadFile } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';
import { parInfoContext } from '../context';

interface SettingModalProps {
  open: boolean;
  setOpen: (params: boolean) => void;
}

const SettingModal: React.FC<SettingModalProps> = ({
  open,
  setOpen
}: SettingModalProps) => {
  const { personalInfo, onChange, onUpdateField } = useContext(parInfoContext);
  const [activeColor, setActiveColor] = useState(personalInfo.color);
  const [avatar, setAvatar] = useState(personalInfo.avatar);

  const handleChange = useCallback(
    async (info: UploadChangeParam<UploadFile>) => {
      const { fileList } = info;
      if (onUpdateField) {
        const {
          result: { url },
          code
        } = await onUpdateField(fileList[0]);
        if (code === 0 && url) {
          setAvatar(url);
          setActiveColor('');
        }
      }
    },
    [onUpdateField]
  );

  const TabItems = useMemo(() => {
    return [
      {
        label: `自定义 `,
        key: '1',
        children: (
          <AvatarColor
            activeColor={activeColor}
            onChange={color => {
              setActiveColor(color);
              setAvatar('');
            }}
          />
        )
      },
      {
        label: `默认`,
        key: '2',
        children: <AvatarImg onChange={handleChange} />
      }
    ];
  }, [activeColor, handleChange]);

  return (
    <Modal
      title="上传图像"
      open={open}
      onOk={() => {
        onChange &&
          onChange({
            avatar,
            color: activeColor
          });
        setOpen(false);
      }}
      onCancel={() => {
        setOpen(false);
      }}>
      <div className="w-full flex ">
        <div className="w-[210px] flex flex-col">
          <div className="h-[46px] leading-[46px]">预览</div>
          <div className="w-full flex justify-center items-center">
            <div className="w-24 h-24 mt-[70px] mb-[20px] relative overflow-hidden group rounded-full">
              {activeColor ? (
                <div
                  style={{ backgroundColor: activeColor }}
                  className="w-full h-full flex items-center justify-center text-white text-[20px] font-bold">
                  <span>{personalInfo.name}</span>
                </div>
              ) : (
                <img className="w-full h-full object-cover" src={avatar} />
              )}
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

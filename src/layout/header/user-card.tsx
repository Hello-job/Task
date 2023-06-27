import { useEffect, useState } from 'react';
import { Icon, Avatar } from '@/components';
import { useNavigate } from 'react-router-dom';
import { Storage } from '@/shared';
import { Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';
import { useDispatch } from 'react-redux';
import type { Dispatch } from '@/stores';
import { Modal } from 'surprisec-react-components';
import { Tabs } from 'antd';

interface UserDetailInfoType {
  personalInfo: any;
  userPopRef: any;
  setOpenUserPopover: (value: boolean) => void;
}

function UserCard({
  setOpenUserPopover,
  userPopRef,
  personalInfo
}: UserDetailInfoType) {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const [open, setOpen] = useState(false);

  const handleMOuseDown = (e: MouseEvent) => {
    if (open) return;
    setOpenUserPopover(userPopRef?.current?.contains(e.target));
  };

  useEffect(() => {
    if (!userPopRef) return;
    window.removeEventListener('mousedown', handleMOuseDown);
    window.addEventListener('mousedown', handleMOuseDown);
    return () => {
      window.removeEventListener('mousedown', handleMOuseDown);
    };
  }, [open]);

  const handleExitLogin = () => {
    Storage.local.clear();
    navigate('/login', { replace: true });
  };

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

  return (
    <div
      className="w-80 userInfo rounded-md overflow-hidden absolute top-8 right-0 shadow-md z-10 bg-skin-bg-base"
      onClick={e => {
        e.stopPropagation();
      }}>
      <div className="h-[128px] bg-skin-text-primary px-8 py-6 flex items-center">
        <div className="w-12 h-12   rounded-full overflow-hidden mr-5 ">
          <div className="w-12 h-12 relative overflow-hidden group">
            <Avatar
              personalInfo={personalInfo}
              className="text-[20px] bg-amber-200"
            />
            <div
              className="absolute top-0 z-10 hidden w-full h-full bg-transparenBlack text-skin-text-white text-lg leading-10 group-hover:block"
              onClick={() => {
                setOpen(true);
              }}>
              {/* <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleChange}>
                <Icon
                  className="text-lg text-skin-text-white"
                  type="icondetails_edit"
                />
              </Upload> */}
            </div>
          </div>
        </div>
        <div>
          <div className=" text-lg text-skin-text-white mb-1">
            <span className="mr-2">用户名</span>
            <Icon type="icondetails_edit" />
          </div>
          <div className="text-sm text-skin-text-white text-left">个性签名</div>
        </div>
      </div>
      <div className="bg-skin-bg-base pt-4 px-6 pb-8">
        <h4>个人信息</h4>
        <div className="flex items-center mt-4 text-sm">
          <span className="text-textGray w-[72px]">手机号</span>
          <span className=" text-skin-text-base">13636076741</span>
        </div>
        <div className="flex items-center mt-4  text-sm">
          <span className="text-textGray w-[72px]">项目信息</span>
          <span className=" text-skin-text-base">测试项目</span>
        </div>
      </div>
      <div className=" bg-skin-bg-base py-4 px-2 flex items-center justify-around text-textGray">
        <div className="border-0 border-r border-solid border-textGray flex-1 inline-block text-center cursor-pointer">
          个人设置
        </div>
        <div
          className="  flex-1 inline-block text-center  cursor-pointer"
          onClick={handleExitLogin}>
          退出登陆
        </div>
      </div>
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
              <div className="w-12 h-12 relative overflow-hidden group">
                <Avatar
                  personalInfo={personalInfo}
                  className="text-[20px] bg-amber-200"
                />
                <div
                  className="absolute top-0 z-10 hidden w-full h-full bg-transparenBlack text-skin-text-white text-lg leading-10 group-hover:block"
                  onClick={() => {
                    setOpen(true);
                  }}>
                  {/* <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleChange}>
                <Icon
                  className="text-lg text-skin-text-white"
                  type="icondetails_edit"
                />
              </Upload> */}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[436px]">
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  label: `Tab 1`,
                  key: '1',
                  children: `Content of Tab Pane 1`
                },
                {
                  label: `Tab 2`,
                  key: '2',
                  children: `Content of Tab Pane 2`
                }
              ]}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserCard;

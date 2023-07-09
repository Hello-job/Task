import { Icon } from '@/components';
import { Button } from 'surprisec-react-components';
import { Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';

interface AvatarImgProps {
  onChange: (info: UploadChangeParam<UploadFile>) => void;
}

const AvatarImg = ({ onChange }: AvatarImgProps) => {
  return (
    <div className="w-full h-[236px] flex pt-[80px] items-center flex-col">
      <Upload
        showUploadList={false}
        beforeUpload={() => false}
        onChange={onChange}>
        <Button
          type="primary"
          icon={
            <Icon className="text-lg text-white" type="icondetails_edit" />
          }>
          选择图片
        </Button>
      </Upload>
      <span className="mt-4 text-xs">
        支持 JPG、PNG 和 GIF 格式，图片大小需在 2 MB 以内
      </span>
    </div>
  );
};

export default AvatarImg;

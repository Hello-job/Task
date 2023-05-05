import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from '@/shared';
import { message } from 'antd';

const Project = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Storage.local.get('token');
    if (!token) {
      message.warning({
        content: '登陆失效，请重新登陆',
        duration: 0.5,
        onClose: () => {
          navigate('/login');
        }
      });
    }
  }, []);

  return (
    <div className="w-full h-full rounded-md bg-skin-bg-base p-2.5">
      <div className="w-full flex content-start flex-wrap h-full">
        <div
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4  h-[100px] border border-solid border-[#dce2ef] rounded cursor-pointer hover:shadow-lg flex items-center"
          onClick={() => {
            navigate(`/project/1`);
          }}>
          <div className="w-[100px] h-full object-cover">
            <img
              className="w-full h-full"
              src="https://polaris-hd2.oss-cn-shanghai.aliyuncs.com/front_resources/general_project_cover_x1.png?x-oss-process=style/thumbnail_001"
            />
          </div>
          <div className="w-full h-full flex flex-col justify-between flex-1 p-2">
            <div className="flex justify-between items-center">
              <span className="text-base">你是</span>
              <div className="w-8 h-8 rounded-full overflow-hidden  object-cover">
                <img
                  className="w-full h-full"
                  src="https://attachments.startable.cn/org_2566/project_0/folder_resource/2023/2/8/472794f76eef4d0fb9037a6a28b952e41675845999361.jpg?x-oss-process=image/resize,w_100"
                />
              </div>
            </div>
            <div className="w-full text-sm text-textGray">项目描述</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;

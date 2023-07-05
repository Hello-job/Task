import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';
import { Icon, Avatar } from '@/components';
import { Modal } from 'surprisec-react-components';
import { useDispatch, useSelector } from 'react-redux';
import type { Dispatch, RootState } from '@/stores';

const defaultProjectImg =
  'https://polaris-hd2.oss-cn-shanghai.aliyuncs.com/front_resources/general_project_cover_x1.png?x-oss-process=style/thumbnail_001';

const Project = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch<Dispatch>();
  const personalInfo = useSelector(
    (store: RootState) => store.userInfo.personalInfo
  );
  const projectList = useSelector(
    (store: RootState) => store.project.projectList
  );

  console.log('>>>>>>projectList', projectList);

  useEffect(() => {
    dispatch.project.getProjectList({ userId: personalInfo.id });
  }, [personalInfo.id]);

  const onFinish = (values: any) => {
    const { name, desc } = values;
    dispatch.project.createProject({
      ...values,
      creator: personalInfo.id
    });
    setOpen(false);
  };

  return (
    <div className="w-full h-full rounded-md bg-skin-bg-base p-2.5">
      <div className="w-full flex content-start flex-wrap h-full">
        {projectList.map(item => {
          return (
            <div
              key={item.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4  h-[100px] border border-solid border-[#dce2ef] rounded cursor-pointer hover:shadow-lg flex items-center mr-5 mb-5"
              onClick={() => {
                navigate(`/project/${item.id}`);
              }}>
              <div className="w-[100px] h-full object-cover">
                <img
                  className="w-full h-full"
                  src={item.projectImg ? item.projectImg : defaultProjectImg}
                />
              </div>
              <div className="w-full h-full flex flex-col justify-between flex-1 p-2">
                <div className="flex justify-between items-center">
                  <span className="text-base">{item.name}</span>
                  <div className="w-8 h-8 rounded-full overflow-hidden  object-cover">
                    <Avatar personalInfo={item.creatorInfo} />
                  </div>
                </div>
                <div className="w-full text-sm text-textGray">{item.desc}</div>
              </div>
            </div>
          );
        })}
        <div
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4  h-[100px] border border-solid border-[#dce2ef] rounded cursor-pointer hover:shadow-lg flex items-center mr-5 mb-5"
          onClick={() => {
            setOpen(true);
          }}>
          <div className="w-full h-full bg-[#f1f3f9] flex justify-center items-center text-lg text-violet">
            <Icon type="icona-automationadd" className="mr-5" />
            <span>新建项目</span>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        centered={true}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => form.submit()}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item label="项目名称" name="name">
            <Input placeholder="请输入项目名称" />
          </Form.Item>
          <Form.Item label="项目描述" name="desc">
            <Input.TextArea placeholder="请输入项目描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Project;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from '@/shared';
import { message, Modal, Form, Input, Button } from 'antd';
import { Icon } from '@/components';
import { data } from './data';

const Project = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
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
        {data.map(item => {
          return (
            <div
              key={item.name}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4  h-[100px] border border-solid border-[#dce2ef] rounded cursor-pointer hover:shadow-lg flex items-center mr-5 mb-5"
              onClick={() => {
                navigate(`/project/1`);
              }}>
              <div className="w-[100px] h-full object-cover">
                <img className="w-full h-full" src={item.projectImg} />
              </div>
              <div className="w-full h-full flex flex-col justify-between flex-1 p-2">
                <div className="flex justify-between items-center">
                  <span className="text-base">{item.name}</span>
                  <div className="w-8 h-8 rounded-full overflow-hidden  object-cover">
                    <img className="w-full h-full" src={item.creator.img} />
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
      <Modal open={open}>
        <Form form={form}>
          <Form.Item label="项目名称">
            <Input />
          </Form.Item>
          <Form.Item label="项目名称">
            <Button type="primary" onClick={() => setOpen(false)}>
              确认
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Project;

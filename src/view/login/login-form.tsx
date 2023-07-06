import { useContext } from 'react';
import { Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { login } from '@/services/api';
import Http from '@/services/http';
import { useNavigate } from 'react-router-dom';
import { LoginContext, ActionType } from './context';
import { Storage } from '@/shared';

const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const {
    state: { title },
    dispatch
  } = useContext(LoginContext);

  const onFinish = async (values: any) => {
    const { code, result }: any = await Http.post(login, values);
    if (code === 0) {
      Storage.local.set('token', result.token);
      Storage.local.set('userInfo', result.userInfo);
      navigate('/');
    }
  };
  return (
    <>
      <div className="text-base font-bold mb-10">{title}</div>
      <div className="w-full text-sm">
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: '请输入账号' }]}>
            <Input
              prefix={
                <UserOutlined className=" text-textGray site-form-item-icon" />
              }
              placeholder="请输入账号"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}>
            <Input
              prefix={
                <LockOutlined className=" text-textGray site-form-item-icon" />
              }
              type="password"
              placeholder="请输入密码"
              onPressEnter={() => form.submit()}
            />
          </Form.Item>
          <Form.Item>
            <div
              className=" w-full h-10 cursor-pointer rounded-md bg-skin-text-primary text-skin-text-white text-sm text-center leading-[40px]"
              onClick={() => form.submit()}>
              登陆
            </div>
          </Form.Item>
        </Form>
      </div>
      <div className="text-sm mt-2 text-skin-text-base">
        <span>没有账号?点击</span>
        <span
          className="text-violet cursor-pointer"
          onClick={() => {
            dispatch({ type: ActionType.Register });
          }}>
          注册
        </span>
      </div>
    </>
  );
};

export default LoginForm;

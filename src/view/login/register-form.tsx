import { useContext } from 'react';
import { Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { register } from '@/services/api';
import Http from '@/services/http';
import { useNavigate } from 'react-router-dom';
import { LoginContext, ActionType } from './context';
const ResisterForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {
    state: { title },
    dispatch
  } = useContext(LoginContext);
  const onFinish = async (values: any) => {
    const { code }: any = await Http.post(register, values);
    if (code === 0) {
      dispatch({ type: ActionType.Login });
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
            />
          </Form.Item>
          <Form.Item
            name="confirm_password"
            rules={[
              { required: true, message: '请再次输入密码' },
              {
                validator(rule, value, callback) {
                  const password = form.getFieldValue('password');
                  if (value && password !== value) {
                    callback('密码前后不一致,请重新输入');
                    return;
                  }
                  callback();
                }
              }
            ]}>
            <Input
              prefix={
                <LockOutlined className=" text-textGray site-form-item-icon" />
              }
              type="password"
              placeholder="请再次输入密码"
            />
          </Form.Item>
          <Form.Item>
            <div
              className=" w-full h-10 cursor-pointer rounded-md bg-skin-text-primary text-skin-text-white text-sm text-center leading-[40px]"
              onClick={() => form.submit()}>
              注册
            </div>
          </Form.Item>
        </Form>
      </div>
      <div className="text-sm mt-2 text-skin-text-base">
        <span>已有账号?点击</span>
        <span
          className="text-violet cursor-pointer"
          onClick={() => dispatch({ type: ActionType.Login })}>
          登陆
        </span>
      </div>
    </>
  );
};

export default ResisterForm;

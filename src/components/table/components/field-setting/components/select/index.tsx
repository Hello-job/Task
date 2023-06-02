import { memo } from 'react';
import { Form, Input } from 'antd';

const Select = () => {
  return (
    <Form.Item>
      <Input placeholder="请输入选择名称" />
    </Form.Item>
  );
};

export default memo(Select);

import { memo } from 'react';
import { Form, Input } from 'antd';
import { Icon } from '@/components';
import { SelectColor as CustomSelectColor } from '@/components';
import type { Props } from '../types';
import type { FormInstance } from 'antd';

interface SelectItemType {
  color: string;
  value: string;
}
interface SelectItemProps {
  value?: string;
  form?: FormInstance<any>;
  onChange?: (params: string) => void;
  add?: (defaultValue?: any, insertIndex?: number | undefined) => void;
}

const SelectColor = ({ value, onChange, form }: SelectItemProps) => {
  const options =
    form
      ?.getFieldValue('options')
      ?.map((item: SelectItemType) => item.color)
      ?.filter(Boolean) ?? [];

  return (
    <CustomSelectColor
      onChange={({ color }) => {
        onChange && onChange(color);
      }}
      value={value}
      options={options}
    />
  );
};

const SelectItem = ({ value, onChange, add }: SelectItemProps) => {
  return (
    <Input
      value={value}
      autoFocus
      placeholder="请输入选择名称"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e.target.value);
      }}
      onPressEnter={() => {
        add && add();
      }}
    />
  );
};

const Select: React.FC<Props> = ({ form }: Props) => {
  return (
    <>
      <Form.List name="options">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => {
              return (
                <div className="flex items-center mb-2.5" key={key}>
                  <Form.Item className="mb-0" name={[name, 'color']}>
                    <SelectColor form={form} />
                  </Form.Item>
                  <Form.Item className="mb-0" name={[name, 'value']}>
                    <SelectItem add={add} />
                  </Form.Item>
                  <Icon
                    type="icondelete24"
                    className="ml-4 text-base text-textLight"
                    onClick={() => remove(key)}
                  />
                </div>
              );
            })}
            <div
              className="text-sm text-violet flex items-center mt-2 ml-9"
              onClick={() => add()}>
              <Icon type="iconjia" />
              <span>新增选项</span>
            </div>
          </>
        )}
      </Form.List>
    </>
  );
};

export default memo(Select);

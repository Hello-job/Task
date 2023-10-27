import { memo, useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import type { SortableEvent } from 'sortablejs';
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

const arraySort = (arr: any[], oldIndex: number, newIndex: number) => {
  const newArr = arr.slice();
  const oldItem = newArr[oldIndex];
  newArr.splice(oldIndex, 1);
  newArr.splice(newIndex, 0, oldItem);
  return newArr;
};

const SelectColor = ({ value, onChange, form }: SelectItemProps) => {
  const options =
    form
      ?.getFieldValue('props')
      ?.options?.map((item: SelectItemType) => item?.color)
      ?.filter(Boolean) ?? [];

  return (
    <CustomSelectColor
      getPopupContainer={() => document.getElementById('selectColorForm')}
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
        add &&
          add({
            id: `${+new Date().getTime()}`.slice(4)
          });
      }}
    />
  );
};

const Select: React.FC<Props> = ({ form }: Props) => {
  const sortHeaderCellRef = useRef(null);
  const [options, setOptions] = useState(form.getFieldsValue().options);

  const onEnd = (event: SortableEvent) => {
    const { newIndex, oldIndex } = event;
    const { options } = form.getFieldsValue();
    if (oldIndex === undefined || newIndex === undefined) return;
    const newOptions = arraySort(options, oldIndex, newIndex);
    setOptions([...newOptions]);
    // form.setFieldValue('options', newOptions);
  };

  useEffect(() => {
    const sortableList = sortHeaderCellRef.current;
    if (sortableList) {
      const sortable = new Sortable(sortableList, {
        animation: 150, // 拖动时的动画时长（毫秒）
        handle: '#handle',
        onEnd
      });
    }
  }, [sortHeaderCellRef?.current]);

  return (
    <>
      <Form.List name={['props', 'options']}>
        {(fields, { add, remove }) => (
          <div
            ref={sortHeaderCellRef}
            id="selectColorForm"
            className="max-h-40 overflow-auto my-2">
            {fields.map(({ key, name, ...restField }, index) => {
              return (
                <div
                  data-id={key}
                  key={index}
                  className={`flex items-center mb-2.5`}>
                  <div id="handle" className="mr-2">
                    <Icon type="icondrag_drop" />
                  </div>
                  <Form.Item
                    {...restField}
                    className="mb-0"
                    name={[name, 'color']}>
                    <SelectColor form={form} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    className="mb-0"
                    name={[name, 'name']}>
                    <SelectItem add={add} />
                  </Form.Item>
                  <Icon
                    type="icondelete24"
                    className="ml-4 text-base text-textLight"
                    onClick={() => remove(index)}
                  />
                </div>
              );
            })}
            <div
              className="text-sm text-violet-500 flex items-center mt-2 ml-9"
              onClick={() =>
                add({
                  id: `${+new Date().getTime()}`.slice(4)
                })
              }>
              <Icon type="iconjia" />
              <span>新增选项</span>
            </div>
          </div>
        )}
      </Form.List>
    </>
  );
};

export default memo(Select);

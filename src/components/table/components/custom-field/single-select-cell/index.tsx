import { useState } from 'react';
import { Popover } from 'antd';
import { Icon } from '@/components';
import type { IProps } from '../interface';

interface optionType {
  id: number;
  value: number;
  name: string;
  color: string;
}

const SingleSelect = ({ column, rowItem, onChange }: IProps) => {
  const defaultValue = rowItem[column.name];
  const options = column.field?.props?.options ?? [];
  const selectItem = options.find(
    (item: optionType) => item.value === defaultValue
  );
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const showItem = (value: optionType) => {
    const { name, color } = value || {};
    return (
      <div
        className="px-2 rounded-[10px] text-xs h-5 leading-5"
        style={{ backgroundColor: color }}>
        {name}
      </div>
    );
  };
  const content = () => {
    return (
      <div className="">
        {options.map((opt: optionType) => {
          return (
            <div
              className="py-2 hover:bg-[#d0d7de52] min-w-[150px] max-w-[270px] cursor-pointer flex justify-between px-2 rounded-[4px]"
              onClick={() => {
                onChange({
                  column,
                  rowItem,
                  value: opt.value
                });
                setOpen(false);
              }}
              key={opt.value}>
              {showItem(opt)}
              {opt.value === selectItem?.value && (
                <Icon className=" text-violet" type="iconselected" />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Popover
      open={open}
      onOpenChange={handleOpenChange}
      trigger="click"
      placement="bottomLeft"
      content={content()}>
      <div className="flex items-center justify-between">
        {showItem(selectItem)}
        <Icon className=" text-textLight" type="iconcaret-down" />
      </div>
    </Popover>
  );
};

export default SingleSelect;

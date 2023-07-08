import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Input } from 'antd';
import { Icon } from '@/components';
import cls from 'classnames';
import type { IStore } from '../user-info/context';

interface TextInfoType {
  onChange?: IStore['onChange'];
  fieldKey: string;
  className?: string;
  text: string;
  style?: CSSProperties;
}

const TextInfo = ({
  onChange,
  fieldKey,
  style,
  className = '',
  text = ''
}: TextInfoType) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(text);

  const handleChange = (value: string) => {
    setEdit(false);
    if (value === text) return;
    onChange &&
      onChange({
        [fieldKey]: value
      });
    setEdit(false);
  };

  return (
    <>
      {edit ? (
        <Input
          autoFocus
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={e => handleChange(e.target.value)}
          onPressEnter={() => handleChange(value)}
        />
      ) : (
        <>
          <span
            style={style}
            className={cls(' text-textGray', {
              'text-violet': !text,
              className
            })}>
            {text ? text : '暂无'}
          </span>
          <Icon
            type="icondetails_edit"
            className={cls('text-textGray ml-2', className)}
            onClick={() => setEdit(true)}
          />
        </>
      )}
    </>
  );
};

export default TextInfo;

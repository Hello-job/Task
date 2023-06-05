import { useState, useMemo } from 'react';
import { Popover } from 'antd';
import { colors } from './data';

interface SelectColorProps {
  value?: string;
  options?: string[];
  onChange?: (params: any) => void;
  alreadyExists?: string[];
}

interface ContentProps extends SelectColorProps {
  setOpen: (visible: boolean) => void;
}

const Content = ({ value, onChange, setOpen }: ContentProps) => {
  return (
    <div className="w-60 flex items-center flex-wrap">
      {colors.map(color => {
        return (
          <div
            key={color}
            className={`border-2 border-solid rounded-full mr-4 mb-4`}
            style={{
              borderColor: value === color ? '#7b67ee' : 'transparent'
            }}
            onClick={() => {
              onChange && onChange({ color });
              setOpen(false);
            }}>
            <div
              className={`w-5 h-5 rounded-full border-2 border-solid border-white`}
              style={{ backgroundColor: color }}></div>
          </div>
        );
      })}
    </div>
  );
};

const SelectColor = ({ value, options, onChange }: SelectColorProps) => {
  const [open, setOpen] = useState(false);

  const currentColor = useMemo(() => {
    if (!value) {
      if (!options?.length) {
        return colors[0];
      }
      const indexArr = colors.map((_, index) => {
        const findex = options.findIndex(color => color === _);
        return ~findex ? value : _;
      });
      return indexArr[0];
    } else {
      return value;
    }
  }, [value]);

  return (
    <Popover
      open={open}
      placement="left"
      trigger={['click']}
      content={
        <Content value={currentColor} onChange={onChange} setOpen={setOpen} />
      }
      onOpenChange={(visible: boolean) => {
        setOpen(visible);
      }}>
      <div
        className="w-5 h-5 rounded-full bg-violet mr-4"
        style={{ backgroundColor: currentColor ?? '#7b67ee' }}></div>
    </Popover>
  );
};

export default SelectColor;

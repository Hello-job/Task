import cls from 'classnames';
import { colors } from '@/components/select-color';

interface AvatarColorProps {
  activeColor: string;
  onChange: (params: string) => void;
}

const AvatarColor = ({ activeColor, onChange }: AvatarColorProps) => {
  return (
    <div className="w-full h-[236px] pt-[30px]">
      <div className="w-full flex flex-wrap">
        {colors.map(color => {
          return (
            <div
              key={color}
              onClick={() => {
                onChange(color);
              }}
              style={{ backgroundColor: color }}
              className={cls('w-10 h-10 rounded-full mb-5 mr-5', {
                'border-2 border-solid border-violet-500': color === activeColor
              })}></div>
          );
        })}
      </div>
    </div>
  );
};

export default AvatarColor;

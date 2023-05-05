import React, { useEffect, useRef } from 'react';
import Styles from './index.module.less';
import cls from 'classnames';
import { throttle } from 'lodash';

interface ColResizeType {
  minWidth: number;
  maxWidth: number;
  onChange: (width: number) => void;
}

const ColResize = ({ minWidth, maxWidth, onChange }: ColResizeType) => {
  const resizeDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentDom = resizeDom.current;
    if (!currentDom) return;
    const handleReSize = throttle(() => {
      currentDom.style.backgroundColor = '#7b67ee';

      const resize = (event: MouseEvent) => {
        let clientX = event.clientX;
        if (clientX > maxWidth) {
          clientX = maxWidth;
        } else if (clientX < minWidth) {
          clientX = minWidth;
        }
        onChange(clientX);
      };
      const handleMouseUp = () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', resize);
        currentDom.style.backgroundColor = 'transparent';
      };
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', handleMouseUp);
    }, 200);

    currentDom?.addEventListener('mousedown', handleReSize);
    return () => {
      currentDom?.removeEventListener('mousedown', handleReSize);
    };
  }, [resizeDom.current]);

  return (
    <div
      ref={resizeDom}
      className={cls(
        'w-[1px] h-full absolute right-0 top-0',
        Styles.colResize
      )}>
      <div className="w-[6px] h-10 rounded-md a-v-h-center hover:bg-skin-text-primary"></div>
    </div>
  );
};

export default ColResize;

import { useEffect, useRef } from 'react';
import { throttle } from 'lodash-es';
import cls from 'classnames';

interface FloatingBallType {
  children: JSX.Element | JSX.Element[];
  className?: string;
}
const FloatingBall = ({ children, className }: FloatingBallType) => {
  const floatBallRef = useRef<HTMLDivElement>(null);

  const handlePosition = (
    direction: number,
    floatBallDom: HTMLDivElement,
    key: keyof Pick<HTMLDivElement, 'clientWidth' | 'clientHeight'>
  ) => {
    if (direction <= 0) {
      direction = 0;
    } else if (direction + floatBallDom[key] >= document.body[key]) {
      direction = document.body[key] - floatBallDom[key];
    }
    return direction;
  };

  const handleMouse = throttle((event: MouseEvent) => {
    const floatBallDom = floatBallRef.current;
    if (!floatBallDom) return;
    const offsetX = event.offsetX;
    const offsetY = event.offsetY;

    const handleMove = (event: MouseEvent) => {
      let right =
        document.body.clientWidth -
        (event.clientX - offsetX) -
        floatBallDom.clientWidth;
      let bottom =
        document.body.clientHeight -
        (event.clientY - offsetY) -
        floatBallDom.clientHeight;
      right = handlePosition(right, floatBallDom, 'clientWidth');
      bottom = handlePosition(bottom, floatBallDom, 'clientHeight');

      floatBallDom.style.bottom = bottom + 'px';
      floatBallDom.style.right = right + 'px';
    };

    const handleUp = () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
  }, 100);

  useEffect(() => {
    const floatBallDom = floatBallRef.current;
    if (!floatBallDom) return;
    floatBallDom?.addEventListener('mousedown', handleMouse);
    return () => {
      floatBallDom?.removeEventListener('mousedown', handleMouse);
    };
  }, [floatBallRef.current]);
  return (
    <div
      ref={floatBallRef}
      draggable={false}
      className={cls('fixed', className)}
      style={{
        bottom: '52px',
        right: '52px'
      }}>
      {children}
    </div>
  );
};

export default FloatingBall;

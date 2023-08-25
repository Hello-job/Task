import { memo } from 'react';

interface FixLeftCellRightMenuType {
  menuPosition: {
    x: number;
    y: number;
  };
}

const TdMenu = ({ menuPosition }: FixLeftCellRightMenuType) => {
  return (
    <>
      {
        <div
          className="fixed z-[1000] rounded-md shadow-base bg-white py-2 px-1 text-sm text-textGray"
          style={{
            top: menuPosition.y,
            left: menuPosition.x
          }}>
          <div className="py-1 px-2 cursor-pointer hover:bg-grayCustom">
            上方插入行
          </div>
          <div className="py-1 px-2  cursor-pointer hover:bg-grayCustom">
            下方插入行
          </div>
          <div className="py-1 px-2  cursor-pointer hover:bg-grayCustom">
            删除行
          </div>
        </div>
      }
    </>
  );
};

export default memo(TdMenu);

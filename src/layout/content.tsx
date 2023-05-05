import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Content = () => {
  return (
    <div className="flex-1 bg-[#f5f7fa] h-full p-5 overflow-hidden">
      <Suspense fallback={<>loading...</>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Content;

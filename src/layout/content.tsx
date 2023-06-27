import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loading } from 'surprisec-react-components';

const Content = () => {
  return (
    <div className="flex-1 bg-[#f5f7fa] h-full p-5 overflow-hidden">
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Content;

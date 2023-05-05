import { useMemo, useContext, memo } from 'react';
import { LoginComponets } from './constans';
import { LoginContext } from './context';

const Layout = () => {
  const {
    state: { pageType }
  } = useContext(LoginContext);
  const LayoutComponent = useMemo(() => {
    return LoginComponets[pageType];
  }, [pageType]);

  return <LayoutComponent />;
};

export default Layout;

import { useMemo, createContext, ReactNode } from 'react';

const initialState = {};

interface UpdateValue {
  name: string;
  phone: string;
  desc: string;
  color: string;
  avatar: string;
}

interface IStore {
  personalInfo: any;
  onChange: (value: Partial<UpdateValue>) => void;
  onUpdateField: (file: any) => Promise<any>;
}

const parInfoContext = createContext<Partial<IStore>>(initialState);

const { Provider } = parInfoContext;

const PersonalInfoProvider = ({
  children,
  props
}: {
  children: ReactNode;
  props: IStore;
}) => {
  const value = useMemo(() => {
    return {
      ...props
    };
  }, [props]);

  return <Provider value={value}>{children}</Provider>;
};

export type { UpdateValue, IStore };
export { PersonalInfoProvider, parInfoContext };

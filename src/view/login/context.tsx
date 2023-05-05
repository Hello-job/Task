import { createContext, useReducer, useMemo, ReactNode } from 'react';
import type { Dispatch } from 'react';

enum ActionType {
  Login = 'login',
  Register = 'register'
}

const initialState = {
  pageType: 'login',
  title: '手机号登陆'
};

type InitialState = typeof initialState;

type LoginProviderProps = {
  children: ReactNode;
};

interface IActionType extends InitialState {
  type: string;
}

type IStore = {
  state: InitialState;
  dispatch: Dispatch<Partial<IActionType>>;
};

const LoginContext = createContext({ state: initialState } as IStore);
const { Provider } = LoginContext;

function LoginProvider({ children }: LoginProviderProps) {
  /**
   * Reducer
   */
  const [state, dispatch] = useReducer(
    (state: InitialState, action: IActionType) => {
      switch (action.type) {
        case ActionType.Login:
          return {
            ...state,
            pageType: 'login',
            title: '手机号登陆'
          };
        case ActionType.Register:
          return {
            ...state,
            pageType: 'register',
            title: '账号注册'
          };
        default: {
          return initialState;
        }
      }
    },
    {
      ...initialState
    }
  );
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <Provider value={value as IStore}>{children}</Provider>;
}

export { ActionType, LoginProvider, LoginContext };

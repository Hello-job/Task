import LoginForm from './login-form';
import RegisterForm from './register-form';
import { ActionType } from './context';

const LoginComponets: Record<string, () => JSX.Element> = {
  [ActionType.Login]: LoginForm,
  [ActionType.Register]: RegisterForm
};

export { LoginComponets };

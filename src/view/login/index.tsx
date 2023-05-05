import { LoginProvider } from './context';
import Layout from './layout';

export default function Login() {
  return (
    <div
      className="w-full h-full "
      style={{
        backgroundImage: 'linear-gradient(315deg, #7f53ac 0%, #647dee 74%)'
      }}>
      <div className="w-full h-full flex">
        <div className="flex-[6_1] min-w-[800px]"></div>
        <div className="flex-[4_1] min-w-[800px] pt-[21.3vh] px-[7vw] pb-10">
          <div className="w-[320px] bg-skin-bg-base shadow-[0_4px_24px_#e0e0e0] pt-6 px-6 pb-[54px]">
            <LoginProvider>
              <Layout />
            </LoginProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
// background-color: #7f53ac;
// background-image: ;

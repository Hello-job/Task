import { Switch } from 'antd';
const THEMELIST = ['theme-deep'];
const body = document.body;

export const ThemeSwitch = () => {
  return (
    <div className="mr-2.5">
      <Switch
        checkedChildren="标准"
        unCheckedChildren="深夜"
        onChange={value => {
          if (value) {
            body.classList.add('theme-deep');
          } else {
            THEMELIST.forEach(theme => {
              body.classList.remove(theme);
            });
          }
        }}
      />
    </div>
  );
};

export default ThemeSwitch;

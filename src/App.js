import { Button, Select, message } from "antd";
import changeColors from "./theme/css-variable";
import "./App.less";
import "./theme/base.less";
import "./theme/home/index.less";

const { Option } = Select;

const themeMap = {
  1: "light",
  2: "dark",
};

function App() {
  const changeTheme = (mode) => {
    changeColors(mode);
  };

  return (
    <div className={"root"}>
      <div className={"main"}>
        <Select
          defaultValue="1"
          onChange={(v) => {
            changeTheme(themeMap[v]);
          }}
        >
          <Option value="1">亮色</Option>
          <Option value="2">暗色</Option>
        </Select>
        <div className={"center"}></div>
        <Button
          type="primary"
          onClick={() => {
            message.success("主题修改成功");
            message.error("主题修改成功");
            message.warning("主题修改成功");
          }}
        >
          按钮
        </Button>
        <div className={"footer"}></div>
      </div>
    </div>
  );
}

export default App;

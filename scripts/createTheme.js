const path = require("path");
const { generateTheme } = require("antd-theme-generator");
const lessFilePaths = require('./utils/getSelfThemeFiles');

const options = {
  stylesDir: path.join(__dirname, "../src/theme"), // 指定自定义less的入口目录，页面使用@primary-color等变量的class类声明都应该在这个目录下面
  antDir: path.join(__dirname, "../node_modules/antd"), // antd目录
  varFile: path.join(__dirname, "../src/theme/antd-theme.less"), // antd主题变量默认值(需要覆盖antd的默认主题)设置目录
  // mainLessFile: [
  //   path.join(__dirname, "../src/theme/base.less"),
  //   path.join(__dirname, "../src/theme/home/index.less"),
  // ], // 自定义样式的目录，必须都在stylesDir里面
  mainLessFile: [
    ...lessFilePaths
  ], 
  themeVariables: [
    "@primary-color",
    "@link-color",
    "@success-color",
    "@warning-color",
    "@error-color",
  ], // 需要修改的变量名
  outputFilePath: path.join(__dirname, "../public/theme.less"), // 脚本执行后的less存放目录
};

generateTheme(options)
  .then((less) => {
    console.log("Theme generated successfully");
  })
  .catch((error) => {
    console.log("Error", error);
  });


/*
  对于npm run build 后出现的一些问题: 
  1.页面资源路径加载不对: 在package.json里面添加 "homepage": "./";
  2.直接打开页面会报跨域问题: 在build后的目录下面启动一个服务器,可以使用http-server。
*/

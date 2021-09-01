const fs = require("fs");
const path = require("path");
const { generateTheme } = require("antd-theme-generator");
const chalk = require("chalk");

const _path = "./src/theme";
const lessRegex = /\.less$/;

const fileRes = [];

console.log(chalk.cyan("正在读取less文件..."));

function  MergeLessFile(options){

};

MergeLessFile.prototype.apply = (compiler) => {
  compiler.hooks.watchRun.tap('MergeLessFile', (compilation, callback) => {
    const getLessFiles = (__path) => {
      try {
        // 同步的读取文件目录
        const files = fs.readdirSync(__path);
        files.forEach((file) => {
          const curPath = `${__path}/${file}`;
          const stats = fs.statSync(curPath);
          // 判断是否为文件目录
          if (stats.isDirectory()) {
            getLessFiles(curPath);
          } else {
            // 过滤非less文件
            if (lessRegex.test(curPath)) fileRes.push(path.join(path.resolve('.'), curPath));
          }
        });
        return fileRes;
      } catch (e) {
        console.log(e, "error");
      }
    };

    const res = getLessFiles(_path);
    console.log(chalk.yellow("less文件读取完成"));

    const options = {
      stylesDir: path.join(path.resolve('.'), "./src/theme"), // 指定自定义less的入口目录，页面使用@primary-color等变量的class类声明都应该在这个目录下面
      antDir: path.join(path.resolve('.'), "./node_modules/antd"), // antd目录
      varFile: path.join(path.resolve('.'), "./src/theme/antd-theme.less"), // antd主题变量默认值(需要覆盖antd的默认主题)设置目录
      // mainLessFile: [
      //   path.join(__dirname, "../src/theme/base.less"),
      //   path.join(__dirname, "../src/theme/home/index.less"),
      // ], // 自定义样式的目录，必须都在stylesDir里面
      mainLessFile: [
        ...res
      ],
      themeVariables: [
        "@primary-color",
        "@link-color",
        "@success-color",
        "@warning-color",
        "@error-color",
      ], // 需要修改的变量名
      outputFilePath: path.join(path.resolve('.'), "./public/theme.less"), // 脚本执行后的less存放目录
    };

    generateTheme(options)
      .then((less) => {
        console.log("Theme generated successfully");
        callback();
      })
      .catch((error) => {
        console.log("Error", error);
      });

  })
}

module.exports =  MergeLessFile;
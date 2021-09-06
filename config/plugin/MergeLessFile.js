const fs = require("fs");
const path = require("path");
const { generateTheme } = require("antd-theme-generator");
const chalk = require("chalk");

const _path = "./src";
const lessRegex = /\.less$/;

const fileDirRes = [path.join(path.resolve('.', _path))];
const fileRes = [];

/**
 * 获取src目录下面的所有目录的less文件
 * 目录是作为 stylesDir的参数，文件是作为mainLessFile的参数
*/ 
const getSrcDirectoryWithLessFiles = (rootPath) => {
  try {
    // 同步的读取文件目录
    const files = fs.readdirSync(path.join(path.resolve('.', rootPath)));
    files.forEach((file) => {
      const curPath = `${rootPath}/${file}`;
      const stats = fs.statSync(curPath);
      // 判断是否为文件目录
      if (stats.isDirectory()) {
        getSrcDirectoryWithLessFiles(curPath); // 递归的向下搜寻
      } else {
        // 过滤非less文件
        if (lessRegex.test(curPath)) fileRes.push(path.join(path.resolve('.'), curPath));
      }
    });
    return  fileRes
  } catch (e) {
    console.log(e, "error");
  }
}


function  MergeLessFile(options){
  // console.log('merge less file')
};

const pluginFunc = (callback) => {
  console.log(chalk.cyan("正在读取less文件..."));
  const res = getSrcDirectoryWithLessFiles(_path);

  const options = {
    stylesDir: [
      ...fileDirRes
    ], // 指定自定义less的入口目录
    antDir: path.join(path.resolve('.'), "./node_modules/antd"), // antd目录
    varFile: path.join(path.resolve('.'), "./src/theme/antd-theme.less"), // antd主题变量默认值(需要覆盖antd的默认主题)设置目录
    mainLessFile: [  // 自定义样式的目录，必须都在stylesDir里面
      ...res,
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
      callback()
      console.log(chalk.yellow("less文件读取完成,Theme generated successfully"));
    })
    .catch((error) => {
      console.log("Error", error);
    });
}

MergeLessFile.prototype.apply = (compiler) => {
  compiler.hooks.watchRun.tapAsync('MergeLessFile', (compilation,callback) => {
    pluginFunc(callback)
  })
}

module.exports =  MergeLessFile;
const fs = require("fs");
const chalk = require("chalk");

const _path = "./src/theme";
const lessRegex = /\.less$/;

const fileRes = [];

console.log(chalk.cyan("正在读取less文件..."));

const getLessFiles = (__path) => {
  try {
    // 读取文件目录
    const files = fs.readdirSync(__path);
    files.forEach((file) => {
      const curPath = `${__path}/${file}`;
      const stats = fs.statSync(curPath);
      // 判断是否为文件目录
      if (stats.isDirectory()) {
        getLessFiles(curPath);
      } else {
        // 过滤非less文件
        if (lessRegex.test(curPath)) fileRes.push(curPath);
      }
    });
    return fileRes;
  } catch (e) {
    console.log(e, "error");
  }
};

getLessFiles(_path);
setTimeout(() => {
  console.log(fileRes);
  console.log(chalk.yellow("less文件读取完成"));
}, 1000);

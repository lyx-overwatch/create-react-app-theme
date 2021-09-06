const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const _path = "./src";
const lessRegex = /\.less$/;

const fileDirRes = [path.join(path.resolve('.', _path))];
const fileRes = [];

console.log(chalk.cyan("正在读取less文件..."));

const getSrcDirectoryWithLessFiles = (rootPath) => {
  try {
    // 同步的读取文件目录
    const files = fs.readdirSync(path.join(path.resolve('.', rootPath)));
    files.forEach((file) => {
      const curPath = `${rootPath}/${file}`;
      const stats = fs.statSync(curPath);
      // 判断是否为文件目录
      if (stats.isDirectory()) {
        fileDirRes.push(path.join(path.resolve('.', curPath)));
        getSrcDirectoryWithLessFiles(curPath); // 递归的向下搜寻
      } else {
        // 过滤非less文件
        if (lessRegex.test(curPath)) fileRes.push(path.join(path.resolve('.'), curPath));
      }
    });
    return {
      fileDirRes,
      fileRes,
    };
  } catch (e) {
    console.log(e, "error");
  }
}

const res = getSrcDirectoryWithLessFiles(_path);
console.log(chalk.yellow("less文件读取完成"));

module.exports = res;

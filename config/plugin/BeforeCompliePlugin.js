const plugin = 'BeforeCompliePlugin';

class BeforeCompliePlugin {
  constructor(options) {
    if(options) console.log(options);
  }

  apply(compiler) {
    const hooks = compiler.hooks;
    hooks.beforeCompile.tapAsync(plugin, (compilation, callback) => {
      console.log('compilation', compilation);
      // console.log(callback);
      callback()
      // compilation.hooks.finishModules.tap(plugin, () => {
      //   console.log('finished');
      //   // return null;
      // })
    })
  }
}

module.exports = BeforeCompliePlugin;
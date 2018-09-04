const path = require('path');
const fs = require('fs');
const babelCore = require('@babel/core');
const babelOptions = JSON.parse(fs.readFileSync(`${__dirname}/../jest.babelrc`));

const vueCompiler = require('vue-template-compiler');
const transpile = require('vue-template-es2015-compiler');

function babelify(src) {
  return babelCore.transform(src, babelOptions).code;
}

// this is heavily based on vueify (Copyright (c) 2014-2016 Evan You)
function vueify(src, filePath) {
  function toFunction (code) {
    return transpile(`function render () {${code}}`);
  }

  const parts = vueCompiler.parseComponent(src, { pad: true });
  let script = '';
  if (!parts.script.lang) {
    script = babelify(parts.script.content);
  } else {
    throw new Error(`${filePath} : unknown <script lang="${parts.script.lang}">`);
  }
  // mostly copy & paste from vueify
  const compiled = vueCompiler.compile(parts.template.content);
  const template = {
    render: toFunction(compiled.render),
    staticRenderFns: `[${compiled.staticRenderFns.map(toFunction).join(',')}]`
  };

  let output = '';
  output +=
      ';(function(){\n' + script + '\n})()\n' +
      // babel 6 compat
      'if (module.exports.__esModule) module.exports = module.exports.default\n';
  output += 'var __vue__options__ = (typeof module.exports === "function"' +
      '? module.exports.options' +
      ': module.exports)\n';
  output +=
      '__vue__options__.render = ' + template.render + '\n' +
      '__vue__options__.staticRenderFns = ' + template.staticRenderFns + '\n';

  return output;
}

module.exports = {
  process(src, filePath) {
    const extension = path.extname(filePath);
    let output;
    switch (extension) {
      case '.js':
        output = babelify(src);
        break;
      case '.vue':
        output = vueify(src, filePath);
        break;
      default:
        output = src;
    }

    return output;
  }
};

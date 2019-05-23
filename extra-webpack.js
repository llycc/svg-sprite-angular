const SVGSpriter = require('svg-sprite');
const path = require('path');
const fs = require('fs');

// 合并svg的配置
const svgSpriteConfig = {
  svgIdPrefix: 'icon-',       // svg的id前缀
  insertLabelAfter: '<body>', // svg内容将会插入的标签后面
  iconDir: 'src/assets/icons'           // svg图标所在的文件夹
};

const svgSpriter = new SVGSpriter({
  dest: 'out',
  mode: {
    symbol: {
      inline: true
    }
  }
});
/**
 * @desc: 遍历指定目录下的svg文件，然后添加到待编译队列
 * @param: dir-指定目录
 * @param: idPrefix-svg id前缀
 * */
function addIcons(dir, idPrefix) {
  const subList = fs.readdirSync(path.resolve(__dirname, dir));
  subList.forEach((name) => {
    const pathSeg = path.join(dir,name);
    if (fs.statSync(path.resolve(__dirname, pathSeg)).isDirectory()) {
      addIcons(pathSeg, idPrefix);
    }
    if (!name.endsWith('.svg')) {
      return;
    }
    const realpath = path.resolve(__dirname, pathSeg);
    const fileData = fs.readFileSync(realpath, {encoding: 'utf-8'});
    const idName = `${idPrefix}${name}`;
    svgSpriter.add(path.resolve(__dirname, idName), idName, fileData);
  });
}

/**
 * @desc: 编译svg图标
 * @return<Promise<string>>
 * */
function compileSvg() {
  return new Promise((resolve, reject) => {
    svgSpriter.compile(function (error, result, data) {
      if (error) {
        reject(error);
        return;
      }
      resolve(result.symbol['sprite'].contents);
    });
  });
}

// svg编译插件
function SvgSpritePlugin(options) {}
SvgSpritePlugin.prototype.apply = function(compiler) {

  compiler.plugin('emit', function(compilation, callback) {
    const sourceContent = compilation.assets['index.html'].source();
    compileSvg().then((data) => {
      let labelIndex = sourceContent.indexOf(svgSpriteConfig.insertLabelAfter);
      if (labelIndex === -1) {
        throw(`can not find html label ${svgSpriteConfig.insertLabelAfter}`);
        callback();
        return;
      }
      labelIndex += svgSpriteConfig.insertLabelAfter.length;
      const outputContent = `${sourceContent.slice(0, labelIndex)}${data}${sourceContent.slice(labelIndex)}`;
      compilation.assets['index.html'].source = function() {
        return outputContent;
      };
      compilation.assets['index.html'].size = function() {
        return outputContent.length;
      };
      callback();
    }, (error) => {
      throw 'compile svg sprite failed.'
    });

  });
};

addIcons(svgSpriteConfig.iconDir, svgSpriteConfig.svgIdPrefix);

module.exports = {
  plugins: [
    new SvgSpritePlugin()
  ]
};

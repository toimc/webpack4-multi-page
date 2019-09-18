# Webpack 4.x多页面打包配置

## 配置思想

使用glob模块，读取对应目录下的HTML文件，形成对应的页面与js。



工程目录结构：

```
.
├── README.md
├── config
│   ├── env-config.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   ├── webpack.prod.conf.js
│   └── webpack.rules.conf.js
├── package.json
├── postcss.config.js
├── public
│   └── logo-long.png
└── src
    ├── assets
    │   ├── css
    │   │   └── common.css
    │   └── images
    │       └── time.jpg
    └── pages
        ├── deep_page
        │   └── page3
        ├── index
        │   ├── index.html
        │   ├── index.js
        │   └── index.scss
        ├── page1
        │   ├── index.html
        │   ├── index.js
        │   └── index.scss
        └── page2
            ├── index.html
            ├── index.js
            └── index.scss
```



主要的方法：

```js
function getEntry() {
    var entry = {};
    //读取src目录所有page入口
    glob.sync('./src/pages/**/*.js')
        .forEach(function (name) {
            var start = name.indexOf('src/') + 4,
                end = name.length - 3;
            var eArr = [];
            var n = name.slice(start, end);
            n = n.slice(0, n.lastIndexOf('/')); //保存各个组件的入口 
            n = n.split('pages/')[1];
            eArr.push(name);
            entry[n] = eArr;
        });
    return entry;
};
```



## 使用说明

安装依赖

```
npm install	
```

或者使用`yarn`

```
yarn install
```



测试命令：

```bash
yarn local

# or
npm run local
```

平时测试，注意这两个文件：`webpack.base.conf.js`，`webpack.dev.conf.js`

项目会运行在`localhost:8090`



打包命令：

```bash
yarn pro

#or
npm run pro
```



## 参考资料

- [webpack4_mpa_demo](https://github.com/Blubiubiu/webpack4_mpa_demo)
- [说明文档](https://juejin.im/post/5b9116086fb9a05d05307e96)
- [webpack官方网站](https://webpack.js.org)
- [webpack中文网](https://www.webpackjs.com/)
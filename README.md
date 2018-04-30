# VR创客教室

### 一些说明：
> * 使用了create-react-app，修改了一些配置，引入SASS等。
> * 由于项目使用了sass，不太好装，可以直接进入build目录下，开启服务器访问index.html。
> * 我将项目打包部署到了服务器上，也可以直接访问http://119.29.161.228/
> * 配置了mockjs， 在__mock__下，有注释说明。
> * 只配置了一个页面，运行起来时，请点击sidebar的。 ***全部课程***,其他页面内容相似，暂时没有弄哈。
> * 我的作品、  班级作品  （Tab页） 已完成，可以点击。
> * 分页组件已完成，可以点击。
> * 表单已完成，可以提交。 注意： 我配置的mock接口默认是。 新建作品的名称和作者为空时，创建作品失败，返回http状态码400。
 
### 已完成：
> * ui组件拆分
> * 引入redux, react-router
> * mockjs做假数据接口
> * 抽出service API映射层
> * 封装form组件，表单提交。 Form的表单验证功能已经做好，但是没有展示出来，找不到表单验证的PSD部分内容

### 项目目录说明：
```
***├── build                               // 打包后的项目 ***  
***├── config                              // npm run eject生成的，自己做了些调整 ***  
***├── src                                 // 源码目录 ***  
***│   ├── __mock__                        // mockjs接口配置 ***  
***│   ├── actions                         // redux的action ***  
***│       ├── types                       // action type ***  
***│       ├── *Action.js                  // 模块化action ***  
***│   ├── assets                          // 存放项目的静态资源 ***  
***│       ├── styles                      // 项目的公开用样式文件 ***  
***│       ├── svgs                        // 项目的公用svg文件 ***  
***│   ├── components                      // 一些可复用的组件 ***
***│       ├── *.js                        // 单文件组件 ***  
***│       ├── *                           // 一些含有配套资源的组件，使用文件夹一起存储 ***  
***│           ├── assets                  // 存放该组件所需要的一些静态资源 ***  
***│   ├── constants                       // 项目全局配置 ***  
***│   ├── containers                      // 页面（容器） ***
***│   ├── services                        // 服务器端接口数据映射,用es5编写，可以移植到nodejs平台运行 ***  
***│   ├── reducers                        // redux reducers ***  
***│   ├── utils                           // 封装的一些常用工具 ***  
***│   ├── Routes.js                       // react-router 路由配置 ***
***│   ├── index.js                        // 入口文件 ***
***│   ├── registerServiceWorker.js        // create-react-app配置的后台运行线程 ***
***├── .babelrc                            // babel配置文件 ***  
```

### 项目git地址：
[项目地址](https://github.com/greyu/work_ui_components)

# min_program_vampire

小程序

#### 工具配置 project.config.json

通常大家在使用一个工具的时候，都会针对各自喜好做一些个性化配置，例如界面颜色、编译配置等等，当你换了另外一台电脑重新安装工具的时候，你还要重新配置。

考虑到这点，小程序开发者工具在每个项目的根目录都会生成一个 project.config.json，你在工具上做的任何配置都会写入到这个文件，当你重新安装工具或者换电脑工作时，你只要载入同一个项目的代码包，开发者工具就自动会帮你恢复到当时你开发项目时的个性化配置，其中会包括编辑器的颜色、代码上传时自动压缩等等一系列选项。

小程序包含一个描述整体程序的app和多个描述各自页面的page

一个小程序主体部分由三个文件组成，必须放在项目的根目录：
- app.js
- app.json
- app.wxss

一个小程序的页面有四个文件组成

- xx.js
- xx.json
- xx.wxml
- xx.wxss

> 为了方便开发者减少配置项，描述页面的四个文件必须具有相同的路径与文件名

### 配置

app.json文件用来对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等

```json
{
  "pages": [
    "pages/index/index",
    "pages/logs/index"
  ],
  "window": {
    "navigationBarTitleText": "Demo"
  },
  "tabBar": {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页"
    }, {
      "pagePath": "pages/logs/logs",
      "text": "日志"
    }]
  },
  "networkTimeout": {
    "request": 10000,
    "downloadFile": 10000
  },
  "debug": true
}
```

- pages
- window
- tabBar
- networkTimeout
- debug

#### page.json

每一个小程序页面也可以使用.json文件来对本页面的窗口表现进行配置。 页面的配置比app.json全局配置简单得多，只是设置 app.json 中的 window 配置项的内容，页面中配置项会覆盖 app.json 的 window 中相同的配置项。

> 页面的.json只能设置 window 相关的配置项，以决定本页面的窗口表现，所以无需写 window 这个键

### 逻辑

小程序开发框架的逻辑层由 JavaScript 编写。

逻辑层将数据进行处理后发送给视图层，同时接受视图层的事件反馈。

在 JavaScript 的基础上，做了一些修改，以方便地开发小程序

- 增加 App 和 Page 方法，进行程序和页面的注册。
- 增加 getApp 和 getCurrentPages 方法，分别用来获取 App 实例和当前页面栈。
- 提供丰富的 API，如微信用户数据，扫一扫，支付等微信特有能力。
- 每个页面有独立的作用域，并提供模块化能力。
- 由于框架并非运行在浏览器中，所以 JavaScript 在 web 中一些能力都无法使用，如 document，window 等。
- 开发者写的所有代码最终将会打包成一份 JavaScript，并在小程序启动的时候运行，直到小程序销毁。类似 ServiceWorker，所以逻辑层也称之为 App Service。

#### App

App(),用来注册一个小程序，接受一个object参数，其指定小程序的生命周期函数等。

全局的 getApp() 函数可以用来获取到小程序实例

```js
var appInstance = getApp()
console.log(appInstance.globalData) // I am global data
```

注意：

- App() 必须在 app.js 中注册，且不能注册多个。
- 不要在定义于 App() 内的函数中调用 getApp() ，使用 this 就可以拿到 app 实例。
- 不要在 onLaunch 的时候调用 getCurrentPages()，此时 page 还没有生成。
- 通过 getApp() 获取实例之后，不要私自调用生命周期函数。

#### Page

Page(),函数用来注册一个页面。接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等

生命周期:

![page](https://mp.weixin.qq.com/debug/wxadoc/dev/image/mina-lifecycle.png?t=201828)

## API

### 模板调用

模板是无法默认对应CSS样式的，如要配对使用CSS样式，有三种方法

a.在全局样式中定义，即app.wxss
b.在业务页面对应的.wxss样式定义
c.先在模板中定义对应的CSS样式，再在业务页面的.wxss文件中import进去

### 自定义组件

开发者可以将页面内的功能模块抽象成自定义组件，以便在不同的页面中重复使用；也可以将复杂的页面拆分成多个低耦合的模块，有助于代码维护。自定义组件在使用时与基础组件非常相似

类似于页面，一个自定义组件由 json wxml wxss js 4个文件组成。

- json

要编写一个自定义组件，首先需要在 json 文件中进行自定义组件声明（将 component 字段设为 true 可这一组文件设为自定义组件）：

```json
{
  "component": true
}
```

- wxml

在组件模板中可以提供一个 <slot> 节点，用于承载组件引用时提供的子节点

```html
<!-- 组件模板 -->
<view class="wrapper">
  <view>这里是组件的内部节点</view>
  <slot></slot>
</view>
```

```html
<!-- 引用组件的页面模版 -->
<view>
  <component-tag-name>
    <!-- 这部分内容将被放置在组件 <slot> 的位置上 -->
    <view>这里是插入到组件slot中的内容</view>
  </component-tag-name>
</view>
```

默认情况下，一个组件的wxml中只能有一个slot。需要使用多slot时，可以在组件js中声明启用。

```js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: { /* ... */ },
  methods: { /* ... */ }
})
```
此时，可以在这个组件的wxml中使用多个slot，以不同的 name 来区分。

<!-- 组件模板 -->
<view class="wrapper">
  <slot name="before"></slot>
  <view>这里是组件的内部细节</view>
  <slot name="after"></slot>
</view>

使用时，用 slot 属性来将节点插入到不同的slot上。

<!-- 引用组件的页面模版 -->
<view>
  <component-tag-name>
    <!-- 这部分内容将被放置在组件 <slot name="before"> 的位置上 -->
    <view slot="before">这里是插入到组件slot name="before"中的内容</view>
    <!-- 这部分内容将被放置在组件 <slot name="after"> 的位置上 -->
    <view slot="after">这里是插入到组件slot name="after"中的内容</view>
  </component-tag-name>
</view>

- wxss

组件对应 wxss 文件的样式，只对组件wxml内的节点生效。编写组件样式时，需要注意以下几点

- 组件和引用组件的页面不能使用id选择器（#a）、属性选择器（[a]）和标签名选择器，请改用class选择器。
- 组件和引用组件的页面中使用后代选择器（.a .b）在一些极端情况下会有非预期的表现，如遇，请避免使用。
- 子元素选择器（.a>.b）只能用于 view 组件与其子节点之间，用于其他组件可能导致非预期的情况。
- 继承样式，如 font 、 color ，会从组件外继承到组件内。
- 除继承样式外， app.wxss 中的样式、组件所在页面的的样式对自定义组件无效。

> 在组件wxss中不应使用ID选择器、属性选择器和标签名选择器

- js

在自定义组件的 js 文件中，需要使用 Component() 来注册组件，并提供组件的属性定义、内部数据和自定义方法。

```js
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function(){}
  }
})
```

使用自定义组件:

使用已注册的自定义组件前，首先要在页面的 json 文件中进行引用声明。此时需要提供每个自定义组件的标签名和对应的自定义组件文件路径：

```json
{
  "usingComponents": {
    "component-tag-name": "path/to/the/custom/component"
  }
}
```

## wxss

不能像less/sass那样很难受...
微信样式

与 CSS 相比，WXSS 扩展的特性有：

- 尺寸单位
- 样式导入

rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

> 建议： 开发微信小程序时设计师可以用 iPhone6 作为视觉稿的标准。

> 注意： 在较小的屏幕上不可避免的会有一些毛刺，请在开发时尽量避免这种情况。

使用@import语句可以导入外联样式表，@import后跟需要导入的外联样式表的相对路径，用;表示语句结束。

### 内联样式

内联样式
框架组件上支持使用 style、class 属性来控制组件的样式。

`style`：静态的样式统一写到 class 中。style 接收动态的样式，在运行时会进行解析，请尽量避免将静态的样式写进 style 中，以免影响渲染速度。

```html
<view style="color:{{color}};" />
```

`class`：用于指定样式规则，其属性值是样式规则中类选择器名(样式类名)的集合，样式类名不需要带上.，样式类名之间用空格分隔。

```html
<view class="normal_view" />
```

全局样式与局部样式
定义在 app.wxss 中的样式为全局样式，作用于每一个页面。在 page 的 wxss 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 app.wxss 中相同的选择器。

## 发布

## 问题

- 一开始编译出错，更新了一下最新客户端，问题好了
- 自定义的组件，提示找不到路径。
  解决: 写相对路径/或者绝对路径都可以，然后不能写后缀名字
  比如："turntable": "../components/turntable/turntable.wxml" 这种写法不对
  要写成: "turntable": "../components/turntable/turntable"
- 

## icon(svg)的使用

## 开放的能力

### web-view

1. 个人类型与海外类型的小程序暂不支持使用。

2. js-sdk接口限制（具体请参考 官方api ）。

3. 每个页面只能有一个< web-view />。

4. 最多可以添加20个业务域名。

5. 一年只可修改50次业务域名。

```html
<!-- wxml -->
<!-- 指向微信公众平台首页的web-view -->
<web-view src="https://mp.weixin.qq.com/"></web-view>
```

#### Bug & Tip

- 网页内iframe的域名也需要配置到域名白名单。
- 开发者工具上，可以在 <web-view/> 组件上通过右键 - 调试，打开 <web-view/> 组件的调试。
- 每个页面只能有一个<web-view/>，<web-view/>会自动铺满整个页面，并覆盖其他组件。
- <web-view/>网页与小程序之间不支持除JSSDK提供的接口之外的通信。
- 在iOS中，若存在JSSDK接口调用无响应的情况，可在<web-view/>的src后面加个#wechat_redirect解决。

### open-data

可能在群的时候才能用

### 小程序的生命周期

```js
App({
  onLaunch: function(options) {
    // Do something initial when launch.
  },
  onShow: function(options) {
      // Do something when show.
  },
  onHide: function() {
      // Do something when hide.
  },
  onError: function(msg) {
    console.log(msg)
  },
  globalData: 'I am global data'
})
```





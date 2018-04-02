小程序开发——Vampire

> 由于钟爱吸血鬼故事，所以一般项目都回以**Vampire**命名

> 由于基本思想是学习，所以这个项目不能说是产品，而是任性的试验品.


![vampire](https://yulongge.github.io/images/minprogram/index.jpg)

以下总结一下在开发Vampire中对于小程序开发和实践的一些总结，至于具体的api,还是参考官网的，已经很详细了

[小程序官方开发文档](https://mp.weixin.qq.com/debug/wxadoc/dev/index.html)



#### 构建项目目录

我们用开发者工具，新建项目以后，会有默认的目录文件，当然了我们可以增加我们的目录，使我们的目录结构清晰且好维护.

```
├ assets 				//静态资源，放置字体，图片等
├ components 			//抽离的公共组件
├ pages 				//业务页面逻辑，样式
├ utils 				//工具
├ README.md 			//项目说明
├ api.md 				//api文档
├ app.js 				//项目的js逻辑
├ app.json 				//小程序的全局配置
├ app.wxss 				//小程序的全局样式
├ project.config.json 	//工具配置
└ weui.wxss 			//引入weui样式
```

以上为项目目录,小程序的文件类型基本有四种:

- .json 后缀的 JSON 配置文件
- .wxml 后缀的 WXML 模板文件
- .wxss 后缀的 WXSS 样式文件
- .js 后缀的 JS 脚本逻辑文件

##### 项目级别的文件(项目根目录下的文件):

小程序主题部分有三个文件组成，必须放在项目更目录下(参考上边项目目录)

|文件| 必填|作用|
| -- | -- | -- |
|app.js| 是|小程序的逻辑|
|app.wxss| 否|小程序的公共样式|
|app.json| 是|小程序的全局配置，包括了小程序的所有页面路径、界面表现、网络超时时间、底部 tab 等|
|project.config.json| 否|保存我们开发工具所设置的配置，保证我们在不同的电脑上的设置同步(界面颜色，编译配置等,工具自动生成)|

##### 页面文件，有四个文件组成

```
 └ pages 				
	└ index
		├ index.js 	
		├ index.wxml
		├ index.wxss
		└ index.json 			
```

|文件类型| 必填|作用|
| -- | -- | -- |
|js| 是|页面逻辑|
|wxml| 是|页面结构|
|wxss| 否|页面样式表|
|json| 否|页面配置|

> 为了方便开发者减少配置项，描述页面的四个文件必须具有相同的路径与文件名

以上是目录文件和简单说明，具体的细节参考官网文档，来说一些注意的地方:


`app.json`

- pages属性，为数组，每项的文件名不需要写文件后缀
- window属性，navigationStyle 只在 app.json 中生效

`page.json`

只能设置windown相关的配置,所以无需写window 这个键， 会覆盖app.json中window属性的相同配置

由于框架并非运行在浏览器中，所以 JavaScript 在 web 中一些能力都无法使用，如 document，window 等。

#### 项目分析

##### 全局配置分析

`app.json`

```js
{
	"pages":[
		"pages/index/index",
		"pages/tool/tool",
		"pages/explore/explore",
		"pages/myself/myself",
		"pages/logs/logs",
		"pages/literature/literature",
		"pages/television/television",
		"pages/music/music",
		"pages/laohan/laohan",
		"pages/exploredetail/exploredetail",
		"pages/vote/vote"
	],
}
```

想要访问我们的页面记得从这里配置路由，每建立一个页面，都记得在这里添加一下。

`app.js`

我们需要在这里注册我们小程序，用App()来注册，接受一个Object参数，指定小程序的生命周期等

|属性|类型|描述| 触发时机|
| --- | --- | --- | --- |
|onLaunch| Function| 生命周期函数--监听小程序初始化|当小程序初始化完成时，会触发 onLaunch（全局只触发一次）|
|onShow| Function| 生命周期函数--监听小程序显示|当小程序初始化完成时，会触发 onLaunch（全局只触发一次）|
|onHide| Function| 生命周期函数--监听小程序隐藏|当小程序初始化完成时，会触发 onLaunch（全局只触发一次）|
|onError| Function| 错误监听函数|当小程序初始化完成时，会触发 onLaunch（全局只触发一次）|
|other| Any| |开发者可以添加任意的函数或数据到 Object 参数中，用 this 可以访问|

```js
App({
  onLaunch: function () {
  	//...
  },
  globalData: {
  	//...
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        //withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
}
```

全局的getApp()函数可以用来获取到小程序实例。

```js
// other.js
var appInstance = getApp()
console.log(appInstance.globalData) // I am global data
```
注意:

- App() 必须在 app.js 中注册，且不能注册多个。
- 不要在定义于 App() 内的函数中调用 getApp() ，使用 this 就可以拿到 app 实例。
- 不要在 onLaunch 的时候调用 getCurrentPages()，此时 page 还没有生成。
- 通过 getApp() 获取实例之后，不要私自调用生命周期函数。


#### 注册页面

Page() 函数用来注册一个页面。接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等

页面的函数比较多，也是一些页面周期函数，还有常用的钩子函数，加上一些自己定义的函数。

初始数据，data 将会以JSON的形式由逻辑层传至渲染层，所以其数据必须是可以转成JSON的格式，如字符串，数字，布尔，对象，数组.

```js
Page({
  data: {
    userInfo: {},
    nav: app.globalData.nav,
    recommends: [
      {
        id: "001",
        pic: "https://yulongge.github.io/images/min_programs/vampire/banner1.jpeg",
        title: "狂躁文学",
        url: "/pages/literature/literature"
      },
	 ]
  }
 })
```

```html
<view class="container">
  <vslider class="swiper"></vslider>
  <template is="recommend" data="{{recommends}}"/>
  <!-- <view class="gskill">
    <turntable inner-text="{{userInfo.nickName}}"></turntable>
  </view> -->
  <list datalist="{{homelist}}"></list>

  <template is="footer" data="{{nav: nav, active: 'home'}}"/>
</view>
```

- Page.prototype.route
- Page.prototype.setData()
- 直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
- 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
- 请不要把 data 中任何一项的 value 设为 undefined ，否则这一项将不被设置并可能遗留一些潜在问题。


### 组件

在工具页面尝试了不同的组件

![tool](https://yulongge.github.io/images/minprogram/tool.jpg)



开发者可以将页面内的功能模块抽象成自定义组件，以便在不同的页面中重复使用；也可以将复杂的页面拆分成多个低耦合的模块，有助于代码维护。自定义组件在使用时与基础组件非常相似

类似于页面，一个自定义组件由 json wxml wxss js 4个文件组成。

`json`

要编写一个自定义组件，首先需要在 json 文件中进行自定义组件声明（将 component 字段设为 true 可这一组文件设为自定义组件）：

```json
{
  "component": true
}
```
`wxml`

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

```html
<!-- 组件模板 -->
<view class="wrapper">
  <slot name="before"></slot>
  <view>这里是组件的内部细节</view>
  <slot name="after"></slot>
</view>
```

使用时，用 slot 属性来将节点插入到不同的slot上。

```html
<!-- 引用组件的页面模版 -->
<view>
  <component-tag-name>
    <!-- 这部分内容将被放置在组件 <slot name="before"> 的位置上 -->
    <view slot="before">这里是插入到组件slot name="before"中的内容</view>
    <!-- 这部分内容将被放置在组件 <slot name="after"> 的位置上 -->
    <view slot="after">这里是插入到组件slot name="after"中的内容</view>
  </component-tag-name>
</view>
```

`wxss`

组件对应 wxss 文件的样式，只对组件wxml内的节点生效。编写组件样式时，需要注意以下几点

- 组件和引用组件的页面不能使用id选择器（#a）、属性选择器（[a]）和标签名选择器，请改用class选择器。
- 组件和引用组件的页面中使用后代选择器（.a .b）在一些极端情况下会有非预期的表现，如遇，请避免使用。
- 子元素选择器（.a>.b）只能用于 view 组件与其子节点之间，用于其他组件可能导致非预期的情况。
- 继承样式，如 font 、 color ，会从组件外继承到组件内。
- 除继承样式外， app.wxss 中的样式、组件所在页面的的样式对自定义组件无效。

> 在组件wxss中不应使用ID选择器、属性选择器和标签名选择器

`js`

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

## 问题

1.`一开始编译出错，更新了一下最新客户端，问题好了`

2.`自定义的组件，提示找不到路径。`

解决: 写相对路径/或者绝对路径都可以，然后不能写后缀名字
比如："turntable": "../components/turntable/turntable.wxml" 这种写法不对
要写成: "turntable": "../components/turntable/turntable"

3.`web-view`

1. 个人类型与海外类型的小程序暂不支持使用。
2. js-sdk接口限制（具体请参考 官方api ）。
3. 每个页面只能有一个< web-view />。
4. 最多可以添加20个业务域名。
5. 一年只可修改50次业务域名。

### 视图层

框架视图层由WXML 与 WXSS 编写，有组件来进行展示。

> 将逻辑层的数据反应成视图，同时将视图层的事件发送给逻辑层


- `WXML(WeiXin Markup language)` 用于描述页面的结构。
- `WXS(WeiXin Script)` 是小程序的一套脚本语言，结合 WXML，可以构建出页面的结构。
- `WXSS(WeiXin Style Sheet)` 用于描述页面的样式。
- `组件(Component)` 是视图的基本组成单元。

> 我们会结合`weui-wxss`进行页面组建和渲染

##### 首页，如图所示


![index](https://yulongge.github.io/images/minprogram/index.jpg)

> 组件： silder, footer, panel

![tool](https://yulongge.github.io/images/minprogram/tool.jpg)

> 组件：grid

![explore](https://yulongge.github.io/images/minprogram/explore.jpg)

> 组件：flex

![myself](https://yulongge.github.io/images/minprogram/myself.jpg)

> 组件：tab, article

当然了子页面也很多，用到了不同的组件，进行api的学习，以后也在不断的完善中。

上图：

![music](https://yulongge.github.io/images/minprogram/music.jpg)


![movie](https://yulongge.github.io/images/minprogram/movie.jpg)

![han](https://yulongge.github.io/images/minprogram/han.jpg)

![vote](https://yulongge.github.io/images/minprogram/vote.jpg)

![camera](https://yulongge.github.io/images/minprogram/camera.jpg)

> 项目还在进行中，

`github`: https://github.com/yulongge/min_program_vampire.git

参考资料

- 小程序官方开发文档：https://mp.weixin.qq.com/debug/wxadoc/dev/index.html
- WeUI for 小程序: https://github.com/Tencent/weui-wxss/
- [技术分享]微生活去年的小程序总结: https://mp.weixin.qq.com/s/FASc3w_JJ5yfDZgAbmI0Sw
- [代码]会员卡2017版小程序: http://git.dev.acewill.net/welife/frontend/tree/master/weapp-card
- [代码]商户服务小程序: http://git.dev.acewill.net/welife/frontend/tree/master/weapp-report














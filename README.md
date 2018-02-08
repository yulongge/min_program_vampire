# min_program_vampire

小程序

## 账户

## API

### 模板调用

模板是无法默认对应CSS样式的，如要配对使用CSS样式，有三种方法

a.在全局样式中定义，即app.wxss
b.在业务页面对应的.wxss样式定义
c.先在模板中定义对应的CSS样式，再在业务页面的.wxss文件中import进去

### 自定义组件

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

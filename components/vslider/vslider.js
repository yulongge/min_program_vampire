Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    background: [
      'https://yulongge.github.io/images/min_programs/vampire/banner1.jpeg', 
      'https://yulongge.github.io/images/min_programs/vampire/banner2.jpeg', 
      'https://yulongge.github.io/images/min_programs/vampire/banner3.jpeg'   
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { },
    changeIndicatorDots: function (e) {
      this.setData({
        indicatorDots: !this.data.indicatorDots
      })
    },
    changeAutoplay: function (e) {
      this.setData({
        autoplay: !this.data.autoplay
      })
    },
    intervalChange: function (e) {
      this.setData({
        interval: e.detail.value
      })
    },
    durationChange: function (e) {
      this.setData({
        duration: e.detail.value
      })
    }
  }
})
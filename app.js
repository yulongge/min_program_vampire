//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    nav: [
      {
        id: "001",
        type: "home",
        className: "footer_active",
        title: "首页",
        pic: "/assets/svg/home.svg",
        url: "/pages/index/index"
      },
      {
        id: "001",
        type: "tools",
        className: "",
        title: "工具",
        pic: "/assets/svg/home.svg",
        url: "/pages/index/index"
      },
      {
        id: "001",
        title: "发现",
        type: "explore",
        className: "",
        selected: false,
        pic: "/assets/svg/home.svg",
        url: "/pages/index/index"
      },
      {
        id: "001",
        type: "me",
        className: "",
        selected: false,
        title: "我的",
        pic: "/assets/svg/home.svg",
        url: "/pages/index/index"
      }
    ]
  }
})
let app = getApp();
Page({
  data: {
    nav: app.globalData.nav,
    userInfo: app.globalData.userInfo
  },
  onLoad: function() {
    let _this = this;
    app.getUserInfo(function(userInfo) {
      _this.setData({
        userInfo: userInfo
      })
    });
  }
})
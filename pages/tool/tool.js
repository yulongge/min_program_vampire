let app = getApp();
Page({
  data: {
    nav: app.globalData.nav,
    userInfo: app.globalData.userInfo,
    toolList: [
      {
        id: "001",
        name: '投票',
        icon: "",
        desc: "投票啊",
        url: "/pages/vote/vote"
      },
      {
        id: "002",
        name: '抽奖',
        icon: "",
        desc: "抽奖啊",
        url: "/pages/literature/literature"
      },
      {
        id: "003",
        name: '大韩',
        icon: "",
        desc: "算利息啊",
        url: "/pages/laohan/laohan"
      },
      {
        id: "004",
        name: '石头剪子布',
        icon: "",
        desc: "算利息啊",
        url: "/pages/laohan/laohan"
      }
    ]
  },
  onLoad: function () {
    let _this = this;
    app.getUserInfo(function (userInfo) {
      _this.setData({
        userInfo: userInfo
      })
    });
  }
})
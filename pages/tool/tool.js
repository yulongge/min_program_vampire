let app = getApp();
Page({
  data: {
    nav: app.globalData.nav,
    toolList: [
      {
        id: "001",
        name: '投票',
        icon: "",
        desc: "投票啊"
      },
      {
        id: "002",
        name: '抽奖',
        icon: "",
        desc: "抽奖啊"
      }
    ]
  }
})
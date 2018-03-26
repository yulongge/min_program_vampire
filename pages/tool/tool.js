let app = getApp();
Page({
  data: {
    nav: app.globalData.nav,
    toolList: [
      {
        id: "001",
        name: '投票',
        icon: "",
        desc: "投票啊",
        url: "/pages/literature/literature"
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
        name: '大韩算钱',
        icon: "",
        desc: "算利息啊",
        url: "/pages/laohan/laohan"
      }
    ]
  }
})
let app = getApp();
Page({
  data: {
    nav: app.globalData.nav,
    userInfo: app.globalData.userInfo,
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    toolList: [
      {
        id: "0011",
        name: '拍照',
        icon: "",
        desc: "拍照",
        url: "/pages/camera/camera",
        pic: "../../assets/svg/camera.svg"
      },
      {
        id: "001",
        name: '投票',
        icon: "",
        desc: "投票啊",
        url: "/pages/vote/vote",
        pic: "../../assets/svg/upvote.svg"
      },
      {
        id: "002",
        name: '抽奖',
        icon: "",
        desc: "抽奖啊",
        url: "/pages/literature/literature",
        pic: "../../assets/svg/gift.svg"
      },
      {
        id: "003",
        name: '大韩',
        icon: "",
        desc: "算利息啊",
        url: "/pages/laohan/laohan",
        pic: "../../assets/svg/computer.svg"
      },
      {
        id: "004",
        name: '石头剪子布',
        icon: "",
        desc: "算利息啊",
        url: "/pages/laohan/laohan",
        pic: "../../assets/svg/cut.svg"
      },
      {
        id: "005",
        name: '算卦',
        icon: "",
        desc: "八卦",
        url: "/pages/laohan/laohan",
        pic: "../../assets/svg/bagua.svg"
      },
      {
        id: "006",
        name: '切图',
        icon: "",
        desc: "图片处理",
        url: "/pages/laohan/laohan",
        pic: "../../assets/svg/cutimage.svg"
      },
      {
        id: "007",
        name: '扫描',
        icon: "",
        desc: "扫描处理",
        url: "/pages/laohan/laohan",
        pic: "../../assets/svg/scan.svg"
      },
      {
        id: "008",
        name: '游戏',
        icon: "",
        desc: "小游戏",
        url: "/pages/laohan/laohan",
        pic: "../../assets/svg/game.svg"
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
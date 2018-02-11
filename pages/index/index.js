let app = getApp();
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
      {
        id: "003",
        pic: "https://yulongge.github.io/images/min_programs/vampire/banner2.jpeg", 
        title: "暴走影视",
        url: "/pages/television/television"
      },
      {
        id: "003",
        pic: "https://yulongge.github.io/images/min_programs/vampire/banner3.jpeg",
        title: "奇葩之歌",
        url: "/pages/music/music"
      },
    ],
    homelist: [
      {
        id: "001",
        pic: "https://yulongge.github.io/images/min_programs/vampire/banner1.jpeg",
        title: "来与说",
        url: "/pages/music/music",
        desc: "不知增减，何来传说"
      },
      {
        id: "002",
        pic: "https://yulongge.github.io/images/min_programs/vampire/banner2.jpeg",
        title: "奇葩之歌",
        url: "/pages/music/music",
        desc: "不知增减，何来传说"
      },
      {
        id: "003",
        pic: "https://yulongge.github.io/images/min_programs/vampire/banner3.jpeg",
        title: "奇葩之歌",
        url: "/pages/music/music",
        desc: "不知增减，何来传说"
      },
      {
        id: "004",
        pic: "https://yulongge.github.io/images/min_programs/vampire/banner1.jpeg",
        title: "来与说",
        url: "/pages/music/music",
        desc: "不知增减，何来传说"
      },
      {
        id: "005",
        pic: "https://yulongge.github.io/images/min_programs/vampire/banner2.jpeg",
        title: "奇葩之歌",
        url: "/pages/music/music",
        desc: "不知增减，何来传说"
      },
      {
        id: "006",
        pic: "https://yulongge.github.io/images/min_programs/vampire/banner3.jpeg",
        title: "奇葩之歌",
        url: "/pages/music/music",
        desc: "不知增减，何来传说"
      },
      {
        id: "007",
        pic: "https://yulongge.github.io/images/min_programs/vampire/banner1.jpeg",
        title: "来与说",
        url: "/pages/music/music",
        desc: "不知增减，何来传说"
      },
      {
        id: "008",
        pic: "https://yulongge.github.io/images/min_programs/vampire/banner2.jpeg",
        title: "奇葩之歌",
        url: "/pages/music/music",
        desc: "不知增减，何来传说"
      },
      {
        id: "009",
        pic: "https://yulongge.github.io/images/min_programs/vampire/banner3.jpeg",
        title: "奇葩之歌",
        url: "/pages/music/music",
        desc: "不知增减，何来传说"
      },
    ]

    
  },
  onLoad: function(e) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
})

let app = getApp();
Page({
  data: {
    nav: app.globalData.nav,
    interestTypes: [
      { name: '普通', value: '1', checked: 'true' },
      { name: '复利', value: '2' },
    ],
    interestType: 1,
    money: 0,
    day: 0,
    getMoney: 0,
    sumMoney: 0,
    yearInterest: 0.05,
    dayInterest: Number(0.05/365).toFixed(6),
  },
  moneyInput: function(e) {
    this.setData({
      money: Number(e.detail.value),
    })
  },

  dayInput: function(e) {
    this.setData({
      day: Number(e.detail.value)
    })
  },

  computeMoney(e) {
    if (this.data.interestType == 1) {
      this.computeMoney2(e);
    }
    if (this.data.interestType == 2) {
      this.computeMoney1(e);
    }
  },
  computeMoney1: function (e) {
    let dayInterest = this.data.dayInterest;
    var sum = this.data.money;
    var getmoney = 0;
    for(var i=1; i<=this.data.day; i++) {
      sum = sum + (sum * dayInterest);
      getmoney = getmoney + (sum * dayInterest);
      console.log(i, 'i')
    }
    this.setData({
      sumMoney: Number(sum).toFixed(2),
      getMoney: Number(getmoney).toFixed(2),
    })
  },
  computeMoney2: function(e) {
    let dayInterest = this.data.dayInterest;
    var sum = this.data.money;
    var getmoney = 0;
    for (var i = 1; i <= this.data.day; i++) {
      getmoney = getmoney + (sum * dayInterest);
      console.log(i, 'i')
    }
    sum = sum + getmoney;
    this.setData({
      sumMoney: Number(sum).toFixed(2),
      getMoney: Number(getmoney).toFixed(2),
    })
  },
  interestInput: function(e) {
    let yearInterest = Number(e.detail.value) / 100;
    let dayInterest = Number(yearInterest / 365).toFixed(6);
    this.setData({
      yearInterest: yearInterest,
      dayInterest: dayInterest
    })
  },
  interestTypeChange: function(e) {
    let value = e.detail.value;
    this.setData({
      interestType: value
    })
    
  }
})
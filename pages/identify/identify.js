// pages/identify/identify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  onLoad(options) {
    // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
	var scene = decodeURIComponent(options.scene);
	console.log(scene, options, 'scence')
  },
  onShow(options) {
	console.log(options, 'options show')
  },

  previewImg() {
	  console.log('comgin...');
	  wx.previewImage({
		current: 'https://yulongge.github.io/images/min_programs/vampire/code.jpg', // 当前显示图片的http链接
		urls: ["https://yulongge.github.io/images/min_programs/vampire/code.jpg"] // 需要预览的图片http链接列表
	  });
	  wx.getImageInfo({
		src: 'https://yulongge.github.io/images/min_programs/vampire/code.jpg',
		success: function (res) {
			console.log(res, 'res')
			console.log(res.width)
			console.log(res.height)
		}
	  })
  },

  previewQImg() {
	wx.previewImage({
		current: 'https://yulongge.github.io/images/min_programs/vampire/wxdc.png', // 当前显示图片的http链接
		urls: ["https://yulongge.github.io/images/min_programs/vampire/wxdc.png"] // 需要预览的图片http链接列表
	});
  }

})
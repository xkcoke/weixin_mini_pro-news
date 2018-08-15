// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailID:'',
    title:'',
    source:'',
    time:'',
    reads:'',
    details:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detailID: options.id
    })
    this.getDetail()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getDetail(wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  getDetail(callback){
    let that = this
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: that.data.detailID
      },
      success: function (res) {
        let details = []
        for (let i = 0; i <res.data.result.content.length; i+=1){
          let detail_type = res.data.result.content[i].type
          if (detail_type === 'image'){
            details.push({
              detail_type: detail_type,
              src: res.data.result.content[i].src,
            })
          }
          else{
            details.push({
              detail_type: detail_type,
              text: res.data.result.content[i].text,
            })
          }
        }
        that.setData({
          title: res.data.result.title,
          time: res.data.result.date.substring(11, 16),
          source: res.data.result.source,
          reads: "阅读 "+res.data.result.readCount,
          details: details
        })
      },
      complete: function(){
        callback && callback()
      }
    })
  }
})
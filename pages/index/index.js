const categoriesItem = ['gn','gj','cj','yl','js','ty','other']

const categoriesName = ['国内','国际','财经','娱乐','军事','体育','其他']

Page({
  data:{
    categories:[],
    currentItem:'gn',
    contents:[]
  },
  onPullDownRefresh(){
    this.getNewsList(wx.stopPullDownRefresh())
  },
  onLoad(){
    this.getCategories()
    this.getNewsList()
  },
  getCategories(){
    let categories = []
    for(let i=0; i<7; i+=1){
      categories.push({
        item:categoriesItem[i],
        name:categoriesName[i]
      })
    }
    this.setData({
      categories: categories
    })
  },
  onTapCategory(event){
    this.setData({
      currentItem: event.currentTarget.dataset.item
    })
    this.getNewsList()
  },
  onTapContent(event){
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id,
    })
  },
  getNewsList(callback){
    let that = this
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: that.data.currentItem
      },
      success: function (res) {
        let contents = []
        for(let i = 0; i < res.data.result.length; i+=1){
          let image = res.data.result[i].firstImage
          if(image === '') image = '/images/default.jpg'
          let date = res.data.result[i].date.substring(5, 10)
          let time = res.data.result[i].date.substring(11, 16)
          contents.push({
            title: res.data.result[i].title,
            source: res.data.result[i].source,
            time: date + ' ' + time,
            image: image,
            id: res.data.result[i].id
          })
        }
        that.setData({
          contents:contents
        })
      },
      complete: function(){
        callback && callback()
      }
    })
  }

})
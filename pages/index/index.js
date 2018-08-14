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
    let index = event.currentTarget.offsetLeft / 45
    this.setData({
      currentItem: categoriesItem[index]
    })
    this.getNewsList()
  },
  onTapContent(event){
    let index = (event.currentTarget.offsetTop - 37)/115
    wx.navigateTo({
      url: '/pages/detail/detail?id='+this.data.contents[index].id,
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
          contents.push({
            title: res.data.result[i].title,
            source: res.data.result[i].source,
            time: res.data.result[i].date.substring(11, 16),
            image: res.data.result[i].firstImage,
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
export const originPage = (config)=>{
    config.init = (denyFunction) => {
        let autoExcute =  {
            //示例函数
            // alert(){
            //     console.log(wx.getStorageSync('token'))
            // },
            // showModal(){
            //     config.showModal({msg:'初始化'})
            // },
            //获取权限
            getPermission(){
                wx.request({
                    url: '',
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function(res) {
                        return res;
                    }
                })
            },
        }
        for(var i in autoExcute){
            if(denyFunction != 'all' && denyFunction.indexOf(i) == -1){
                autoExcute[i]()
            }
        }
    }
    config.showModal = (error) => {
        wx.showModal({
            content: error.msg,
            showCancel: false
        })
    }
    return Page(config)
}
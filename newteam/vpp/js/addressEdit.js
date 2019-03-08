// 仅查看我的地址
var isEdit = getParam('isedit');
var app = new Vue({
    el: '#app',
    data: {
        list: [],
        deleteId:'',
        isDefault:false,
        showDelBtn: false,
        showDelete: false,
        addressCity: "",
        choseCity:[],
        choseArea:[],
        showAddress:false,
        checkindex: 0,
        checkindex2:'',
        checkindex3:'',
        choseProvince:[],
        mySelectId:'',
        selectAddress:{
            real_name: '',
            mobile: ''
        },
        addressCityIdList: {},
        address:{
            entryAddress:''
        }
    },
    methods: {
        stopNull:function(){
          return false;
        },
        phoneChecked:function(){
         alert("手机号码格式错误");
          return false;
        },
        // 编辑完成
        editOk: function(){
            var that = this;
            var selectAddress = that.selectAddress;
            if(isEdit){ //编辑
                // if(that.isDefault){ //设置默认                   
                //     ajaxPost(
                //         window.globalResURL + "/user/address_set_def",
                //         {
                //             addr_id: that.deleteId,
                //         },
                //         function (data) {
                //             if(data.code == '1001'){
                //                 go('address.html');
                //             }
                //         }
                //     );
                // }
                ajaxPost( //保存
                    window.globalResURL + "/user/address_save",                    
                    {
                        id:that.deleteId,
                        real_name:selectAddress.real_name,
                        mobile:selectAddress.mobile,
                        address:selectAddress.address,
                        province_id: that.addressCityIdList.sheng,  //省ID
                        city_id: that.addressCityIdList.shi,          //城市ID
                        area_id: that.addressCityIdList.qu           //区ID
                    },
                    function (res) {
                        if(res.code == '1001'){
                            go('address.html');
                        }else{
                            that.selectAddress.mobile.length==11 ? null : that.phoneChecked();
                        }
                    }
                );
            }else { // 添加新地址
                $.ajax({
                    type: "POST",
                    url: window.globalResURL + "/user/address_save",
                    data:{
                        id:that.deleteId,
                        real_name:selectAddress.real_name,  //姓名
                        mobile:selectAddress.mobile,        //电话
                        address:selectAddress.address,      //详细地址
                        province_id: that.addressCityIdList.sheng,             //省
                        city_id: that.addressCityIdList.shi,                     //城市
                        area_id: that.addressCityIdList.qu                     //区
                    },
                    dataType:'json',
                    success:function (res) {
                        if(res.code == '1001'){                           
                            go('address.html');
                        }else{
                            that.selectAddress.mobile.length==11 ? null : that.phoneChecked();
                        }
                    }
                });
            }
        },
        //选择地址
        choseAddress:function(){
            this.showAddress = true;
        },
        //确认下一步查询地址
        getProvince:function(index,id,run){
            var that = this;
            if(run==4){
                that.checkindex3 = index;
                var sheng = that.choseProvince[that.checkindex];
                var shi = that.choseCity[that.checkindex2];
                var qu = that.choseArea[index];
                // xu. 2018.11.07 18:47  xu.todo
                that.addressCityIdList = {
                    sheng: that.choseProvince[that.checkindex].id,
                	shi: that.choseCity[that.checkindex2].id,
                	qu: that.choseArea[index].id
                }
                that.addressCity = sheng.region_name + ' ' + shi.region_name + ' ' + qu.region_name;
                that.showAddress = false;
                return
            }
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/user/get_area",
                data:{
                    parent_id : id
                },
                dataType:'json',
                success:function (data) {
                    if(data && data.data){
                        if(run==2){ //市列表
                            that.choseCity = data.data;
                            that.choseArea = [];
                            that.checkindex = index;
                            that.checkindex3 = "";
                            that.checkindex2 = "";
                        }
                        if(run ==3){ //区列表
                            that.choseArea = data.data;
                            that.checkindex2 = index;
                            that.checkindex3 = "";
                        }
                    }
                }
            });
        },
        //隐藏地址选择
        hideProvince:function(){
            this.showAddress = false;
        },
        // 删除地址
        addressDel: function(){
            this.showDelete = true;
        },
        //取消删除
        cancelDelete: function () {
            this.showDelete = false;
        },
        //确认删除
        confirmDelete: function () {
            var that = this;
            this.showDelete = false;
            var id = this.deleteId;
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/user/address_del",
                data:{
                    addr_id: id
                },
                dataType:'json',
                success:function (data) {
                    if(data){
                        $.ajax({
                            type: "POST",
                            url: window.globalResURL + "/user/address_list",
                            dataType:'json',
                            success:function (data) {
                                if(data && data.data){
                                    that.list = data.data.map(function (item) {
                                        item.isSelect = item.is_default=='1' ? true:false;
                                        return item
                                    });
                                }
                            }
                        });
                    }
                }
            });
        },
        // 识别地址
        recognition:function(){
            var that=this;
            var token = getData('TOKEN');
            var url = window.globalResURL + '/user/show_addr?token=' + token;
            var address=that.address.entryAddress;
            var params = new URLSearchParams();
            params.append('address', address);
            axios({
                method: 'POST',
                url: url,
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (res) {
                const result = res.data;
                const address = result.data;
                const formatAddress = {
                    province: address.region_1,
                    city: address.region_2,
                    region: address.region_3,
                    detail: address.address,
                    province_id: address.province_id,             
                    city_id: address.city_id,                    
                    area_id: address.area_id ? address.area_id : 0,
                    mobile: address.mobile   
                }
                that.backFillAddress(formatAddress);
            }).catch(err => {
                console.log(err)
            });  
        },
        //回填数据
        backFillAddress(address){
            this.addressCity = address.province + address.city + address.region;
            this.selectAddress.address = address.detail;
            this.selectAddress.mobile = address.mobile;
            this.addressCityIdList = {
                sheng: address.province_id,
                shi: address.city_id,
                qu: address.area_id
            }
        }
    },
    mounted(){
        var that = this;
        if(isEdit){
            var addressid = getParam('id');
            that.showDelBtn = true;
            var select = JSON.parse(localStorage.getItem('selectAddress'));
            that.selectAddress = select;
            that.deleteId = that.selectAddress.id;
            // xu 2018.11.01 18:30
            that.addressCity = that.selectAddress.province + ' ' +  that.selectAddress.city + ' ' + that.selectAddress.area
            that.addressCityIdList = {
            	sheng: that.selectAddress.province_id,
            	shi: that.selectAddress.city_id,
            	qu: that.selectAddress.area_id,
            }
            // xu.endid
            that.isDefault = select.is_default=='1'?true:false;
        }

        $.ajax({
            type: "POST",
            url: window.globalResURL + "/user/get_area",
            dataType:'json',
            success:function (data) {
                if(data && data.data){
                    // that.choseProvince = data.data.map(function (item) {
                    //     item.isSelect = item.is_default=='1' ? true:false;
                    //     return item
                    // });
                    that.choseProvince = data.data;
                }
            }
        });

    }
});


var appkey = '80fa28cf4ec623d9';
// 仅查看我的地址
var isCheck = getParam('ischeck');
var app = new Vue({
	el: '#app',
	data: {
		list: [],
		deleteId:'',
		showDelete: false,
		searchindex:0,
		showcheck:1,
	},
	methods: {
		// 编辑地址
		addressEdit: function(address){
			var that=this;
            // address = JSON.stringify(address);
			localStorage.setItem("selectAddress", JSON.stringify(address));
			console.log(address);
            go('addressEdit.html?isedit=1&id=' + address.id);
		},
		// 添加地址
		addressAdd: function(){
			go('addressEdit.html');
		},

		// 编辑完成
		editOk: function(){
			go('address.html');
		},

		// 确认添加
		addOk: function(){
			go('address.html');
		},
		searchaddress:function(id,index){
			var that=this; 
			var token = getData('TOKEN');
			var url = window.globalResURL + '/user/address_set_def?token=' + token;
			var params = new URLSearchParams();
			params.append('addr_id', id);
			axios({
				method: 'POST',
				url: url,
				data:params,
				headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
			}).then(function(res){
				console.log(res)
				that.list=res.data.data.data;
				
			}).catch(err => {
                console.log(err)
            });  	
		},
		// 选择地址
		choseAddress: function(address,index){
			if(isCheck){
				var list = this.list;
				list.map(function (item) {
					item.isSelect = false;
                });
				list[index]["isSelect"] = true;
				this.list = list;
			}else {
               //address = JSON.stringify(address);
			   window.localStorage.setItem("selectAddress",JSON.stringify(address));
			   console.log(address);
			   //history.back();				
			   console.log(address.id);
			   var address_id = address.id;
			   var historyUrl = document.referrer;			   
			   if(isStrStr(historyUrl,'addr_id')){
				   var back_url = changeUrlArg(historyUrl,'addr_id',address_id);
			   }else{
					if(isUrlWenHao(historyUrl))
					var back_url = document.referrer+'&addr_id='+address_id;
					else
					var back_url = document.referrer+'?addr_id='+address_id;
			   }
			   window.location.href = back_url;
			}

		},

		// 获取地址列表......未完成
		getProvince: function(index){
			this.$data.checkindex = index;
		},

		// 删除地址
		addressDel: function(id){
			this.deleteId = id;
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
                success:function (data) {
					if(data){
						alert('删除成功');
                        location.href = location.href;
					}
                }
            });
        }
	},
	mounted(){
		var that = this;
        $.ajax({
            type: "POST",
            url: window.globalResURL + "/user/address_list",
            success:function (data) {
                console.log(data);
                if(data && data.data){
                    that.list = data.data.map(function (item) {
                        item.isSelect = item.is_default=='1' ? true:false;
                        return item
                    });
                }
            }
        });
	}
});

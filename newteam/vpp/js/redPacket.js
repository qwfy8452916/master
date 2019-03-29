var app = new Vue({
	el: '#app',
	data: {
		redbags: [
			{"open":false,textStr:'祝您步步高升',index:1},
			{"open":false,textStr:'祝您步步高升',index:2},
			{"open":false,textStr:'祝您步步高升',index:3},
			{"open":false,textStr:'祝您步步高升',index:4},
		],
		redlists: [],
		users:{},
		user_id:0
	},
	methods: {
		// 拆红包
		openRedPacket: function(){
			var id = this.user_id;
			go('open_red_packet.html?master_id=' + id);
		},
		get_my_redbag:function(){
			var that = this;
			var token = getData('TOKEN');
			var master_id = getParam('master_id');
			if(master_id){
                var url = window.globalResURL + '/redbag/my_redbag?master_id='+master_id+'&token=' + token;
			}else{
                var url = window.globalResURL + '/redbag/my_redbag?token=' + token;
			}

			axios({
			    method: 'GET',
			    url: url
			}).then(function (res) {
				var user = res.data.data.users;
				that.users   = user;
				that.user_id = user.id;

				var redBagCount = res.data.data.count;
				if(redBagCount >0){
                    that.redlists =res.data.data.redbag;
					for(var i=0; i< redBagCount ; i++){
						var bagindex=that.redlists[i].bag_index;
						var money=that.redlists[i].money;
						that.redbags[bagindex-1].open = true;
                        console.log(money);
                        that.redbags[bagindex-1].textStr = money;
					}
					$("#RedPacketBox-list").show();
					$("#RedPacketBox-list-font").hide();
				}
				else{
					$("#RedPacketBox-list").hide();
					$("#RedPacketBox-list-font").show();
				}
			})
		},
        openRedBag:function(bagindex){
			var that = this;
			//判断用户
			var master_id = getParam('master_id');
			if(master_id == that.user_id){
				that.ShareBox_show();
				return false;
			}
            var token = getData('TOKEN');
            var master_id = getParam('master_id');
            var url = window.globalResURL + '/redbag/help_open?token=' + token;
            var data = new FormData();
            data.append('master_id',master_id);
            data.append('index',bagindex);
            axios.post(url,data).then(function (res) {
                var msg = res.data.msg;
            	if(res.data.code ==1001){
                	var resData = res.data.data;
                    that.redbags[bagindex-1].open = true;
                    console.log(resData.money);
                    that.redbags[bagindex-1].textStr = resData.money;
                    that.redlists.push(resData)
				}else{
                	alert(msg);
				}
            })

		},
		ShareBox_show: function(event){
			$("#ShareBox").show();
		},
		ShareBox_hide: function(event){
			$("#ShareBox").hide();
		}
	},
	mounted(){
		this.get_my_redbag();
	}
});
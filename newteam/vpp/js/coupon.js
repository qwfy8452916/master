var app = new Vue({
	el: '#app',
	data: {
		list:[],
		isOverends: ''
	},
	methods: {
        Used:function (Isstatus,Isoverend) {
            var that=this;
            Isoverend=Isoverend || 0;
            Isoverend ? that.isOverends = 1 : that.isOverends = 0;
            console.log(Isoverend);

            $.ajax({
                type: "POST",
                url: window.globalResURL + "/coupon/ajax_index",
                data: {
                    type:1,
                    status:Isstatus
                },
                success:function (data) {
                    console.log(data);
                    if(data){
                        that.list = data.data;
                    }
                }
            });
        }
	},
	mounted(){
		var that=this;
		$.ajax({
            type: "POST",
            url: window.globalResURL + "/coupon/ajax_index",
            data: {
                type:1,
                status:1
            },
            success:function (data) {
                console.log(data);
                if(data){
                    that.list = data.data;
                }
            }
		});
	}
});
$(function(){
	tab($(".tab"),'a');
})

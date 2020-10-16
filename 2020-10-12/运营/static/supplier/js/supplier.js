
 var app = new Vue({
	el: '#app',
	data: {
        url:'http://opr.kefangbao.com.cn/longan/api',
        uploadUrl:'http://opr.kefangbao.com.cn/longan/api/basic/file/upload', //上传附件,
        merchantContact:'',  //联系人
        merchantContactPhone:'',  //手机号
        merchantUscc:'',   //统一社会信用代码
        merchantIdno:'',   //身份证号码
        merchantName:'',   //公司名称
        type: '',  //入驻商类型
        supplierType:'',  //供应商类型
        invoice:'',
        CertificatesPic:[],  //营业执照
        merchantProvince:'',  //所属省份代号
        merchantCity:'',  //所属城市代号
        merchantArea:'',  //所属区域代号
        supplyArea:[],   //供应区域
        merchantAddress:'',  //公司地址
        invoiceFlag:'',    //是否支持开票
        invoiceTaxRate:'',  //发票税率

        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,

        judge:'',
        showAddress:false,
        checkindex2: '',
        checkindex3:'',
        checkindex4:'',
        choseProvince:[],
        choseCity:[],
        choseArea:[],
        addressCityIdList:{},
        addressCity:"",
        addressCity2:"",
        showselectaddress:[],

        prodinfo:[
            {
                prodName:"",
                prodImagPaths:[]
            },
        ],    //产品信息

    },
    watch:{

    },

    mounted(){
      this.provinceGet();
    //   this.payevent();
	},
	methods: {

        //支付
        payevent(){
          let that=this;
          let reg=/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
          const imageListdetail = that.CertificatesPic.map(item => item.path);
          if(that.merchantContact==''){
             alert("请填写联系人！")
             return false;
          }
          if(that.merchantContactPhone==''){
             alert("请填写手机号码！")
             return false;
          }
          if(that.type==''){
             alert("请填写公司类型！")
             return false;
          }
          if(that.type=='C' && that.merchantUscc==''){
            alert("请填写企业统一社会信用代码！")
             return false;
          }
          if(that.type=='P' && that.merchantIdno==''){
            alert("请填写个人身份证号码！")
             return false;
          }
          if(that.type=='P' && !reg.test(that.merchantIdno)){
            alert("证件号码格式有误！")
             return false;
          }
          if(that.merchantName==''){
             alert("请填写公司名称！")
             return false;
          }
          if(that.supplierType==''){
             alert("请填写供应商类型！")
             return false;
          }
          if(imageListdetail.length<1){
             alert("请上传营业执照！")
             return false;
          }
          if(that.merchantArea==''){
             alert("请选择地区！")
             return false;
          }
          if(that.merchantAddress==''){
             alert("请填写公司地址！")
             return false;
          }
          if(that.supplyArea.length<1){
             alert("请选择供应区域！")
             return false;
          }
          for(var i=0;i<that.prodinfo.length;i++){
             if(that.prodinfo[i].prodName==''){
                alert("请填写商品名称!")
                return false;
             }
             if(that.prodinfo[i].prodImagPaths.length<1){
                alert("请上传商品图片!")
                return false;
             }
          }
          if(that.invoice!=0 && that.invoiceTaxRate==''){
             alert("请填写商品销售发票税率!")
             return false;
           }
          $.ajax({
                type: "POST",
                url: that.url + "/mer/supplier/appl",
                contentType:'application/json',
                data:JSON.stringify({
                    merchantContact: that.merchantContact,
                    merchantContactPhone:that.merchantContactPhone,
                    merchantType:that.type,
                    merchantUscc:that.merchantUscc,
                    merchantIdno:that.merchantIdno,
                    merchantName:that.merchantName,
                    supplierType:that.supplierType,
                    merchantLicenseList:imageListdetail,
                    merchantProvince:that.merchantProvince,
                    merchantCity:that.merchantCity,
                    merchantArea:that.merchantArea,
                    merchantAddress:that.merchantAddress,
                    supplyArea:JSON.stringify(that.supplyArea),
                    prodDTOS:that.prodinfo,
                    invoiceFlag:that.invoice,
                    invoiceTaxRate:that.invoiceTaxRate,
                    // earnest:1000,
                }),
                dataType:'json',
                success:function (response) {
                  if(response.code==0){
                    alert('操作成功！')
                    window.location.reload()
                    // console.log("操作成功！")
                    // window.location.href=response.data.mweb_url
                }else{
                   alert(response.msg)
                }

                },
                error:function(xhr){
                   alert(xhr)
                }
            })

        },


        //省
        provinceGet(){
            let that=this;
            $.ajax({
                type: "GET",
                url: that.url + "/basic/dict/items",
                data:{
                    key: 'PROVINCE',
                    orgId: '0',
                    parentKey: '',
                    parentValue: ''
                },
                dataType:'json',
                success:function (response) {
                    that.choseProvince=response.data
                },
                error:function(xhr){
                   alert(xhr)
                }
            })

        },

        choseAddress:function(e){
            this.judge=e
            this.showAddress = true;
            this.checkindex2="";
            this.checkindex3="";
            this.checkindex4="";
            this.choseCity=[];
            this.choseArea=[];
        },


        stopNull:function(){
        //   return false;
        },
        //隐藏地址选择
        hideProvince:function(){
            this.showAddress = false;
        },

        getProvince:function(index,id,run,key,parentKey){
            var that = this;
            if(run==4 && this.judge!=2){
                that.checkindex4 = index;
                var sheng = that.choseProvince[that.checkindex2];
                var shi = that.choseCity[that.checkindex3];
                var qu = that.choseArea[index];
                that.merchantProvince=sheng.dictValue
                that.merchantCity=shi.dictValue
                that.merchantArea=qu.dictValue

                that.addressCity = sheng.dictName + ' ' + shi.dictName + ' ' + qu.dictName;

                that.showAddress = false;
                return
            }
            if(run==3 && this.judge==2){
                that.checkindex3 = index;
                var sheng = that.choseProvince[that.checkindex2];
                var shi = that.choseCity[that.checkindex3];
                that.addressCityIdList = {
                    sheng: that.choseProvince[that.checkindex2].dictValue,
                	shi: that.choseCity[that.checkindex3].dictValue,
                    shengname:that.choseProvince[that.checkindex2].dictName,
                    shiname: that.choseCity[that.checkindex3].dictName,
                 }
                if(JSON.stringify(that.showselectaddress).indexOf(JSON.stringify(that.addressCityIdList))==-1){
                    that.showselectaddress.push(that.addressCityIdList);
                    that.supplyArea.push(shi.dictValue)
                  }
                    that.addressCity2 = sheng.dictName + ' ' + shi.dictName;
                    that.showAddress = false;
                    return
              }
              $.ajax({
                type: "GET",
                url: that.url + "/basic/dict/items",
                data:{
                    key: key,
                    orgId: '0',
                    parentKey: parentKey,
                    parentValue: id
                },
                dataType:'json',
                success:function (response) {
                    if(run==2){
                        that.checkindex2 = index;
                        that.checkindex3 = "";
                        that.checkindex4 = "";
                        that.choseCity=response.data
                    }
                    if(run==3){
                        that.checkindex3 = index;
                        that.checkindex4 = "";
                        that.choseArea=response.data
                    }
                },
                error:function(xhr){
                   alert(xhr)
                }
            })


        },


        deladdress(ind){
          this.showselectaddress.splice(ind,1)
          this.supplyArea.splice(ind,1)
        },

        //新增
        addprod(){
            let that=this;
            let newline={
                    prodName:"",
                    prodImagPaths:[]
                }
            this.prodinfo.push(newline)
        },

        //删除
        delprod(index){
            this.prodinfo.splice(index,1)
        },

        handleAvatarSuccess(res, file, fileList,index) {
            var that = this;
            if(res.code==0){
                const image={
                  name: file.name,
                  url: file.url,
                  path: res.data
                }
                if(index=='license'){
                  that.CertificatesPic.push(image)
                  return false
                }
                that.prodinfo[index].prodImagPaths.push(res.data);

            }
        },

        handleRemove(file, fileList,index) {
            var that = this;
            if(fileList.length>0){
                if(index=='license'){
                  that.CertificatesPic=fileList.map((item,index)=>{
                    return {
                        name:item.name,
                        url:item.url,
                        path:item.path
                    }
                  })
                  console.log(that.CertificatesPic)
                  return false
                 }

                that.prodinfo[index].prodImagPaths=fileList.map((item,index)=>{
                    return item.response.data
                  })
                }else{
                  if(index=='license'){
                    that.CertificatesPic=[];
                     return false;
                    }
                   that.prodinfo[index].prodImagPaths=[];
                }

           },
        handleExceed(files, fileList,index) {
            alert(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        //图片上传失败
        imgUploadError(file,fileList,index){
            // console.log(fileList)
            alert('上传图片失败！');

           }

	},

})



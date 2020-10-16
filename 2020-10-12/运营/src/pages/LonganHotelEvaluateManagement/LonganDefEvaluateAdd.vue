<template>
    <div class="DefEvaluateAdd">
       <h3 class="alignleft">新增商品评价</h3>
       <el-form :model="adddata" ref="adddata" :rules="rules" class="alignleft">

             <el-form-item label="酒店商品" label-width="100px" prop="hotelproname" class="multiselect">
             <el-select v-model="adddata.hotelproname" value-key="indexSign" multiple collapse-tags placeholder="请选择"
             filterable
             remote
             :loading="loadingP"
             @change="selectxz">
                  <el-option
                    v-for="item in adddata.proNameList"
                    :key="item.id"
                    :label="item.prodProductDTO.prodName"
                    :value="item.prodProductDTO">
                  </el-option>
             </el-select>
          </el-form-item>
          <el-form-item label="" label-width="100px">
              <div class="selectarea">
                 <span class="selectitem" v-for="(item,index) in adddata.hotelproname" :key="index">{{item.prodName.substring(0,8)}}<span class="selectyuan" @click="delet(index,'adddata')"><i class="el-tag__close el-icon-close"></i></span></span>
              </div>
          </el-form-item>

          <el-form-item class="hotelname multiselect" label="选择酒店" label-width="100px" prop="hotelname">
             <el-select filterable v-model="adddata.hotelname" value-key="id" multiple collapse-tags
                    placeholder="请选择"
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    @change="selecthotelxz">
                  <el-option
                    v-for="item in adddata.hotelNameList"
                    :key="item.id"
                    :label="item.hotelName"
                    :value="item">
                  </el-option>
             </el-select>
          </el-form-item>

          <el-form-item class="allhotel" label="" prop="allhotel">
              <el-checkbox-group v-model="adddata.allhotel" @change="allhotel(adddata.allhotel,'adddata')">
                <el-checkbox label="全部酒店" name="type"></el-checkbox>
              </el-checkbox-group>
          </el-form-item>

          <el-form-item label="" label-width="100px">
              <div class="selectarea">
                 <span class="selectitem" v-for="(item,index) in adddata.hotelname" :key="index">{{item.hotelName}}<span class="selectyuan" @click="delethotel(index,'adddata')"><i class="el-tag__close el-icon-close"></i></span></span>
              </div>
          </el-form-item>
          <el-form-item class="evaluate" label="评价内容" prop="evaluate" label-width="100px">
             <el-input @keyup.native="wordStatic(this);" v-model="adddata.evaluate" maxlength="255" type="textarea" :rows="4"></el-input>
             <div class="weui_textarea_counter"><span id="num">0</span>/255</div>
          </el-form-item>
           <el-form-item label="上传图片" prop="bannerList" class="picupload">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="9"
                    :file-list="adddata.bannerList"
                    :headers="headers"
                    name="fileContent"
                    :before-upload="beforeUpload"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError">
                    <el-button size="small" type="primary">上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只能上传jpg、jpeg、png文件，且不超过2M，图片最多上传9张</label>
                </el-upload>
            </el-form-item>

           <el-row>
            <el-col :span="24" class="niuwrap">
                    <el-button @click="cancelbtn()">返回</el-button>
                    <el-button v-if="authzData['F:BO_REM_DEFAULTEVALUATEADDSURE']" type="primary" @click="surebtn('adddata')">确定</el-button>
                </el-col>
            </el-row>
       </el-form>


    </div>
</template>

<script>
export default {
    name: 'LonganDefEvaluateAdd',
    data() {
      var validatehotelproname = (rule,value,callback) => {
            if(value.length<=0){
                callback(new Error('请选择酒店商品'))
            }else{
                callback()
            }
        }
        var validatehotelname = (rule,value,callback) => {
            if(value.length<=0 && this.adddata.allhotel==false){
                callback(new Error('请选择酒店'))
            }else{
                callback()
            }
        }
        return{
            authzData: '',
            uploadUrl:this.$api.upload_file_url,
            headers: {},
            loadingH:false,
            loadingP:false,
            adddata:{
              hotelproname:[],
              hotelname:[],
              allhotel:true,
              evaluate:'',
              bannerList:[],
              proNameList: [],
              hotelNameList: [],
              selectxzid:[],  //选中商品
              selecthotelxzid:[],  //选中酒店
            },
            rules:{
                    hotelproname:[{required:true,validator:validatehotelproname,trigger:['blur','change']}],
                    hotelname:[{validator:validatehotelname}],
                    evaluate:{required:true,message:'请填写评价内容',trigger:'blur'},
                },

        }
    },
    created(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.prodchangeid=this.$route.query.id;
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.ProdNameList();
        this.getHotelList();
    },
    methods: {

      selectxz(e){
        let that=this;
        console.log(this.adddata.hotelproname)
        this.adddata.selectxzid=[],
       e.map(item=>{
           if(this.adddata.selectxzid.indexOf(item.prodCode)==-1){
              this.adddata.selectxzid.push(item.prodCode)
           }
        })
        console.log(this.adddata.selectxzid)
        if(this.adddata.selectxzid.length==1){
          console.log('一个商品')
          console.log(this.adddata.selectxzid[0])
          let prodcode=this.adddata.selectxzid[0];
          that.singlehotelprod(prodcode)
         }else{
           that.getHotelList();
         }
      },

      delet(index,formData){
         let that=this;
         this.adddata.selectxzid=[],
         this.adddata.hotelproname.splice(index,1)
         this.adddata.hotelproname.map(item=>{
           if(this.adddata.selectxzid.indexOf(item.prodCode)==-1){
            this.adddata.selectxzid.push(item.prodCode)
           }
         })
        this.$refs[formData].validate((valid, model) => {
          })
        console.log(this.adddata.selectxzid)
        if(this.adddata.selectxzid.length==1){
          console.log('一个商品')
          console.log(this.adddata.selectxzid[0])
          let prodcode=this.adddata.selectxzid[0];
          that.singlehotelprod(prodcode)
         }else{
           that.getHotelList();
         }
      },

      selecthotelxz(e){
         this.adddata.selecthotelxzid=[];
         if(e.length>0){
           this.adddata.allhotel=''
         }
       e.map(item=>{
           if(this.adddata.selecthotelxzid.indexOf(item.id)==-1){
              this.adddata.selecthotelxzid.push(item.id)
           }
        })
        console.log(this.adddata.selecthotelxzid)
      },

      delethotel(index,formData){
         this.adddata.selecthotelxzid=[],
         this.adddata.hotelname.splice(index,1)
         console.log(this.adddata.hotelname)
         this.adddata.hotelname.map(item=>{
           if(this.adddata.selecthotelxzid.indexOf(item.id)==-1){
              this.adddata.selecthotelxzid.push(item.id)
           }
        })
        this.$refs[formData].validate((valid, model) => {
              })
        console.log(this.adddata.selecthotelxzid)
      },

      allhotel(e,formData){
          if(e==true){
            this.adddata.hotelname=[];
            this.adddata.selecthotelxzid=[];
          }
          this.$refs[formData].validate((valid, model) => {
              })
      },



         //酒店列表
        getHotelList(hName){
            let that=this;
            this.loadingH = true;
            const params = {
                orgAs: 2,
                hotelName: hName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.hotelList(params)
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        that.adddata.hotelNameList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                hotelName: item.hotelName
                            }
                        })

                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        remoteHotel(val){
            this.getHotelList(val);
        },

        //选中单个商品获取所有酒店名称
        singlehotelprod(prodCode){
             let that=this;
             let params={
               prodCode:prodCode
             }
            this.$api.singlehotelprod({params}).then(response=>{
                if(response.data.code==0){
                  that.adddata.hotelNameList = response.data.data;
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
        },



        //获取所有商品名称

        ProdNameList(pName){
            let that=this;
            let params={
              isActive:1,
              prodName: pName,
              pageNo: 1,
              pageSize: 50
            }
            this.$api.allProdEvaluatelist(params).then(response=>{
                if(response.data.code==0){
                  that.adddata.proNameList = response.data.data.map((item,index)=>{
                    return {

                      id:item.id,
                      prodShowName:item.prodShowName,
                      prodCode:item.prodCode,
                      prodProductDTO:{
                         indexSign:index,
                         id:item.prodProductDTO.id,
                         prodCode:item.prodProductDTO.prodCode,
                         prodShowName:item.prodProductDTO.prodShowName,
                         prodName:item.prodProductDTO.prodName,
                      }
                    }
                  })
                  console.log(that.adddata.proNameList)
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
        },
        remoteProd(val){
            this.ProdNameList(val);
        },


       //取消
      cancelbtn(){
       this.$router.push({name:'LonganDefEvaluate'})
      },

      //确定
      surebtn(formData){
         console.log(this.adddata.allhotel)
        let that=this;
        const bannerPath = this.adddata.bannerList.map(item => item.path);
        console.log(bannerPath)
        let params={
           prodCodeArr:this.adddata.selectxzid,
           hotelIdArr:this.adddata.selecthotelxzid,
           isAllHotel:this.adddata.allhotel,
           remarkContent:this.adddata.evaluate,
           remarkImages:JSON.stringify(bannerPath),
        }

        this.$refs[formData].validate((valid, model) => {
                if(valid){
                 that.$api.AdddefEvaluate(params).then(response=>{
                    if(response.data.code==0){
                       that.$message.success('操作成功!')
                       that.$router.push({name:'LonganDefEvaluate'})
                    }else{
                      that.$alert(response.data.msg,"警告",{
                        confirmButtonText: "确定"
                      })
                    }
                 }).catch(err=>{
                   that.$alert(err,"警告",{
                  confirmButtonText: "确定"
                   })
                 })
                }
              })
      },


          wordStatic() {
            var content = document.getElementById('num');
            if (content) {
                var value = this.adddata.evaluate;
                value = value.replace(/\n|\r/gi,"");
                content.innerText = value.length;
                }
            },

          //图片上传成功
            handleSuccess(res, file, fileList) {
                  if(res.code==0){
                  const image={
                    name: file.name,
                    url: file.url,
                    path: res.data
                  }
                  this.adddata.bannerList.push(image);
                }
                console.log(this.adddata.bannerList)
            },
            //图片移除
            handleRemove(file, fileList) {
                if(fileList.length>0){
                   this.adddata.bannerList=fileList.map((item,index)=>{
                    return {
                        name:item.name,
                        url:item.url,
                        path:item.response.data
                    }
                  })
                  console.log(this.adddata.bannerList)
                }else{
                  this.adddata.bannerList=[];
                }
            },

            //点击文件列表中已上传的文件时
            handlePreview(file) {
                // console.log(file);
            },
            //效果图片上传之前调用 做一些拦截限制
            beforeUpload(file){
                const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传商品图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            //效果图片文件超出个数限制时
            handleExceed(file,fileList){
                this.$message.error('上传图片不能超过9张！');
                // console.log(file,fileList);
            },

            //图片上传失败
            imgUploadError(file,fileList){
                this.$message.error('上传图片失败！');
                // console.log(file,fileList);
            }

    }
}
</script>

<style lang="less" scoped>
.DefEvaluateAdd{
    width: 80%;
    .picupload{width: 500px;}
    .hangitem{text-align: left}
    .alignleft{text-align: left;}
    .hotelname,.allhotel{display: inline-block;}
   .niuwrap{text-align:left;margin-top: 60px;}
   .evaluate .el-textarea{width: 320px;}
   .selectarea{width: 300px;
    .selectitem{width: 50%;display: inline-block;float: left;
      .selectyuan{width: 16px;height: 16px;border-radius: 50%;
      font-size: 12px;color: #fff;background: #C0C4CC;line-height: 16px;
       .el-icon-close{
         -webkit-transform: scale(.8);
         transform: scale(.8);
       }
      }
    }
   }
}

</style>

<style lang="less">
.DefEvaluateAdd{
   .seeordertitle .el-form-item__label{width:100px;}
   .el-form-item__content{text-align: left !important;}
   .multiselect{
      .el-select .el-tag{display: none;}
    }
}
</style>



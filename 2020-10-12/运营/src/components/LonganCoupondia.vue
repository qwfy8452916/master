<template>
   <div class="Coupondia">
      <!-- 选择酒店 -->
      <el-dialog class="fixeddialog" title="选择酒店" :visible.sync="selectHoteldia" width="800px">
          <div>
              <div class="searchwrap">
                 <el-input v-model="diahotel" placeholder="酒店名称"></el-input>
              </div>
              <el-button type="primary" @click="inquire">搜索</el-button>
          </div>
          <el-table :data="hotelList" class="dialogTable" border style="width:100%" height="300">
              <el-table-column prop="id" label="选择酒店" align="center">
                  <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.isSelect"></el-checkbox>
                  </template>
              </el-table-column>
              <el-table-column prop="hotelName" label="酒店名称" align="center"></el-table-column>
          </el-table>

          <span slot="footer">
               <el-button @click="selectHoteldia=false">取 消</el-button>
               <el-button type="primary" @click="sureHotel">确 定</el-button>
          </span>
      </el-dialog>
      <!-- 选择酒店 -->

      <!-- 选择功能区 -->
      <el-dialog class="fixeddialog" title="选择功能区" :visible.sync="selectfunctiondia" width="800px">
          <div>
              <div class="searchwrap">
                 <el-input v-model="diafunction" placeholder="功能区"></el-input>
              </div>
              <el-button type="primary" @click="inquirefunction">搜索</el-button>
          </div>
          <el-table :data="functionList" class="dialogTable" border style="width:100%" height="300">
              <el-table-column prop="id" label="选择功能区" align="center">
                  <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.isSelect"></el-checkbox>
                  </template>
              </el-table-column>
              <el-table-column prop="id" label="酒店名称" align="center">
                 <template slot-scope="scope">
                    <span v-if="scope.row.id">{{addCoupondata.hotelName}}</span>
                 </template>
              </el-table-column>
              <el-table-column prop="funcCnName" label="功能区" align="center"></el-table-column>
          </el-table>
          <span slot="footer">
               <el-button @click="selectfunctiondia=false">取 消</el-button>
               <el-button type="primary" @click="sureFunct">确 定</el-button>
          </span>
      </el-dialog>
      <!-- 选择功能区 -->

      <!-- 选择分类 -->
      <el-dialog class="treedialog" title="选择分类" :visible.sync="selectTypedia" width="500px">
          <el-tree
            :props="defaultProps"
            :data="typeDataDetail"
            show-checkbox
            default-expand-all
            :check-strictly = 'true'
            :check-on-click-node = 'true'
            :expand-on-click-node = "false"
            :default-checked-keys="addCoupondata.checkedkeysData"
            node-key="id"
            ref="tree"
            highlight-current>
        </el-tree>
          <span slot="footer">
               <el-button @click="selectTypedia=false">取 消</el-button>
               <el-button type="primary" @click="sureType">确 定</el-button>
          </span>
      </el-dialog>
      <!-- 选择分类 -->

      <!-- 选择商品 -->
      <el-dialog class="fixeddialog" title="选择商品" :visible.sync="selectProddia" width="800px">
          <div>
              <div class="searchwrap">
                 <el-select filterable v-model="diaprod">
                    <el-option label="全部" value=""></el-option>
                     <el-option
                      v-for="item in selectprodList"
                      :key="item.prodCode"
                      :label="item.prodProductDTO.prodName"
                      :value="item.prodCode"
                     ></el-option>
                 </el-select>
              </div>
              <el-button type="primary" @click="prodinquire">搜索</el-button>
          </div>
          <el-table :data="prodList" class="dialogTable" border style="width:100%" height="300">
              <el-table-column prop="isSelect" label="选择商品" align="center">
                  <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.isSelect"></el-checkbox>
                  </template>
              </el-table-column>
              <el-table-column prop="prodKindName" label="商品类型" align="center">
              </el-table-column>
              <el-table-column prop="prodOwnerOrgName" label="商品所属组织" align="center"></el-table-column>
              <el-table-column prop="prodProductDTO" label="商品名称" align="center">
                  <template slot-scope="scope">
                      <span>{{scope.row.prodProductDTO.prodName}}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="prodShowName" label="商品显示名称" align="center">
              </el-table-column>
          </el-table>
          <span slot="footer">
               <el-button @click="selectProddia=false">取 消</el-button>
               <el-button type="primary" @click="sureProd">确 定</el-button>
          </span>
      </el-dialog>
      <!-- 选择商品 -->

      <!-- 选择房源 -->
      <el-dialog class="fixeddialog" title="选择房源" :visible.sync="selectResourcedia" width="800px">
          <div>
              <div class="searchwrap">
                 <!-- <el-select filterable v-model="diaresource">
                    <el-option label="全部" value=""></el-option>
                     <el-option
                      v-for="item in selectresourceList"
                      :key="item.prodCode"
                      :label="item.prodProductDTO.prodName"
                      :value="item.prodCode"
                     ></el-option>
                 </el-select> -->
                 <el-input v-model="diaresource"></el-input>
              </div>
              <el-button type="primary" @click="resourceinquire">搜索</el-button>
          </div>
          <el-table
            :data="resourceList"
            class="dialogTable"
            border
            style="width:100%"
            height="300">
              <el-table-column prop="isSelect" label="选择房源" align="center">
                  <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.isSelect"></el-checkbox>
                  </template>
              </el-table-column>
              <!-- <el-table-column fixed type="selection" width="40px"></el-table-column> -->
              <el-table-column prop="roomTypeName" label="房型名称"></el-table-column>
              <el-table-column prop="resourceName" label="房源名称"></el-table-column>
              <el-table-column prop="roomCount" label="房量" align="center"></el-table-column>
              <el-table-column prop="basicPrice" label="基础价格" align="center">
              </el-table-column>
          </el-table>
          <span slot="footer">
               <el-button @click="selectResourcedia=false">取 消</el-button>
               <el-button type="primary" @click="sureResource">确 定</el-button>
          </span>
      </el-dialog>
      <!-- 选择房源 -->

      <!-- 新增分组 -->
        <el-dialog title="新建分组" :visible.sync="addGroupdialog" width="400px">
            <el-form :model="couponGroup" ref="couponGroup" :rules="rulesgroup">
                <el-form-item label="组织名称" label-width="100px" prop="organName">
                   <el-input v-model="organName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="分组名称" label-width="100px" prop="groupName">
                   <el-input v-model="couponGroup.groupName"></el-input>
                </el-form-item>
                <el-form-item style="text-align:center">
                    <el-button @click="addGroupdialog=false">取 消</el-button>
                    <el-button type="primary" @click="sureGroup('couponGroup')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
      <!-- 新增分组 -->

   </div>
</template>

<script>
   export default {
      name:"LonganCoupondia",
       props:{
         addCoupondata:Object,
        },
      data(){
        return {
          couponGroup:{
             groupName:'',  //新建 分组名称
          },
           rulesgroup:{
            groupName:{required:true,message:"请输入分组名称",trigger:'blur'},
          },
           organName:'', //新建分组获取的组织名

          // 酒店列表
          selectHoteldia:false,
          diahotel:'',
          hoteldialogjudge:null,  //判断接收酒店
          hotelList:[], //酒店数据
          selectHotelData:[], //选择酒店信息
          selectnoUseHotelData:[], //指定不可用酒店信息
          selectUseHotelData:[], //指定多个可用酒店信息
          // 酒店列表

          // 功能区列表

          selectfunctiondia:false,
          diafunction:'',
          functdialogjudge:null,   //判断接收功能区
          functionList:[], //功能区数据
          selectFunctData:[], //选择功能区信息
          selectnoUseFunctData:[], //指定不可用功能区信息
          selectUseFunctData:[], //指定多个可用功能区信息
          // 功能区列表

          //选择分类
          selectTypedia:false,
          defaultProps: {
            children: 'childDtoList',
            label: 'categoryName'
          },

          typeDataDetail: [], //市场分类数据
          //选择分类

          //选择商品
          selectProddia:false,
          diaprod:'',
          proddialogjudge:null,  //判断接收商品
          prodList:[], //商品数据
          selectProdData:[], //选择商品信息
          selectprodList:[], //下拉商品
          //选择商品

          //选择房源
          selectResourcedia: false,
          diaresource: '',
          resourcedialogjudge: null,   //判断是否接收房源
          resourceList:[], //商品数据
          selectResourceData:[], //选择商品信息
          selectresourceList:[], //下拉商品
          //选择房源

          //新建分组
          addGroupdialog:false,
          //新建分组



        }
      },
      mounted(){

        this.selectnoUseHotelData=this.addCoupondata.notUseHotel;
        this.selectUseHotelData=this.addCoupondata.moreUseHotel;

        this.selectnoUseFunctData=this.addCoupondata.notUseFuncData;

        this.selectUseFunctData=this.addCoupondata.useFuncData;
        this.getOrganName()
        // console.log(this.addCoupondata.notUseFuncData)
        // console.log(this.selectnoUseFunctData)
      },
      methods:{
        //酒店弹窗
        showdialog(e){
           this.hoteldialogjudge=e;
           if(e=='noUseHotel'){
              this.getHotelList(e);
           }else if(e=='moreUseHoteljud'){
              this.getHotelList(e);
           }
           this.selectHoteldia=true;
          },
          //酒店弹窗

          //酒店列表
        getHotelList(e){
            let that=this;
            this.loadingH = true;
            let orgAs=2;
            if(this.addCoupondata.BatchJudge==='通用批次'){
                orgAs="";
            }
            const params = {
                hotelName: this.diahotel,
                orgAs:orgAs
            };
            this.$api.getAppointHotel({params})
                .then(response => {
                    const result = response.data;
                    // console.log(result)
                    if(result.code == 0){

                        this.hotelList = result.data.map(item => {
                            return{
                                id: item.id,
                                hotelName: item.hotelName,
                                isSelect:false,
                            }
                        })

                        if(e=='noUseHotel'){
                          that.selectHotelData=that.selectnoUseHotelData;
                        }else if(e=='moreUseHoteljud'){
                          that.selectHotelData=that.selectUseHotelData;
                        }

                        that.hotelList.map(itemone=>{
                           that.selectHotelData.map(itemtwo=>{
                             if(itemone.id===itemtwo.id){
                                itemone.isSelect=true;
                             }
                           })
                        })
                        // console.log(this.hotelList)
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
        //确定选择酒店
        sureHotel(){
          let that=this;
           for(var i=0;i<that.hotelList.length;i++){
             if(that.selectHotelData.length>0){
              for(var j=0;j<that.selectHotelData.length;j++){

              if(JSON.stringify(that.selectHotelData).indexOf(JSON.stringify(that.hotelList[i]))==-1){

                   if(that.hotelList[i].isSelect==true){
                      that.selectHotelData.push(that.hotelList[i])
                   }
                }
                if(that.hotelList[i].id==that.selectHotelData[j].id){
                    if(that.hotelList[i].isSelect==false){
                       that.selectHotelData.splice(j,1)
                    }

                }
              }
          }else{
            if(that.hotelList[i].isSelect==true){
              // console.log("走6")
               that.selectHotelData.push(that.hotelList[i])
             }
            }
           }

            this.$emit('sondatamethod',{selectHotelData:that.selectHotelData,hoteldialogjudge:that.hoteldialogjudge})
            this.selectHoteldia=false;

            // console.log(this.selectHotelData)
          },

        //酒店查询
        inquire(){
            this.pageNum = 1;
            this.getHotelList();
        },

        //功能区弹窗
        functshowdialog(e){
           this.functdialogjudge=e;
           this.selectnoUseFunctData=this.addCoupondata.notUseFuncData;
           this.selectUseFunctData=this.addCoupondata.useFuncData;
           if(e=='noUseFunct'){
              this.getFunctionList(e);
           }else if(e=='UseFunct'){
              this.getFunctionList(e);
           }
           this.selectfunctiondia=true;
          },
        //功能区弹窗
        //功能区列表
        getFunctionList(e){
            let that=this;
            if(this.addCoupondata.singleHotelId == ''){
                return false;
            }
            const params = {
                funcName: this.diafunction,
                hotelId:this.addCoupondata.singleHotelId,
            };
            this.$api.getCouponFunctionList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.functionList = result.data.map(item => {
                            return{
                                id: item.id,
                                funcCnName: item.funcCnName,
                                isSelect:false,
                                getTypeData:[],
                                categoryIds:[],
                            }
                        })

                        if(e=='noUseFunct'){
                          that.selectFunctData=that.selectnoUseFunctData;
                        }else if(e=='UseFunct'){
                          that.selectFunctData=that.selectUseFunctData;
                        }

                        that.functionList.map(itemone=>{
                           that.selectFunctData.map(itemtwo=>{
                             if(itemone.id===itemtwo.id){
                                itemone.isSelect=true;
                                if(itemtwo.hasOwnProperty('getTypeData')){
                                   itemone.getTypeData=itemtwo.getTypeData
                                   itemone.categoryIds=itemtwo.categoryIds
                                }
                             }
                           })
                        })
                        // console.log(this.selectFunctData)


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
        //确定选择功能区
        sureFunct(){
          let that=this;


           for(var i=0;i<that.functionList.length;i++){
             if(that.selectFunctData.length>0){
              for(var j=0;j<that.selectFunctData.length;j++){

              if(JSON.stringify(that.selectFunctData).indexOf(JSON.stringify(that.functionList[i]))==-1){
                   if(that.functionList[i].isSelect==true){
                      // console.log("添加")
                      // console.log(that.selectFunctData)
                      // console.log(that.functionList[i])

                      that.selectFunctData.push(that.functionList[i])
                   }
                }
                if(that.functionList[i].id==that.selectFunctData[j].id){
                    if(that.functionList[i].isSelect==false){
                       that.selectFunctData.splice(j,1)
                    }

                }
              }
          }else{
            if(that.functionList[i].isSelect==true){
               that.selectFunctData.push(that.functionList[i])
             }
            }
           }

            this.$emit('sondatamethod',{selectFunctData:that.selectFunctData,functdialogjudge:that.functdialogjudge})
            this.selectfunctiondia=false;

            // console.log(this.selectFunctData)
          },


        //功能区查询
        inquirefunction(){
            this.funpageNum = 1;
            this.getFunctionList();
        },

        //市场分类弹窗
        Classifyshowdialog(){
          this.getFunctionClassify();
        },
        //市场分类弹窗
        //获取市场分类 - 树
        getFunctionClassify(){
            if(this.addCoupondata.singleHotelId == '' || this.addCoupondata.funcId == ''){
                return false;
            }
            const params = {
                hotelId: this.addCoupondata.singleHotelId,
                funcId: this.addCoupondata.funcId,
            };
            this.$api.functionClassifyTree(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.typeDataDetail = result.data;
                        this.selectTypedia=true;
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
        //获取市场分类 - 树
        //确定选择分类
        sureType(){
          let that=this;
          let getTypedata=this.$refs.tree.getCheckedNodes();
          getTypedata=getTypedata.map(item=>{
            return {
              categoryName:item.categoryName,
              id:item.id
            }
          })

          let getTypekey=this.$refs.tree.getCheckedKeys();

          this.$emit('sondatamethod',{getTypedata:getTypedata,getTypekey:getTypekey,typedialogjudge:'typeClass'})
          this.selectTypedia=false;
        },

        //商品弹窗
        prodshowdialog(e){
           this.proddialogjudge=e;
           if(e=='noUseProd'){
              this.getProdList(e);
           }else if(e=='UseProd'){
              this.getProdList(e);
           }
           this.selectProddia=true;
        },
        //商品弹窗
        //商品列表
        getProdList(e){
            let that=this;
            this.loadingH = true;
            let orgAs=2;
            if(this.addCoupondata.BatchJudge==='通用批次'){
                orgAs="";
            }
            const params = {
                hotelId: this.addCoupondata.singleHotelId,
                prodCode: this.diaprod,
                orgAs: orgAs,
            };
            this.$api.getAppointProd({params})
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                      // console.log(result.data)
                        if(this.diaprod===''){
                           this.selectprodList=result.data.map(item => {
                            return{
                                id: item.id,
                                prodCode:item.prodCode,
                                prodProductDTO: item.prodProductDTO,
                                prodShowName:item.prodShowName,
                                prodKindName:item.prodKindName,
                                prodOwnerOrgName:item.prodOwnerOrgName,
                                isSelect:false,
                            }
                          })
                        };
                        this.prodList = result.data.map(item => {
                            return{
                                id: item.id,
                                prodCode:item.prodCode,
                                prodProductDTO: item.prodProductDTO,
                                prodShowName:item.prodShowName,
                                prodKindName:item.prodKindName,
                                prodOwnerOrgName:item.prodOwnerOrgName,
                                isSelect:false,
                            }
                        })

                        if(e=='noUseProd'){
                          that.selectProdData=that.addCoupondata.notUseProductdata;
                        }else if(e=='UseProd'){
                          that.selectProdData=that.addCoupondata.useProductdata;
                        }

                        that.prodList.map(itemone=>{
                           that.selectProdData.map(itemtwo=>{
                             if(itemone.id===itemtwo.id){
                                itemone.isSelect=true;
                             }
                           })
                        })
                        // console.log(this.prodList)
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
        //确定选择商品
        sureProd(){
          let that=this;
          for(var i=0;i<that.prodList.length;i++){
             if(that.selectProdData.length>0){
              for(var j=0;j<that.selectProdData.length;j++){

              if(JSON.stringify(that.selectProdData).indexOf(JSON.stringify(that.prodList[i]))==-1){

                   if(that.prodList[i].isSelect==true){
                      that.selectProdData.push(that.prodList[i])
                   }
                }
                if(that.prodList[i].id==that.selectProdData[j].id){
                    if(that.prodList[i].isSelect==false){
                       that.selectProdData.splice(j,1)
                    }
                }
              }
          }else{
            if(that.prodList[i].isSelect==true){
               that.selectProdData.push(that.prodList[i])
              }
            }
          }
          // console.log(this.selectProdData)
          // console.log(this.proddialogjudge)
          this.$emit('sondatamethod',{selectProdData:that.selectProdData,proddialogjudge:that.proddialogjudge})
          this.selectProddia=false;
        },
        //搜索商品
        prodinquire(){
          this.getProdList();
        },

        //房源弹窗
        resourceshowdialog(e){
           this.resourcedialogjudge = e;
           if(e == 'noUseResource'){
              this.getResourceList(e);
           }else if(e == 'UseResource'){
              this.getResourceList(e);
           }
           this.selectResourcedia = true;
        },
        //房源弹窗
        //房源列表
        getResourceList(e){
            let that=this;
            let orgAs=2;
            if(this.addCoupondata.BatchJudge === '通用批次'){
                orgAs="";
            }
            const params = {
                hotelId: this.addCoupondata.singleHotelId,
                resourceName: this.diaresource,
                // orgAs: orgAs,
            };
            this.$api.getAppointResource({params})
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                      // console.log(result.data)
                        if(this.diaresource === ''){
                          this.selectresourceList = result.data.map(item => {
                            return{
                                id: item.id,
                                roomTypeName: item.roomTypeName,
                                resourceName: item.resourceName,
                                roomCount: item.roomCount,
                                basicPrice: item.basicPrice,
                                isSelect: false,
                            }
                          })
                        };
                        this.resourceList = result.data.map(item => {
                            return{
                                id: item.id,
                                roomTypeName: item.roomTypeName,
                                resourceName: item.resourceName,
                                roomCount: item.roomCount,
                                basicPrice: item.basicPrice,
                                isSelect: false,
                            }
                        })

                        if(e == 'noUseResource'){
                          that.selectResourceData = that.addCoupondata.notUseProductdata;
                        }else if(e == 'UseResource'){
                          that.selectResourceData = that.addCoupondata.useProductdata;
                        }

                        that.resourceList.map(itemone => {
                           that.selectResourceData.map(itemtwo => {
                             if(itemone.id === itemtwo.id){
                                itemone.isSelect = true;
                             }
                           })
                        })
                        // console.log(this.resourceList)
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
        //确定选择房源
        sureResource(){
          let that=this;
          for(var i=0;i<that.resourceList.length;i++){
             if(that.selectResourceData.length>0){
              for(var j=0;j<that.selectResourceData.length;j++){

              if(JSON.stringify(that.selectResourceData).indexOf(JSON.stringify(that.resourceList[i]))==-1){

                   if(that.resourceList[i].isSelect==true){
                      that.selectResourceData.push(that.resourceList[i])
                   }
                }
                if(that.resourceList[i].id==that.selectResourceData[j].id){
                    if(that.resourceList[i].isSelect==false){
                       that.selectResourceData.splice(j,1)
                    }
                }
              }
          }else{
            if(that.resourceList[i].isSelect==true){
               that.selectResourceData.push(that.resourceList[i])
              }
            }
          }
          this.$emit('sondatamethod',{selectResourceData:that.selectResourceData,resourcedialogjudge:that.resourcedialogjudge})
          this.selectResourcedia = false;

          // console.log(this.selectResourceData)
        },
        //搜索房源
        resourceinquire(){
          this.getResourceList();
        },





        //新建分组弹窗
        addGroupshowdialog(){
          this.couponGroup.groupName="";
          this.addGroupdialog=true;
        },

        //获取组织名
        getOrganName(){
          let that=this;
          let params="";
          this.$api.getOrganName(params).then(response=>{
            if(response.data.code=='0'){
                that.organName=response.data.data;
            }else{
              that.$alert(response.data.msg,"警告",{
                confirmButtonText:"确定"
              })
            }
          }).catch(error=>{
            that.$alert(error,"警告",{
              confirmButtonText:"确定"
            })
          })
        },

        //确定新建分组
        sureGroup(couponGroup){
          let that=this;
          let params={
              groupName:this.couponGroup.groupName,
              groupOwnerOrgKind:2,
          }
          this.$refs[couponGroup].validate((valid,model)=>{
              if(valid){
                this.$api.addCouponGroup(params).then(response=>{
                  if(response.data.code=='0'){
                    that.$message.success("操作成功")
                    that.addGroupdialog=false;
                    that.$emit("getAppointGroup");
                  }else{
                    that.$alert(response.data.msg,"警告",{
                      confirmButtonText:"确定"
                    })
                  }
                }).catch(error=>{
                  that.$alert(error,"警告",{
                      confirmButtonText:"确定"
                    })
                })
              }else{
                console.log("error!")
              }
          })


        },


      },

   }
</script>

<style lang="less" scope>
  .Coupondia{
     .searchwrap{width: 70%;display: inline-block;
       margin-right: 20px;
       .el-select{width: 100%;}
     }
     .el-dialog__footer{text-align: center !important;}
     .el-table th{background: #e4e4e4 !important;color: #333 !important;}
     .dialogTable{margin-top: 20px;}
     .pagination{text-align: center !important;}
     .treedialog{
       .el-dialog__body{
         padding-left: 50px !important;
       }
     }
     .fixeddialog{
       .el-dialog{overflow:auto;position: relative;}
     }
     .groupType{
       .el-select{width: 100%;}
     }

  }
</style>

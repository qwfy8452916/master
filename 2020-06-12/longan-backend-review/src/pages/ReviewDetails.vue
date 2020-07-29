<template>
    <div class="ProcessDetailsbox">
        <div class="fontbt">流程信息</div>
        <ul class="ProcessDetailsul">
            <li>
                <span>审核状态</span>
                <span v-if="ReviewDetailsData.isComplete == 0">待审核</span>
                <span v-else-if="ReviewDetailsData.isComplete == 1">已审核</span>
            </li>
            <li>
                <span>业务类型</span><span>{{ReviewDetailsData.bizType}}</span>
            </li>
            <li>
                <span>业务id</span><span>{{ReviewDetailsData.bizId}}</span>
            </li>
            <li>
                <span>提交时间</span><span>{{ReviewDetailsData.createdAt}}</span>
            </li>
            <li v-if="ReviewDetailsData.isComplete == 1">
                <span>审核结果</span>
                <span v-if="ReviewDetailsData.reviewResult == 0">驳回</span>
                <span v-else-if="ReviewDetailsData.reviewResult == 1">通过</span>
            </li>
            <li v-if="ReviewDetailsData.isComplete == 1">
                <span>备注</span><span>{{ReviewDetailsData.callbackContent}}</span>
            </li>
        </ul>

        <div class="fontbt">业务信息</div>

        <table cellpadding='0' cellspacing='0' class="table1" v-html="html1"></table>
        <div class="table-div" v-html="html2"></div>
        <div class="sectionbox" v-if="html1_a != '' || html2_a != ''">
            <div class="font-btbox2" v-html="bthtml1"></div>
            <table cellpadding='0' cellspacing='0' class="table1" v-html="html1_a"></table>
            <div class="table-div" v-html="html2_a"></div>
            <div class="sectionbox" v-if="html1_b != '' || html2_b != ''">
                <div class="font-btbox2" v-html="bthtml2"></div>
                <table cellpadding='0' cellspacing='0' class="table1" v-html="html1_b"></table>
                <div class="table-div" v-html="html2_b"></div>
                <div class="sectionbox" v-if="html1_c != '' || html2_c != ''">
                    <div class="font-btbox2" v-html="bthtml3"></div>
                    <table cellpadding='0' cellspacing='0' class="table1" v-html="html1_c"></table>
                    <div class="table-div" v-html="html2_c"></div>
                </div>
            </div>
        </div>
        <div v-html="stylehtml"></div>
        

        <div class="fontbt">审核信息</div>

        <el-table :data="ReviewDetailsDataList" border style="width:100%;margin-bottom: 30px;" >
            <el-table-column prop="name" label="任务名称" align=center></el-table-column>
            <el-table-column prop="startTime" label="开始时间" align=center></el-table-column>
            <el-table-column prop="endTime" label="完成时间" align=center></el-table-column>
            <el-table-column prop="handler.value" label="审核人" align=center></el-table-column>
            <el-table-column prop="reviewResult.value" label="审核结果" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.reviewResult.value == '0'">驳回</span>
                    <span v-else-if="scope.row.reviewResult.value == '1'">通过</span>
                </template> 
            </el-table-column>
            <el-table-column prop="comments.value" label="备注" align=center></el-table-column>
        </el-table>

        <div class="btnbox">
            <el-button type="primary" @click="backbfun">返回</el-button>
        </div>
    </div>
</template>

<script>
import privilegeApi from '../request/api.js'
import privilegeJur from '../request/jurisdiction.js'
export default {
    name: 'ReviewDetails',
    data(){
        return{
            authzlist: {}, //权限数据

            ReviewDetailsData: {},
            id: '',
            ReviewDetailsDataList: [],
            BizFormData: {},
            stylehtml: '',
            bthtml1: '',
            bthtml2: '',
            bthtml3: '',
            html1: '',//field
            html2: '',//list
            html1_a: '',//field
            html2_a: '',//list
            html1_b: '',//field
            html2_b: '',//list
            html1_c: '',//field
            html2_c: ''//list
        }
    },
    mounted(){
        this.id = this.$route.query.id;
        (privilegeJur.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.ProcessDetails();
    },
    methods: {
        //酒店提现详情
        ProcessDetails(){
            privilegeApi.getReviewDetails(this.id).then(response=>{
                if(response.data.code==0){
                    this.ReviewDetailsData = response.data.data;
                    this.ReviewDetailsDataList = response.data.data.taskData.data.map(item=>{
                        item.handler = item.variables.find(item1=>{
                            if(item1.name == 'handler'){ 
                                return item1
                            }
                        });
                        item.reviewResult = item.variables.find(item1=>{
                            if(item1.name == 'reviewResult' && item1.scope == 'local'){ 
                                return item1
                            }
                        });
                        item.comments = item.variables.find(item1=>{
                            if(item1.name == 'comments'){ 
                                return item1
                            }
                        });
                        return item;
                    });
                    let BizFormData;
                    if(response.data.data.bizFormData != ''){

                        const BizFormDataval = JSON.parse(response.data.data.bizFormData);

                        BizFormData = this.datamapfun(BizFormDataval.items);
                        this.forfun(BizFormData);

                    }
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
        //返回
        backbfun(){
            this.$emit('review-list');
        },

        datamapfun(BizFormDataval){
            let BizFormData;
            BizFormData = BizFormDataval.map(item=>{
                if(item.displayValue){
                    if( item.displayValue.indexOf('[') != -1 && item.displayValue.indexOf('http') != -1 ){
                        item.disValue = JSON.parse(item.displayValue);
                        item.sztype = 1;
                    }else if( item.displayValue.indexOf('[') == -1 && item.displayValue.indexOf('http') != -1 ){
                        item.disValue = item.displayValue;
                        item.sztype = 2;
                    }else if( item.displayValue.indexOf('[') != -1 && item.displayValue.indexOf('http') == -1 ){
                        item.disValue = JSON.parse(item.displayValue);
                        item.sztype = 3;
                    }else{
                        item.disValue = item.displayValue;
                        item.sztype = 0;
                    }
                }
                if(item.oldDisplayValue){
                    if( item.oldDisplayValue.indexOf('[') != -1 && item.oldDisplayValue.indexOf('http') != -1 ){
                        item.olddisValue = JSON.parse(item.oldDisplayValue);
                        item.oldsztype = 1;
                    }else if( item.oldDisplayValue.indexOf('[') == -1 && item.oldDisplayValue.indexOf('http') != -1 ){
                        item.olddisValue = item.oldDisplayValue;
                        item.oldsztype = 2;
                    }else if( item.oldDisplayValue.indexOf('[') != -1 && item.oldDisplayValue.indexOf('http') == -1 ){
                        item.olddisValue = JSON.parse(item.oldDisplayValue);
                        item.oldsztype = 3;
                    }else{
                        item.olddisValue = item.oldDisplayValue;
                        item.oldsztype = 0;
                    }
                }else{
                    item.olddisValue = '';
                    item.oldsztype = 0;
                }
                return item;
            });

            return BizFormData;
        },


        forfun(BizFormData){
            let html1 = '';
            let html2 = '';
            let html1_a = '';
            let html2_a = '';
            let html1_b = '';
            let html2_b = '';
            let html1_c = '';
            let html2_c = '';
            let stylehtml = '';
            let srcutl = require("../assets/icon1.png");
            for(let i=0;i<BizFormData.length;i++){
                if(BizFormData[i].itemKind == 'field'){
                    
                    html1 += '<tr><td class="tdbox1">'+ BizFormData[i].displayName +'</td>';

                    if(BizFormData[i].olddisValue != ''){
                        if(BizFormData[i].oldsztype == 0){
                            html1 += '<td class="tdbox2">'+ BizFormData[i].olddisValue +'</td>';
                        }else if(BizFormData[i].oldsztype == 1){
                            html1 += '<td class="tdbox2">';
                            for(let j=0;j<BizFormData[i].olddisValue.length;j++){
                                html1 += '<img src="'+ BizFormData[i].olddisValue[j] +'" />'
                            }
                            html1 += '</td>';
                        }else if(BizFormData[i].oldsztype == 2){
                            html1 += '<td class="tdbox2"><img src="'+ BizFormData[i].olddisValue +'" /></td>';
                        }else if(BizFormData[i].oldsztype == 3){
                            html1 += '<td class="tdbox2">';
                            for(let z=0;z<BizFormData[i].olddisValue.length;z++){
                                html1 += '<span>'+ BizFormData[i].olddisValue[z] +'</span>'
                            }
                            html1 += '</td>';
                        }else{
                            html1 += '<td class="tdbox2"></td>';
                        }
                        html1 += '<td class="tdbox3"><img src="'+ srcutl +'" /></td>';
                    }

                    if(BizFormData[i].sztype == 0){
                        html1 += '<td class="tdbox4">'+ BizFormData[i].disValue +'</td>';
                    }else if(BizFormData[i].sztype == 1){
                        html1 += '<td class="tdbox4">';
                        for(let j=0;j<BizFormData[i].disValue.length;j++){
                            html1 += '<img src="'+ BizFormData[i].disValue[j] +'" />'
                        }
                        html1 += '</td>';
                    }else if(BizFormData[i].sztype == 2){
                        html1 += '<td class="tdbox4"><img src="'+ BizFormData[i].disValue +'" /></td>';
                    }else if(BizFormData[i].sztype == 3){
                        html1 += '<td class="tdbox4">';
                        for(let z=0;z<BizFormData[i].disValue.length;z++){
                            html1 += '<span>'+ BizFormData[i].disValue[z] +'</span>'
                        }
                        html1 += '</td>';
                    }else{
                        html1 += '<td class="tdbox4"></td>';
                    }
                    html1 += '</tr>';
                    this.html1 = html1;
                }else if(BizFormData[i].itemKind == 'list'){
                    html2 += '<div class="font-btbox">'+ BizFormData[i].displayName +'</div>';
                    html2 += '<div class="divscroll"><table cellpadding="0" cellspacing="0" class="table2" style="width:' + BizFormData[i].columns.length*250 + 'px;">';
                    html2 += '<tr>';
                    for(let c=0;c<BizFormData[i].columns.length;c++){
                        html2 += '<td class="bgcolor-blue">'+ BizFormData[i].columns[c].displayName +'</td>';  
                    }
                    html2 += '</tr>';
                        for(let r=0;r<BizFormData[i].rows.length;r++){
                            html2 += '<tr>';
                            for(let cell=0;cell<BizFormData[i].rows[r].cells.length;cell++){
                                for(let c=0;c<BizFormData[i].columns.length;c++){
                                    if(BizFormData[i].rows[r].cells[cell].columnKey == BizFormData[i].columns[c].columnKey){
                                        html2 += '<td>'+ BizFormData[i].rows[r].cells[cell].displayValue +'</td>';
                                    }
                                }
                            } 
                            html2 += '</tr>';                               
                        }
                    html2 += '</table></div>';
                    this.html2 = html2;
                }else if(BizFormData[i].itemKind == 'section'){
                    this.bthtml1 += BizFormData[i].displayName;
                    let section_data;
                    section_data = this.datamapfun(BizFormData[i].subitems);

                    for(let section=0;section<section_data.length;section++){
                        let sectiondata = section_data[section];

                        if(sectiondata.itemKind == 'field'){
                    
                            html1_a += '<tr><td class="tdbox1">'+ sectiondata.displayName +'</td>';

                            if(sectiondata.olddisValue != ''){
                                if(sectiondata.oldsztype == 0){
                                    html1_a += '<td class="tdbox2">'+ sectiondata.olddisValue +'</td>';
                                }else if(sectiondata.oldsztype == 1){
                                    html1_a += '<td class="tdbox2">';
                                    for(let j=0;j<sectiondata.olddisValue.length;j++){
                                        html1_a += '<img src="'+ sectiondata.olddisValue[j] +'" />'
                                    }
                                    html1_a += '</td>';
                                }else if(sectiondata.oldsztype == 2){
                                    html1_a += '<td class="tdbox2"><img src="'+ sectiondata.olddisValue +'" /></td>';
                                }else if(sectiondata.oldsztype == 3){
                                    html1_a += '<td class="tdbox2">';
                                    for(let z=0;z<sectiondata.olddisValue.length;z++){
                                        html1_a += '<span>'+ sectiondata.olddisValue[z] +'</span>'
                                    }
                                    html1_a += '</td>';
                                }else{
                                    html1_a += '<td class="tdbox2"></td>';
                                }
                                html1_a += '<td class="tdbox3"><img src="'+ srcutl +'" /></td>';
                            }

                            if(sectiondata.sztype == 0){
                                html1_a += '<td class="tdbox4">'+ sectiondata.disValue +'</td>';
                            }else if(sectiondata.sztype == 1){
                                html1_a += '<td class="tdbox4">';
                                for(let j=0;j<sectiondata.disValue.length;j++){
                                    html1_a += '<img src="'+ sectiondata.disValue[j] +'" />'
                                }
                                html1_a += '</td>';
                            }else if(sectiondata.sztype == 2){
                                html1_a += '<td class="tdbox4"><img src="'+ sectiondata.disValue +'" /></td>';
                            }else if(sectiondata.sztype == 3){
                                html1_a += '<td class="tdbox4">';
                                for(let z=0;z<sectiondata.disValue.length;z++){
                                    html1_a += '<span>'+ sectiondata.disValue[z] +'</span>'
                                }
                                html1_a += '</td>';
                            }else{
                                html1_a += '<td class="tdbox4"></td>';
                            }
                            html1_a += '</tr>';
                            this.html1_a = html1_a;
                        }else if(sectiondata.itemKind == 'list'){
                            html2_a += '<div class="font-btbox">'+ sectiondata.displayName +'</div>';
                            html2_a += '<div class="divscroll"><table cellpadding="0" cellspacing="0" class="table2" style="width:' + sectiondata.columns.length*250 + 'px;">';
                            html2_a += '<tr>';
                            for(let c=0;c<sectiondata.columns.length;c++){
                                html2_a += '<td class="bgcolor-blue">'+ sectiondata.columns[c].displayName +'</td>';  
                            }
                            html2_a += '</tr>';
                                for(let r=0;r<sectiondata.rows.length;r++){
                                    html2_a += '<tr>';
                                    for(let cell=0;cell<sectiondata.rows[r].cells.length;cell++){
                                        for(let c=0;c<sectiondata.columns.length;c++){
                                            if(sectiondata.rows[r].cells[cell].columnKey == sectiondata.columns[c].columnKey){
                                                html2_a += '<td>'+ sectiondata.rows[r].cells[cell].displayValue +'</td>';
                                            }
                                        }
                                    } 
                                    html2_a += '</tr>';                               
                                }
                            html2_a += '</table></div>';
                            this.html2_a = html2_a;
                        }else if(sectiondata.itemKind == 'section'){
                            this.bthtml2 += sectiondata.displayName;
                            let section_data;
                            section_data = this.datamapfun(sectiondata.subitems);

                            for(let section=0;section<section_data.length;section++){
                                let sectiondata = section_data[section];

                                if(sectiondata.itemKind == 'field'){
                            
                                    html1_b += '<tr><td class="tdbox1">'+ sectiondata.displayName +'</td>';

                                    if(sectiondata.olddisValue != ''){
                                        if(sectiondata.oldsztype == 0){
                                            html1_b += '<td class="tdbox2">'+ sectiondata.olddisValue +'</td>';
                                        }else if(sectiondata.oldsztype == 1){
                                            html1_b += '<td class="tdbox2">';
                                            for(let j=0;j<sectiondata.olddisValue.length;j++){
                                                html1_b += '<img src="'+ sectiondata.olddisValue[j] +'" />'
                                            }
                                            html1_b += '</td>';
                                        }else if(sectiondata.oldsztype == 2){
                                            html1_b += '<td class="tdbox2"><img src="'+ sectiondata.olddisValue +'" /></td>';
                                        }else if(sectiondata.oldsztype == 3){
                                            html1_b += '<td class="tdbox2">';
                                            for(let z=0;z<sectiondata.olddisValue.length;z++){
                                                html1_b += '<span>'+ sectiondata.olddisValue[z] +'</span>'
                                            }
                                            html1_b += '</td>';
                                        }else{
                                            html1_b += '<td class="tdbox2"></td>';
                                        }
                                        html1_b += '<td class="tdbox3"><img src="'+ srcutl +'" /></td>';
                                    }

                                    if(sectiondata.sztype == 0){
                                        html1_b += '<td class="tdbox4">'+ sectiondata.disValue +'</td>';
                                    }else if(sectiondata.sztype == 1){
                                        html1_b += '<td class="tdbox4">';
                                        for(let j=0;j<sectiondata.disValue.length;j++){
                                            html1_b += '<img src="'+ sectiondata.disValue[j] +'" />'
                                        }
                                        html1_b += '</td>';
                                    }else if(sectiondata.sztype == 2){
                                        html1_b += '<td class="tdbox4"><img src="'+ sectiondata.disValue +'" /></td>';
                                    }else if(sectiondata.sztype == 3){
                                        html1_b += '<td class="tdbox4">';
                                        for(let z=0;z<sectiondata.disValue.length;z++){
                                            html1_b += '<span>'+ sectiondata.disValue[z] +'</span>'
                                        }
                                        html1_b += '</td>';
                                    }else{
                                        html1_b += '<td class="tdbox4"></td>';
                                    }
                                    html1_b += '</tr>';
                                    this.html1_b = html1_b;
                                }else if(sectiondata.itemKind == 'list'){
                                    html2_b += '<div class="font-btbox">'+ sectiondata.displayName +'</div>';
                                    html2_b += '<div class="divscroll"><table cellpadding="0" cellspacing="0" class="table2" style="width:' + sectiondata.columns.length*250 + 'px;">';
                                    html2_b += '<tr>';
                                    for(let c=0;c<sectiondata.columns.length;c++){
                                        html2_b += '<td class="bgcolor-blue">'+ sectiondata.columns[c].displayName +'</td>';  
                                    }
                                    html2_b += '</tr>';
                                        for(let r=0;r<sectiondata.rows.length;r++){
                                            html2_b += '<tr>';
                                            for(let cell=0;cell<sectiondata.rows[r].cells.length;cell++){
                                                for(let c=0;c<sectiondata.columns.length;c++){
                                                    if(sectiondata.rows[r].cells[cell].columnKey == sectiondata.columns[c].columnKey){
                                                        html2_b += '<td>'+ sectiondata.rows[r].cells[cell].displayValue +'</td>';
                                                    }
                                                }
                                            } 
                                            html2_b += '</tr>';                               
                                        }
                                    html2_b += '</table></div>';
                                    this.html2_b = html2_b;
                                }else if(sectiondata.itemKind == 'section'){
                                    this.bthtml3 += sectiondata.displayName;
                                    let section_data;
                                    section_data = this.datamapfun(sectiondata.subitems);

                                    for(let section=0;section<section_data.length;section++){
                                        let sectiondata = section_data[section];

                                        if(sectiondata.itemKind == 'field'){
                                    
                                            html1_c += '<tr><td class="tdbox1">'+ sectiondata.displayName +'</td>';

                                            if(sectiondata.olddisValue != ''){
                                                if(sectiondata.oldsztype == 0){
                                                    html1_c += '<td class="tdbox2">'+ sectiondata.olddisValue +'</td>';
                                                }else if(sectiondata.oldsztype == 1){
                                                    html1_c += '<td class="tdbox2">';
                                                    for(let j=0;j<sectiondata.olddisValue.length;j++){
                                                        html1_c += '<img src="'+ sectiondata.olddisValue[j] +'" />'
                                                    }
                                                    html1_c += '</td>';
                                                }else if(sectiondata.oldsztype == 2){
                                                    html1_c += '<td class="tdbox2"><img src="'+ sectiondata.olddisValue +'" /></td>';
                                                }else if(sectiondata.oldsztype == 3){
                                                    html1_c += '<td class="tdbox2">';
                                                    for(let z=0;z<sectiondata.olddisValue.length;z++){
                                                        html1_c += '<span>'+ sectiondata.olddisValue[z] +'</span>'
                                                    }
                                                    html1_c += '</td>';
                                                }else{
                                                    html1_c += '<td class="tdbox2"></td>';
                                                }
                                                html1_c += '<td class="tdbox3"><img src="'+ srcutl +'" /></td>';
                                            }

                                            if(sectiondata.sztype == 0){
                                                html1_c += '<td class="tdbox4">'+ sectiondata.disValue +'</td>';
                                            }else if(sectiondata.sztype == 1){
                                                html1_c += '<td class="tdbox4">';
                                                for(let j=0;j<sectiondata.disValue.length;j++){
                                                    html1_c += '<img src="'+ sectiondata.disValue[j] +'" />'
                                                }
                                                html1_c += '</td>';
                                            }else if(sectiondata.sztype == 2){
                                                html1_c += '<td class="tdbox4"><img src="'+ sectiondata.disValue +'" /></td>';
                                            }else if(sectiondata.sztype == 3){
                                                html1_c += '<td class="tdbox4">';
                                                for(let z=0;z<sectiondata.disValue.length;z++){
                                                    html1_c += '<span>'+ sectiondata.disValue[z] +'</span>'
                                                }
                                                html1_c += '</td>';
                                            }else{
                                                html1_c += '<td class="tdbox4"></td>';
                                            }
                                            html1_c += '</tr>';
                                            this.html1_c = html1_c;
                                        }else if(sectiondata.itemKind == 'list'){
                                            html2_c += '<div class="font-btbox">'+ sectiondata.displayName +'</div>';
                                            html2_c += '<div class="divscroll"><table cellpadding="0" cellspacing="0" class="table2" style="width:' + sectiondata.columns.length*250 + 'px;">';
                                            html2_c += '<tr>';
                                            for(let c=0;c<sectiondata.columns.length;c++){
                                                html2_c += '<td class="bgcolor-blue">'+ sectiondata.columns[c].displayName +'</td>';  
                                            }
                                            html2_c += '</tr>';
                                                for(let r=0;r<sectiondata.rows.length;r++){
                                                    html2_c += '<tr>';
                                                    for(let cell=0;cell<sectiondata.rows[r].cells.length;cell++){
                                                        for(let c=0;c<sectiondata.columns.length;c++){
                                                            if(sectiondata.rows[r].cells[cell].columnKey == sectiondata.columns[c].columnKey){
                                                                html2_c += '<td>'+ sectiondata.rows[r].cells[cell].displayValue +'</td>';
                                                            }
                                                        }
                                                    } 
                                                    html2_c += '</tr>';                               
                                                }
                                            html2_c += '</table></div>';
                                            this.html2_c = html2_c;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            stylehtml += '<style>.table1{border: 0.5px solid #c2c2c2;text-align: center;font-size: 14px;}.table1 td{border-top: 0.5px solid #c2c2c2;padding: 20px;}.table1 .tdbox1{width: 120px;border-right: 0.5px solid #c2c2c2;}.table1 .tdbox2{overflow: hidden;}.table1 .tdbox2 span{display: block;margin-bottom: 10px;}.table1 .tdbox2 span:last-child{margin-bottom: 0;}.table1 .tdbox2 img{display: block;float: left;width: 120px;margin-bottom: 10px;}.table1 .tdbox3{width: 80px;}.table1 .tdbox3 img{display: inline-block;width: 50%;}.table1 .tdbox4{overflow: hidden;}.table1 .tdbox4 span{display: block;margin-bottom: 10px;}.table1 .tdbox4 span:last-child{margin-bottom: 0;}.table1 .tdbox4 img{display: block;float: left;width: 120px;margin-bottom: 10px;}.table-div{margin-top: 0;}.divscroll{max-width: 1000px;overflow-x: scroll;border: 1px solid #c2c2c2;box-sizing: border-box;border-bottom: none;}.bgcolor-blue{background: rgba(64,158,255,0.8);color: #ffffff;}.table2{font-size: 14px;border-left: none;border-right: none;}.table2 tr td{min-width: 200px;padding: 15px 20px;text-align: center;border-right: 1px solid #c2c2c2;border-bottom: 1px solid #c2c2c2;box-sizing: border-box;}.table2 tr:first-child td{border: none;}.table2 tr td:last-child{border-right: none;}.font-btbox{width: 100%;font-size: 18px;font-weight: bold;color: #000;line-height: 50px;}.font-btbox2{position: absolute;z-index: 2;top: -25px;left: 20px;background: #fff;display: inline-block !important;width: auto;padding-left: 20px;padding-right: 20px;}</style>';
            this.stylehtml = stylehtml;
        }
    }
}
</script>

<style lang="less" scoped>
    ul{
        margin: 0;
        padding: 0;
    }
    ul li{
        list-style: none;
    }
    .ProcessDetailsbox{
        text-align: left;
    }
    .fontbt{
        font-size: 25px;
        color: #000;
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .ProcessDetailsul{
        width: 40%;
        border: 1px solid #333;
        margin-bottom: 30px;
    }
    .ProcessDetailsul li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        font-size: 14px;
        line-height: 45px;
        border-bottom: 1px solid #333;
    }
    .ProcessDetailsul li:last-child{
        border-bottom: none;
    }
    .ProcessDetailsul li span:first-child{
        width: 28%;
        border-right: 1px solid #333;
        text-align: center;
    }
    .ProcessDetailsul li span:last-child{
        width: 68%;
        padding-left: 2%;
    }
    .tablediv1{
        width: 100%;
        border-bottom: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .tablediv1 .tablediv1-div{
        width: 30%;
        flex-grow: 1;
        text-align: center;
        font-size: 14px;
        color: #000;
        padding-top: 20px;
        padding-bottom: 20px;
        min-height: 40px;
        border: 1px solid #f2f2f2;
    }
    .bgcolor{
        background: rgba(241,241,241,0.5);
    }
    .tablediv2{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-flow: wrap;
        max-width: 90%;
        overflow-x: scroll;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .tablediv-box{
        width: 150px;
    }
    .thdiv{
        font-size: 14px;
        color: #fff;
        text-align: center;
        background: rgba(64,158,255,0.8);
        line-height: 33px;
    }
    .tddiv{
        font-size: 14px;
        color: #000;
        width: 150px;
        text-align: center;
        line-height: 45px;
        box-sizing:border-box;
        // border: 1px solid #ccc;
    }
    .imgbox-a{
        display: block;
        width: 100%;
        margin-bottom: 10px;
    }
    .iconimg{
        display: block;
        width: 30%;
        margin: 0 auto;
    }
    .sectionbox{
        border: 1px solid #ccc;
        margin-top: 50px;
        position: relative;
        padding: 30px 20px;
    }
    .font-btbox{
        width: 100%;
        font-size: 18px;
        font-weight: bold;
        color: #000;
        line-height: 50px;
    }
    .font-btbox2{
        position: absolute;
        z-index: 2;
        top: -25px;
        left: 20px;
        background: #fff;
        display: inline-block !important;
        width: auto;
        padding-left: 20px;
        padding-right: 20px;
    }
</style>
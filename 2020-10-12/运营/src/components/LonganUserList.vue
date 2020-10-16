<template>
    <div class="userlist">
        <el-form :inline="true" align=left>
            <el-form-item label="账号名称">
                <el-input v-model="inquireUserName"></el-input>
            </el-form-item>
            <el-form-item label="微信id">
                <el-input v-model="inquireWeixinId"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="inquireMobilePhone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- <div class="add-user"><el-button type="primary" @click="UserAddLink">新增用户</el-button></div> -->
        <el-table :data="UserDataList" border style="width:100%;" >
            <el-table-column fixed prop="userId" label="用户ID" width="80px" align=center></el-table-column>
            <el-table-column prop="jobNumber" label="工号" width="120px" align=center></el-table-column>
            <el-table-column prop="headPhoto" label="头像" width="60px" align=center>
                <img src="" alt="头像" class="head-link">
            </el-table-column>
            <el-table-column prop="weixinId" label="微信id" width="120px" align=center></el-table-column>
            <el-table-column prop="userName" label="账号名称" width="100px" align=center></el-table-column>
            <el-table-column prop="mobilePhone" label="电话" width="120px" align=center></el-table-column>
            <el-table-column prop="userEmail" label="邮箱" width="180px" align=center></el-table-column>
            <el-table-column prop="addTime" label="添加时间" width="160px" align=center></el-table-column>
            <el-table-column prop="lastLoginTime" label="最后登录时间" width="160px" align=center></el-table-column>
            <el-table-column prop="lastLoginIp" label="最后登录ip" width="100px" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="160px" align=center>
                <template>
                    <el-button type="text" size="small" @click="ModifyUser()">修改</el-button>
                    <el-button type="text" size="small" @click="deleteUser()">删除</el-button>
                    <el-button type="text" size="small" @click="ResetPWD()">重置密码</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>确定删除该用户？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="dialogVisibleDelete=false">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="重置密码" :visible.sync="dislogVisibleResetPWD" width="30%">
            <el-form label-width="80px">
                <el-form-item label="新密码">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dislogVisibleResetPWD = false">取 消</el-button>
                <el-button type="primary" @click="dislogVisibleResetPWD = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'LonganUserList',
    data() {
        return{
            inquireUserName: '',
            inquireWeixinId: '',
            inquireMobilePhone: '',

            UserDataList: [{
                userId: '4555665',
                jobNumber: '2585',
                headPhoto: '',
                weixinId: 'sfr4455hfjfj',
                userName: '张三的歌',
                mobilePhone: '16935689954',
                userEmail: 'zhangsan@zhuniu.com',
                addTime: '2019-03-16 19:34:07',
                lastLoginTime: '2019-03-16 19:34:07',
                lastLoginIp: '192.168.3',
            },
            {
                userId: '4555665',
                jobNumber: '2585',
                headPhoto: '',
                weixinId: 'sfr4455hfjfj',
                userName: '张三的歌',
                mobilePhone: '16935689954',
                userEmail: 'zhangsan@zhuniu.com',
                addTime: '2019-03-16 19:34:07',
                lastLoginTime: '2019-03-16 19:34:07',
                lastLoginIp: '192.168.3',
            },
            {
                userId: '4555665',
                jobNumber: '2585',
                headPhoto: '',
                weixinId: 'sfr4455hfjfj',
                userName: '张三的歌',
                mobilePhone: '16935689954',
                userEmail: 'zhangsan@zhuniu.com',
                addTime: '2019-03-16 19:34:07',
                lastLoginTime: '2019-03-16 19:34:07',
                lastLoginIp: '192.168.3',
            }],
            dialogVisibleDelete: false,
            dislogVisibleResetPWD: false
        }
    },
    methods: {
        //查询
        inquire(){
            if(this.inquireUserName || this.inquireWeixinId || this.inquireMobilePhone){
                console.log(111);
            }
        },
        //修改
        ModifyUser(){
            this.$router.push({name:'LonganUserModify'});
        },
        //删除
        deleteUser(){
            this.dialogVisibleDelete = true;

        },
        //重置密码
        ResetPWD(){
            this.dislogVisibleResetPWD = true;

        },
        //新增用户
        // UserAddLink(){
        //     this.$router.push({name:'LonganUserAdd'});
        // }
    }
}
</script>

<style lang="less" scoped>
.userlist{
    .add-user{
        float: left;
        margin: 10px 0px 20px 0px;
    }
    .head-link{
        width: 40px;
        height: 40px;
        background: #9f9;
        display: inline-block;
        position: absolute;
        top: 8px;
        left: 10px;
    }
}
</style>


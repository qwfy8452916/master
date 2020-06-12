<template>
    <div class="pagination">
        <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :pager-count="11"
            :page-sizes="pageSizes"
            :page-size="pageData.pageSize"
            :total="pageTotal"
            :current-page.sync="currentPage"
            @size-change="sizeChange"
            @current-change="current"
            @prev-click="prev"
            @next-click="next">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'LonganPagination',
    props: ["pageTotal"],
    data() {
        return{
            pageSizes: [10, 20, 50],
            currentPage: 1,
            pageNum: 1,
            pageData: {
                pageSize: 10,
                pageNum: 1,
            }
        }
    },
    mounted(){

    },
    methods: {
        //选择每页显示数量
        sizeChange(val){
            this.pageData.pageSize = val;
            this.$emit("pageFunc", this.pageData);
        },
        //选择某一页
        current(){
            this.pageData.pageNum = this.currentPage;
            this.$emit("pageFunc", this.pageData);
        },
        //上一页
        prev(){
            this.pageData.pageNum = this.pageData.pageNum - 1;
            this.$emit("pageFunc", this.pageData);
        },
        //下一页
        next(){
            this.pageData.pageNum = this.pageData.pageNum + 1;
            this.$emit("pageFunc", this.pageData);
        },
    }
}
</script>


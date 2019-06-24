<template>
	<div class="attachment-wrapper">
		<ul class="attachment-ul">
			<li v-for="(item,index) in attachmentList" :key="item.id">
				<p class="attachment-name">
					<span>{{ index + 1 }}、</span>
					{{ item.name }}
					<i class="delete-icon iconfont icon-guanbi" @click="$emit('delete-attachment',index)"></i>
				</p>
				<div class="img-div" v-if="item.isImg">
					<img :src="item.url" alt="附件" @click="imgPreview(item.url)" title="点击预览">
				</div>
			</li>
		</ul>
		<!-- 图片弹框预览 -->
		<el-dialog title="图片预览" :visible.sync="imgVisible" width="60%" append-to-body>
		    <div><img :src='imgurl' style="margin: 0 auto;display: inherit;width: 100%"/></div>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		name: 'attachmentList',
		props: {
			attachmentList: Array
		},
		data(){
			return {
				imgurl: '',
				imgVisible: false
			}
		},
		methods: {
			//图片预览
			imgPreview(url){
				this.imgurl = url;
				this.imgVisible = true;
			}
		}
	}
</script>

<style>
	.attachment-wrapper .el-dialog__header{
		padding-top: 10px;
		padding-bottom: 0;
	}
</style>

<style scoped>
	.attachment-ul,.attachment-ul li{
		list-style: none;
	}
	.attachment-wrapper{
		width: 80%;
		max-width: 500px;
	}
	.attachment-ul{
		padding-left: 0;
	}
	.attachment-ul .img-div{
		width: 100px;
	}
	.attachment-name{
		font-size: 12px;
		line-height: 24px;
		cursor: pointer;
		padding-left: 10px;
		padding-right: 10px;
	}
	.attachment-name:hover{
		background: #eee;
		color: #409eff;
	}
	.attachment-name .delete-icon{
		float: right;
		font-size: 12px;
	}
	.img-div{
		padding-left: 30px;
		cursor: pointer;
	}
	.img-div img{
		width: 100%;
	}
</style>
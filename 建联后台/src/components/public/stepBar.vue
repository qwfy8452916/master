<template>
	<div class="steps">
		<div class="colorful">
			<div class="color"><span class="colorful1"></span>未开始</div>
			<div class="color"><span class="colorful2"></span>已结束</div>
			<div class="color"><span class="colorful3"></span>执行中</div>
			<div class="color"><span class="colorful4"></span>已完成</div>
		</div>
		<div class="step">
<!-- 			<el-steps :active="stepData.curStep" finish-status="success">
				<el-step 
					v-for="(item,index) in stepData.steps"
					:title="item.title"
					:description="item.description"
					:icon="item.icon"
					:status="item.status"
					:key="item.id"
					></el-step>
			</el-steps> -->

			<!-- 自定义步骤条 -->
            <ul class="zn-steps" :style="{'padding-top': paddingTop,'margin-bottom': marginBottom}" v-if="stepList.length > 0">
                <li class="zn-step" :style="{flexBasis: computeWidth}" v-for="(item, index) in stepList" :key="item.id + '-' + index">
                    <!-- 并行流程 -->
                    <div v-if="item.child && item.child.length > 1 && !item.isChild" class="paralle-wrapper">
                        <div class="parent-div" ref="parallelWrapper">
                            <div class="child-div" v-for="(childItem, childIndex) in item.child" :key="childItem.id + '-' + childIndex">
                                <div class="step-line" :class="showChildStatus(index + 1, childItem.status)"></div>
                                <div class="icon-wrapper">
                                    <div class="step-icon-content" :class="showChildStatus(index + 1, childItem.status)">
                                        <div class="step-icon-div">
                                            <i class="zn-step-icon" :class="childItem.icon"></i>
                                        </div>
                                        <div class="step-role" :title="childItem.title">{{ childItem.title }}</div>
                                    </div>
                                </div>
                                <div class="step-operator" v-show="showDescription(index + 1, childItem.status)">{{ childItem.description }}</div>
                            </div>
                        </div>
                        <div class="paralle-step-desc" :class="showStatus(index + 1, item.current_status)">{{ item.process_desc }}</div>
                        <div class="paralle-step-line" :class="showStatus(index + 1, item.current_status)"></div>
                    </div>
                    <div v-else>
                        <div class="step-icon-wrapper">
                            <div class="step-icon-content" :class="showStatus(index + 1, item.current_status)">
                                <div class="step-icon-div">
                                    <i class="zn-step-icon" :class="item.icon"></i>
                                </div>
                                <div class="step-role" :title="item.title">{{ item.title }}</div>
                            </div>
                            <div class="step-operator" 
                                v-if="item.status != 'FINISHED'"
                                v-show="showDescription(index + 1, item.current_status)">
                                {{ item.description }}
                            </div>
                        </div>
                        <div class="step-line-wrapper" :class="showStatus(index + 1, item.current_status)">
                            <div class="step-desc">{{ item.process_desc }}</div>
                            <div class="step-line"></div>
                        </div>
                    </div>
                </li>
            </ul>
			<el-collapse class="operate-log">
				<el-collapse-item title="查看详情" name="1">
					<el-table :data="stepData.operateData" stripe style="width: 100%">
                        <el-table-column align="center" prop="demander" label="需求提交人"></el-table-column>
						<el-table-column align="center" prop="submitTime" label="提交时间"></el-table-column>
						<el-table-column align="center" prop="approver" label="审批人"></el-table-column>
                        <el-table-column align="center" prop="approveTime" label="审批时间"></el-table-column>
                        <el-table-column align="center" prop="duration" label="历时时间"></el-table-column>
                        <el-table-column align="center" prop="approveStatus" label="审核状态"></el-table-column>
                        <el-table-column align="center" prop="remark" label="备注"></el-table-column>
                        <el-table-column align="center" prop="log" label="日志"></el-table-column>
					</el-table>
				</el-collapse-item>
			</el-collapse>
		</div>
	</div>
</template>

<script>
	export default{
		name:"stepbar",
		props: {
			stepData: Object
		},
        data(){
            return {
                paddingTop: 0,
                marginBottom: '10px'
            }
        },
        computed: {
            computeWidth(){
                return (100 / this.stepData.steps.length).toFixed(4) + '%'
            },
            stepList(){ //串联子流程展开
                let stepList = [];
                this.stepData.steps.forEach((item, index) => {
                    if(item.type && item.type == 'SERIAL'){
                        item.child.forEach((childItem, childIndex) => {
                            childItem.isChild = true;
                            stepList.push(childItem);
                        })
                    }else{
                        stepList.push(item);
                    }
                });
                return stepList
            },
            currentStep(){
                let currentStep = 2;

            }
        },
        updated(){
            this.$nextTick(function(){
                this.adjustPositionForParallel();
            })
        },
        methods: {
            //展示当前状态
            showStatus(index,status){
                let statusStyle = {
                    'step-success': false,
                    'step-current': false,
                    'step-error': false
                }
                if(index == this.stepData.curStep){ //当前步
                    statusStyle['step-current'] = true;
                }
                if(index < this.stepData.curStep){ //已经完成的步
                    statusStyle['step-success'] = true;
                }
                if(status == 'error'){ //当前步错误状态
                    statusStyle['step-error'] = true;
                }
                return statusStyle
            },
            // 展示子流程状态
            showChildStatus(parentIndex, childStatus){
                let statusStyle = {
                    'step-success': false,
                    'step-current': false,
                    'step-error': false
                };
                if(parentIndex == this.stepData.curStep && childStatus == 'CHECKING'){
                    statusStyle['step-current'] = true;
                }
                if(childStatus == 'CHECK_APPROVE'){
                    statusStyle['step-success'] = true;
                }
                if(childStatus == 'CHECK_REJECT'){
                    statusStyle['step-error'] = true;
                }
                if(parentIndex == this.stepData.curStep && this.stepData.demandStatus == 'REJECT'){
                    //statusStyle['step-error'] = true;
                }
                return statusStyle
            },
            //有并行流程时调整进度条位置
            adjustPositionForParallel(){
                let list = [];
                let max_height;
                if(this.$refs.parallelWrapper){
                    list = this.$refs.parallelWrapper.map(item => {
                        return item.offsetHeight
                    })
                    max_height = Math.max(...list);
                    this.paddingTop = max_height / 2 + 'px';
                    this.marginBottom = (-max_height / 2 + 72) + 'px';
                }
            },
            //是否展示description
            showDescription(index, status){
                if(status == 'error' || status == 'CHECK_REJECT' || status == 'CHECK_APPROVE'){
                    return true
                }else{
                    return index == this.stepData.curStep ? false : true
                }
            }
        }
	}
</script>

<style lang="less" scoped>
	.steps{
        height: auto;
        width: 100%;
        .colorful{
            height: 30px;
            line-height: 30px;
            padding: 0 1%;
            text-align: center;
            margin-top: -20px;
            .color{
                float: right;
                width: 80px;
                color: #333;
                font-size: 8px;
                .colorful1{
                    display: inline-block;
                    height: 10px;
                    width: 10px;
                    background-color: #AAA;
                    margin-right: 5%;
                    border-radius: 20%;
                }
                .colorful2{
                    display: inline-block;
                    height: 10px;
                    width: 10px;
                    background-color: #D82A2A;
                    margin-right: 5%;
                    border-radius: 20%;
                }
                .colorful3{
                    display: inline-block;
                    height: 10px;
                    width: 10px;
                    background-color: #1482E5;
                    margin-right: 5%;
                    border-radius: 20%;
                }
                .colorful4{
                    display: inline-block;
                    height: 10px;
                    width: 10px;
                    background-color: #78C04C;
                    margin-right: 5%;
                    border-radius: 20%;
                }
            }
        }
        .step{
            border-bottom: 1px solid #e6e6e6;
            padding: 2%;
            margin-bottom: 2%;
        }
        // 自定义步骤条样式
        .zn-steps{
            position: relative;
            list-style: none;
            display: flex;
            padding-left: 0;
            color: #999;
            width: 100%;
            margin-top: 0;
            text-align:left;
        }
        .zn-step{
            position: relative;
            list-style: none;
        }
        .zn-step:last-child{
            .step-line-wrapper{
                display: none;
            }
            .step-icon-content{
                width: 70px;
                height: 70px;
                border: none;
            }
        }
        .step-icon-wrapper{
            position: absolute;
            display: inline-block;
            text-align: center;
            .step-icon-content{
                width: 50px;
                height: 50px;
                border: 1px solid #ccc;
                border-radius: 50%;
                .step-icon-div{
                    padding-top: 5px;
                }
            }
            .zn-step-icon{
                font-size: 16px;
            }
            .step-role{
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 12px;
            }
            .step-operator{
                padding-top: 5px;
                color: #333;
            }
        }
        .step-line-wrapper{
            display: inline-block;
            width: 100%;
            height: 76px;
            padding-left: 55px;
            padding-right: 5px;
            box-sizing: border-box;
            .step-desc{
                padding-top: 8px;
                padding-bottom: 5px;
                height: 12px;
                text-align: center;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 12px;
            }
        }
        .step-line{
            height: 1px;
            background: #ccc;
        }
        //并行进度条
        .paralle-wrapper{
            position: relative;
        }
        .parent-div{
            width: 60%;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            transform: translateY(-50%);
            margin-top: 25px;
        }
        .child-div{
            position: relative;
            width: 100%;
            height: 78px;
            margin-top: 20px;
            box-sizing: border-box;
            .step-line{
                position: absolute;
                left: 0;
                top: 26px;
                width: 100%;
                height: 1px;
                background: #ccc;
                z-index: 1;               
            }
            .step-operator{
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 100%;
                padding-top: 5px;
                color: #333;
                white-space: nowrap;
                text-align: center;
            }
        }
        .child-div:first-child{
            margin-top: 0;
            transform: translateY(-26px);
        }
        .child-div:last-child{
            margin-top: -32px;
            transform: translateY(52px);
        }
        .child-div:nth-child(2){
            margin-top: -6px;
        }
        .icon-wrapper{
            position: absolute;
            z-index: 9;
            width: 50px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            .step-icon-content{
                width: 50px;
                height: 50px;
                border: 1px solid #ccc;
                border-radius: 50%;
                background: #fff;
                .step-icon-div{
                    padding-top: 5px;
                }
            }
            .zn-step-icon{
                font-size: 16px;
            }
            .step-role{
                white-space: nowrap;
                font-size: 12px;
            }
        }
        .paralle-step-desc{
            position: absolute;
            top: -17px;
            right: 5px;
            width: calc(40% - 5px);
            height: 10px;
            padding-bottom: 5px;
            height: 12px;
            font-size: 12px;
            line-height: 12px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .paralle-step-line{
            position: absolute;
            top: 0;
            right: 5px;
            width: calc(40% - 5px);
            height: 1px;
            background: #ccc;
        }
        .operate-log{
            position: relative;
            z-index: 1;
        }
        //不同状态显示不同颜色
        .step-line-wrapper.step-current,
        .step-icon-wrapper .step-current,
        .paralle-wrapper .step-current{
            color: #0576DB;
            border-color: #0576DB;
        }
        .step-line-wrapper.step-success,
        .step-icon-wrapper .step-success,
        .paralle-wrapper .step-success{
            color: #5AB225;
            border-color: #5AB225;
        }
        .step-line-wrapper.step-error,
        .step-icon-wrapper .step-error,
        .paralle-wrapper .step-error{
            color: #D82A2A;
            border-color: #D82A2A;
        }
        .step-line-wrapper.step-current .step-line,
        .paralle-wrapper .step-line.step-current,
        .paralle-step-line.step-current{
            background: #0576DB;
        }
        .step-line-wrapper.step-success .step-line,
        .paralle-wrapper .step-line.step-success,
        .paralle-step-line.step-success{
            background: #5AB225;
        }
        .step-line-wrapper.step-error .step-line,
        .paralle-wrapper .step-line.step-error,
        .paralle-step-line.step-error{
            background: #D82A2A;
        }
    }
</style>
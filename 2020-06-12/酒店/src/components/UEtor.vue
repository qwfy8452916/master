<template>
    <div>
        <!--下面通过传递进来的id完成初始化-->
        <script :id="randomId"  type="text/plain"></script>
  </div>
</template>

<script>
import '../../static/UE/ueditor.config.js'
import '../../static/UE/ueditor.all.min.js'
import '../../static/UE/lang/zh-cn/zh-cn.js'
import '../../static/UE/ueditor.parse.min.js'
export default {
    name: 'UEtor',
    props: {
        /*
            在需要引入的组件中使用ue组件
            <UEtor :defaultMsg="defaultMsg" :ueConfig="ueConfig"  @ready="editorReady" ref="ue"></UEtor>
            defaultMsg: null,
            ueConfig: {
                initialFrameWidth: 900,
                initialFrameHeight: 350,
            },
            editorReady(instance) {
                instance.setContent(this.HotelADData.adContent);
                instance.addListener('contentChange', () => {
                    this.HotelADData.adContent = instance.getContent();
                });
            },
        */
        defaultMsg: {},
        //配置可以传递进来
        ueConfig: {}
    },
    data() {
        return {
            //每个编辑器生成不同的id,以防止冲突
            randomId: 'editor_' + (Math.random() * 100000000000000000),
            //编辑器实例
            instance: null,
            ready: false,
        };
    },
    watch: {
        defaultMsg: function(val, oldVal) {
            if (val != null  && this.ready) {
                this.instance = UE.getEditor(this.randomId, this.ueConfig);
                this.instance.setContent(val);
            }
        }
    },
    mounted(){
        this.initEditor();
    },
    methods: {
        initEditor() {
            const _this = this;
            //dom元素已经挂载上去了
            this.$nextTick(() => {
                this.instance = UE.getEditor(this.randomId, this.ueConfig);
                // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
                this.instance.addListener('ready', () => {
                    this.ready = true;
                    this.$emit('ready', this.instance);
                });
            });
        },
        getUEContent(){
            //获取内容方法
            return this.instance.getContent()
        }
    },
    beforeDestroy() {
        // 组件销毁的时候，要销毁 UEditor 实例
        if(this.instance !== null && this.instance.destroy) {
            this.instance.destroy();
        }
    },
}
</script>


<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view @login="loginDirect"></router-view>
		</transition>
	</div>
</template>

<script>
	import * as util from './assets/util.js'
	import routes from './router/routes'
	import { apiRequest } from './api/api'

	export default {
		name: 'app',
		components: {},
		data() {
			return {
	      menuData: null,
	      userData: null
	    }
		},
		methods: {
			signin: function(cb) {
	      let vm = this;
	      let localUser = util.getCookie('token');
	      if (!localUser) {
	        return vm.$router.push({ path: '/login', query: { from: vm.$router.currentRoute.path } });
	      }
        this.$router.addRoutes(routes);
        this.menuData = routes
        typeof cb === 'function' && cb();
	    },
			loginDirect(newPath) {
				this.signin(() => {
					this.$router.replace({path: newPath || '/home'});
				});
			}
		},
		created: function(newPath) {
	    this.signin(() => {
				this.$router.replace({path: location.hash.substr(2)});
			});
	  }
	}
</script>

<style lang="scss">
	body {
		margin: 0px;
		padding: 0px;
		/*background: url(assets/bg1.jpg) center !important;
			background-size: cover;*/
		// background: #1F2D3D;
		font-family: "STHeiti", "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
		font-size: 14px;
		-webkit-font-smoothing: antialiased;
	}
	#app {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}
	.el-submenu [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}
	.el-menu-item [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}
	.toolbar {
		background: #f2f2f2;
		padding: 10px; //border:1px solid #dfe6ec;
		margin: 10px 0px;
		.el-form-item {
			margin-bottom: 10px;
		}
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: all .2s ease;
	}
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}
</style>

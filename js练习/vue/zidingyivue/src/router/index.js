import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router=new Router({
	mode:'history',
	routes:[
	{
      path:'/',
      name:'yanshi',
      component:()=>import('@/components/fistjia/yanshi')
	},
	{
		path:'/HelloWorld',
		name:'HelloWorld',
		component:()=>import('@/components/HelloWorld')
	}
  ]
})
export default router


// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })

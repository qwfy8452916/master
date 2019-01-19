import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
import toubu from '@/components/fixed/fixedhead'

const router=new Router({
	mode:'history',
	routes:[
	{
		path:'/',
		// name:'yanshi1',
		redirect: '/yanshi',
		component:toubu,
		// component:()=>import('@/components/fistjia/yanshi')
		children: [{
			path: '/yanshi',
			name: 'yanshi',
      component: () => import('@/components/fistjia/yanshi')
    }]
  },
	{
		path:'/zujiandata',
		name:'yanshi02',
		component:()=>import('@/components/fistjia/yanshi02')
	  },
	  {
		path:'/fixedhead',
		name:'fixedhead',
		component:()=>import('@/components/fixed/fixedhead')
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

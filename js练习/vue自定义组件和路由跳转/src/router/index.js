import Vue from 'vue'
import Router from 'vue-router'
// 路由引入组件名
import Hello from '@/components/Hello' 
import tab from '@/components/tab'
import bar from '@/components/bar'
import baz from '@/components/baz'
import foo from '@/components/foo'
// 路由引入组件名

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
    	// 根目录
      path: '/',  
      name: 'tab',
      component: tab
    },
    {
    	path:'/bar',
    	name: 'bar',
    	component:bar
    },
    {
    	path:'/baz',
    	name: 'baz',
    	component:baz
    },
    {
    	path:'/foo',
    	name: 'foo',
    	component:foo
    }
  ]
})

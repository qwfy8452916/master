<?php

namespace app\common\controller;

use think\facade\Cache;
use app\common\model\logic\AccountLogic;
use app\common\model\logic\MenuLogic;
use think\Controller;

class MobileCommonBase extends Controller
{
    public function initialize()
    {
//        session('userInfo',null);
        if(!$this->request->isMobile()){
            session('userInfo',null);
            $this->redirect('//'.config('pc_host').'/login/');
        }

        //验证密码是否被更改
        if (!$this->checkPwd()) {
            session('userInfo', null);
            $this->redirect('/login/');
        }
        $this->rbac_rule();
    }

    //空操作
    public function _empty()
    {
        header("HTTP/1.1 404 Not Found");
        header("Status: 404 Not Found");
        $this->error('您访问的页面被外星人抓走了  _(:3 」∠)_');
        die();
    }

    public function _error($message = '你无权访问该页面!')
    {
        header("HTTP/1.1 404 Not Found");
        header("Status: 404 Not Found");
        $this->error($message);
    }

    /**
     * 获取该账号对应的权限访问路径
     * @return array|null
     */
    public function rbac_rule()
    {
        $menuLogic = new MenuLogic();
        $accountLogic = new AccountLogic();
        //获取装修公司信息
        $accountInfo = $accountLogic->getAccountInfo(['id' => session('userInfo.id')]);
        if (!$accountInfo) {
            return [];
        }
        //获取当前url目录
        $now_url = str_replace('.html', '', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
        if (substr($now_url, -1) != '/') {
            $now_url = $now_url . '/';
        }
        //1.如果是装修公司,则有所有菜单数据
        //2.所有可配置菜单(只有配置了才能做权限限制)
        $menu = Cache::get('Erp:Account:Menu:All');
        if (!$menu) {
            $menu = $menuLogic->getMenuList()['list'];
            Cache::set('Erp:Account:Menu:All', $menu, 15 * 24 * 60);
        }
        //3.如果是员工访问,则验证权限
        if (isset($accountInfo['class_type']) && $accountInfo['class_type'] == 2) {
            //获取当前员工的的菜单列表
            $AccountMenu = $menuLogic->getRbacMenuList();
            //不是ajax请求就要 验证当前路由是否有访问权限
            if (!isset($_SERVER["HTTP_X_REQUESTED_WITH"]) || strtolower($_SERVER["HTTP_X_REQUESTED_WITH"]) != "xmlhttprequest") {
                if ($this->request->method() != 'POST') {
                    //验证权限
                    if (!$this->checkUserUrl($now_url, $AccountMenu, $menu)) {
                        $this->error('您无权访问该页面!', '/');
                    }
                }
            }
            $menu = $AccountMenu;
        }
        return ['menu' => build_tree(0, $menu, 'parent_id'), 'url' => $now_url];
    }

    /**
     * 员工验证权限
     * @param $now_url 当前访问url
     * @param $accountMenu 员工菜单
     * @param $menu 可配置菜单
     * @return bool
     */
    private function checkUserUrl($now_url, $accountMenu, $menu)
    {
        //过滤的url
        $pass_url = ['/'];//首页不用验证
        if (in_array($now_url,$pass_url)) {
            return true;
        }

        $menuLogic = new MenuLogic();
        //1.验证 父级 是否有权限
        //1.1截取父级路由
        $p_url = '/' . explode('/', $now_url)[1] . '/';
        //1.2验证父级是否有权限
        $status = $menuLogic->checkMenu($p_url, $accountMenu);
        if ($status) {
            //2.验证自己菜单是否有权限
            $status = $menuLogic->checkMenu($now_url, $accountMenu);
            if (!$status) {
                //3.(没有数据)验证 可配置菜单是否 存在
                $status = $menuLogic->checkMenu($now_url, $menu);
                if ($status) {
                    //3.1 (有数据)说明需要限制
                    return false;
                }
            }
        } else {
            $info = $menuLogic->getMenuInfo($p_url);
            //1.3判断有没有父级
            if($info){
                //1.3父级没有权限 直接限制
                return false;
            }
        }
        //验证通过
        return true;
    }

    /**
     * 验证有没有修改过密码 , 修改则需要重新登陆
     * @return bool
     */
    private function checkPwd()
    {
        if(session('userInfo')){
            $where = ['a.id'=>session('userInfo.id')];
            $info = model('model/db/YxbAccount')->getCheckAccount($where);
            $pwd = md5($info['pass'] . 'qizuang.com');
            if($pwd == session('userInfo.pass_check')){
                return true;
            }
        }
        return false;
    }
}
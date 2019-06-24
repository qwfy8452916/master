// Home页面
const Home = resolve => {
  import("../pages/Home").then(module => {
    resolve(module);
  });
};

// 系统管理
const sysPremission = resolve => {
  import("../pages/sys/sys_premission").then(module => {
    resolve(module);
  });
};
const sysRole = resolve => {
  import("../pages/sys/sys_role").then(module => {
    resolve(module);
  });
};
const sysUser = resolve => {
  import("../pages/sys/sys_user").then(module => {
    resolve(module);
  });
};
const sysUserAdd = resolve => {
  import("../pages/sys/sys_user_add").then(module => {
    resolve(module);
  });
};
const Purorderlist = resolve => {
  import("../components/group/Purorderlist").then(module => {
    resolve(module);
  });
};
const Purorderdetail = resolve => {
  import("../components/group/Purorderdetail").then(module => {
    resolve(module);
  });
};

let routes = [
  {
    path: "/",
    component: Home,
    name: "系统管理（参考）",
    iconCls: "el-icon-menu",
    key: "sys_tree_root",
    hidden: false,
    children: [
      {
        path: "/sys_premission",
        key: "sys_premission",
        component: sysPremission,
        name: "权限管理",
        hidden: false

      },
      {
        path: "/sys_role",
        key: "sys_role",
        component: sysRole,
        name: "角色管理",
        hidden: false
      },
      {
        path: "/sys_user",
        key: "sys_user",
        component: sysUser,
        name: "用户管理",
        hidden: false
      },
      {
        path: "/sys_user_add",
        key: "sys_user_add",
        component: sysUserAdd,
        name: "添加新用户",
        hidden: false
      }
    ]
  },
  {
    path: "/",
    component: Home,
    name: "采购订单管理",
    iconCls: "el-icon-menu",
    key: "",
    hidden: false,
    children: [
      {
        path: "/Purorderlist",
        key: "Purorderlist",
        component: Purorderlist,
        name: "采购订单列表",
        hidden: false

      },
      {
        path: "/Purorderdetail",
        key: "Purorderdetail",
        component: Purorderdetail,
        name: "采购订单详情",
        hidden: true

      },

    ]
  },
  // { path: "*", hidden: true, name: "error", redirect: { path: "/404" } }
];

export default routes;

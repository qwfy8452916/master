# 七乐乐接口文档

## API接口地址
> 域名http://xinbingtuan.sevenlele.com/api

### 接口约定
- [接口请求类型] **POST**  
- [接口返回数据类型] **JSON**
- [接口返回数据参数说明]  
```
code 返回码
msg  返回说明文字
data 返回数据
```

### 全局返回码
```
1001 成功
2001 失败
3001 无效参数
4001 页面不存在
5001 服务器错误
``` 
### **首页**
- [首页全部] (#首页全部)
- [产品上滑翻页](#产品上滑翻页)

### **商品购物**
- [商品列表](#商品列表)
- [商品详情](#商品详情)
- [加入购物车](#添加购物车)
- [修改购物车](#修改购物车)
- [删除购物车](#删除购物车)
- [我的购物车](#我的购物车)
- [添加订单](#添加订单)
- [订单支付](#订单支付)
- [订单取消](#取消订单)
- [确认收货](#订单商品确认收货)

### **用户**
- [登录](#登录)
- [用户详情](#用户详情)
- [发送验证码](#发送验证码)
- [验证短信](#验证手机短信)
- [用户资料：修改资料](#修改资料)
- [我的地址：地址列表](#我的收货地址)
- [我的地址：添加地址](#保存收货地址)
- [我的地址：识别地址](#识别地址)
- [我的地址：收货地址详情](#收货地址详情)
- [我的地址：设置默认地址](#设置默认地址)
- [我的地址：删除地址](#删除地址)
- [我的订单：订单列表](#我的订单列表)
- [我的订单：订单详情](#我的订单详情)
- [我的订单：去支付](#去支付)
- [???订单详情：查看物流](#查看物流) 
- [???我的订单：查找物流费用](#查找物流费用)
- [地区数据：地址联动](#地区联动)
- [用户中心：首页](#用户中心首页)
- [用户中心：绑定分销商](#绑定分销商)
- [用户中心：佣金账户](#佣金日志)
- [用户中心：优惠券列表](#优惠券列表)
- [领取优惠券](#领取优惠券)

### **活动**
- [限时抢购：列表](#限时抢购-抢鲜众筹)
- [活动详情：限时抢购、众筹](#活动详情)
- [限时抢购：购买详情](#抢购产品订单)
- [限时抢购：去支付](#活动订单去支付)
- [抢鲜众筹：列表](#限时抢购-抢鲜众筹)
- [抢鲜众筹：众筹档位](#众筹档位)
- [抢鲜众筹: 购买详情](#众筹产品订单)
- [抢鲜众筹：去支付](#活动订单去支付)

### ***个人充值***
- [会员充值](#会员充值)

### ***分享拆红包-每人仅限一个红包***
- [我的红包](#我的红包)
- [好友的红包](#好友的红包)
- [帮好友拆红包](#帮好友拆红包)

## *下面接口可能不用暂时保留在文档中*

### **转发分销**
- [转发分销：获取产品](#获取产品信息)
- [转发分销：创建分销产品](#确认创建)
- [转发分销：转发产品详情](#转发产品详情)
- [转发分销：转发产品购买](#转发产品购买)
- [转发分销：转发产品支付](#转发产品支付) 
- [转发分销：我的转发记录](#我的转发记录)

### 乐享一刻
- [乐享一刻：发布文章](#发布乐享一刻)
- [乐享一刻：发布列表-已审核](#文章列表)
- [乐享一刻：我发布的文章](#我的文章)
- [图片上传：图片上传](#图片上传)
- [乐享一刻：关注](#关注文章)
- [乐享一刻：点赞](#文章点赞)

### 用户登录
#### 登录
###### POST /login/check_login
**参数**
```
code：微信登录code（必填）
nick_name：微信昵称 （选填）
user_photo:微信头像地址（选填）
 ```
###### 返回结果
```
{
    "code": "1001",
    "msg": "操作成功",
    "data": [
        {
           "token" : "WBHHJSUDHHHDJSJS0120SDDDSSDS"（用户登录token需要缓存起来）
           ”life_time“:"1511515799" (token 生命截止时间戳）
        }       
    ]
}
```

### 我的详情
#### 用户详情
###### POST /user/info
**参数**
```
token：用户token（必填）
 ```
###### 返回结果
```
{
    "code": "1001",
    "msg": "操作成功",
    "data": [
        {
          ”id“：1,
          ”mobile“:13569875421,
          "username": "李大吊",
          ”head_img“:”/upload/01/asdfsdfdsf.jpg“（头像[需要加上域名]）,
          ”email“:'',
          "register_date" : '2018-03-20 00:00:00',
          "last_login_date" : '0000-00-00 00:00:00',
          "user_money" :'0.00' (余额'),
          "level" :1 '用户等级'
        }       
    ]
}
```

### 手机短信
#### 发送验证码
###### POST /message/send_sms
**参数**
```
mobile：手机号（必填）
 ```
###### 返回结果
```
{
    "code": "1001",
    "msg": "操作成功"
}
```

### 手机短信
#### 验证手机短信
###### POST /message/check_sms
**参数**
```
mobile：手机号（必填）
code:短信验证码（必填）
 ```
###### 返回结果
```
{
    "code": "1001",
    "msg": "验证信息正确"
}
```

### 修改密码
#### 忘记密码-修改密码
###### POST /message/password_reset
**参数**
```
mobile：手机号（必填）
code:短信验证码（必填）
password：密码（必填）
 ```
###### 返回结果
```
{
    "code": "1001",
    "msg": "验证信息正确"
}
```

### 修改用户资料
#### 修改资料
###### POST /user/update_info
**参数**
```
token：验证token（必填）
field:修改字段名称（必填['username','head_img','sex']）
field_val：字段值（必填）
 ```
###### 返回结果
```
{
    "code": "1001",
    "msg": "修改成功"
}
```

#### 我的收货地址
###### POST /user/address_list
**参数**
```
token：验证token（必填）
 ```
###### 返回结果
```
{
    "code": "1001",
    "msg": "修改成功",
    data:[{
      ”id“：1,
      ”user_id“:13569875421,
      "real_name": "真实姓名",
      ”mobile“:”13569875741“,
      ”province_id“:'',
      "city_id" : '2018-03-20 00:00:00',
      "area_id" : '0000-00-00 00:00:00',
      "address" :'金阊文化教育大厦11楼筑牛网',
      "is_default" :1 '是否默认地址',
      "latitude":"12321.235",
      "longitude":"26.23654"
    }]
}
```

#### 保存收货地址
###### POST /user/address_save
**参数**
```
token：验证token（必填）
id:地址id（修改时必填）
real_name：收件人（必填）
mobile:手机号（必填）
address:详细地址（必填）
province_id:省id（必填）
city_id:城市id（必填）
area_id:区、县id（非必填）
longitude:经度（必填）
latitude:纬度（必填）
 ```
###### 返回结果
```
{
    "code": "1001",
    "msg": "t修改成功"
}
```

#### 收货地址详情
###### POST /user/address_detail
**参数**
```
token：验证token（必填）
id：地址id（必填）
 ```
###### 返回结果
```
{
    "code": "1001",
    "msg": "修改成功"，
    "data"[
    {
        id:地址id,
        real_name：收件人,
        mobile:手机号,
        address:详细地址,
        province_id:省id,
        city_id:城市id,
        area_id:区、县id,
        longitude:经度,
        latitude:纬度,
        region:省 市 区 字符串
    }]
}
```

#### 我的订单列表
###### POST /order
**参数**
```
token：验证token（必填）
status：订单状态（非必填项）
【 '1'：'待支付', '2' ：'待发货', '3'：'待收货'】
 ```
###### 返回结果
```
{
    "code": "1001",
    "msg": "成功"，
    "data"{
    "list":[
        {
            "id":"4",
            "order_no":"201803171754054709",
            "user_id":"141",
            "user_name":"\u4e60\u5927\u5927",
            "mobile":"18856356542",
            "pay_state":"1",
            "pay_type":"UserMoney",
            "pay_time":"1521280448",
            "money":"0.00",
            "wl_price":"5.00",
            "province":"\u6c5f\u82cf\u7701",
            "city":"\u82cf\u5dde\u5e02",
            "area":"\u59d1\u82cf\u533a",
            "self_address_id":"0",
            "address":"\u82cf\u5dde\u5e02\u59d1\u82cf\u533a\u4eba\u6c11\u6cd5\u9662",
            "consignee":"\u6797\u4fca\u6770",
            "add_time":"1521280445",
            "recommend_id":"0",
            "order_type":"1",
            "merge_buy_id":"0",
            "order_amount":"38.00",
            "coupon_receive_id":"0",
            "coupon_money":"0.00",
            "delivery_fee":"0.00",
            "orderInfo":[{
                "id":"4",
                "store_id":"0",
                "order_id":"4",
                "supplier_id":"111",
                "order_no":"201803171754054709",
                "product_id":"19",
                "assoc_table":"product",
                "product_title":"\u5c0f\u767d\u6768",
                "product_img":"\/upload\/26\/18\/47dbea29246b2c2d1f9298463576e3f0.jpeg",
                "product_money":"1.00",
                "product_nb_price":"1.80",
                "product_gys_price":"1.70",
                "num":"1",
                "add_time":null,
                "order_state":"1",
                "deliver_company":"",
                "deliver_no":"",
                "deliver_time":"0",
                "product_type":"1",
                "share_bind_id":"0",
                "bind_settlement":"0.00",
                "share_type":"0",
                "share_id":"0",
                "share_settlement":"0.00",
                "share_end_time":"0",
                "activity_id":"44",
                "js_status":"0"
            }
        ]
        ,
        "payState":[
            "\u672a\u652f\u4ed8",
            "\u5df2\u652f\u4ed8"
        ],
        "orderState":[
            "\u5f85\u652f\u4ed8",
            "\u5f85\u53d1\u8d27",
            "\u5f85\u6536\u8d27",
            "\u4ea4\u6613\u5b8c\u6210",
            "\u552e\u540e\u4e2d",
            "\u552e\u540e\u5b8c\u6210",
            "\u5f85\u81ea\u63d0"
            ]
        }
    }
}
```


#### 我的订单详情
###### POST /order/detail
**参数**
```
token：验证token（必填）
id:订单id（必填）
 ```
###### 返回结果
```
{
    "code": "1001",
    "msg": "成功"，
    "data"{
        "id":"4",
        "order_no":"201803171754054709",
        "user_id":"141",
        "user_name":"\u4e60\u5927\u5927",
        "mobile":"18856356542",
        "pay_state":"1",
        "pay_type":"UserMoney",
        "pay_time":"1521280448",
        "money":"0.00",
        "wl_price":"5.00",
        "province":"\u6c5f\u82cf\u7701",
        "city":"\u82cf\u5dde\u5e02",
        "area":"\u59d1\u82cf\u533a",
        "self_address_id":"0",
        "address":"\u82cf\u5dde\u5e02\u59d1\u82cf\u533a\u4eba\u6c11\u6cd5\u9662",
        "consignee":"\u6797\u4fca\u6770",
        "add_time":"1521280445",
        "recommend_id":"0",
        "order_type":"1",
        "merge_buy_id":"0",
        "order_amount":"38.00",
        "coupon_receive_id":"0",
        "coupon_money":"0.00",
        "delivery_fee":"0.00",
        "orderInfo":[{
            "id":"4",
            "store_id":"0",
            "order_id":"4",
            "supplier_id":"111",
            "order_no":"201803171754054709",
            "product_id":"19",
            "assoc_table":"product",
            "product_title":"\u5c0f\u767d\u6768",
            "product_img":"\/upload\/26\/18\/47dbea29246b2c2d1f9298463576e3f0.jpeg",
            "product_money":"1.00",
            "product_nb_price":"1.80",
            "product_gys_price":"1.70",
            "num":"1",
            "add_time":null,
            "order_state":"1",
            "deliver_company":"",
            "deliver_no":"",
            "deliver_time":"0",
            "product_type":"1",
            "share_bind_id":"0",
            "bind_settlement":"0.00",
            "share_type":"0",
            "share_id":"0",
            "share_settlement":"0.00",
            "share_end_time":"0",
            "activity_id":"44",
            "js_status":"0"
        }
        ]
        ,
        "payState":[
            "\u672a\u652f\u4ed8",
            "\u5df2\u652f\u4ed8"
        ],
        "orderState":[
            "\u5f85\u652f\u4ed8",
            "\u5f85\u53d1\u8d27",
            "\u5f85\u6536\u8d27",
            "\u4ea4\u6613\u5b8c\u6210",
            "\u552e\u540e\u4e2d",
            "\u552e\u540e\u5b8c\u6210",
            "\u5f85\u81ea\u63d0"
            ]
        }
    }
}
```

#### 查看物流
###### POST /user/get_tracking
**参数**
```
token：验证token（必填）
company：快递公司（必填）
code：快递号（必填）
 ```
###### 返回结果
```
{
    "code": "1001",
    "msg": "修改成功"，
    "data"[{
		"time": "2018-03-10 17:38:48",
		"ftime": "2018-03-10 17:38:48",
		"context": "[苏州市] 快件已在 [苏州吴中三部] 签收,签收人: 门卫, 感谢使用中通快递,期待再次为您服务!"
	}, {
		"time": "2018-03-10 14:14:15",
		"ftime": "2018-03-10 14:14:15",
		"context": "[苏州市] 快件已到达 [苏州吴中三部],业务员 魏小谋(18896517747) 正在第1次派件, 请保持电话畅通,并耐心等待"
	}, {
		"time": "2018-03-10 09:06:31",
		"ftime": "2018-03-10 09:06:31",
		"context": "[苏州市] 快件离开 [苏州中转部] 发往 [苏州吴中三部]"
	}, {
		"time": "2018-03-10 07:37:51",
		"ftime": "2018-03-10 07:37:51",
		"context": "[苏州市] 快件到达 [苏州中转部]"
	}, {
		"time": "2018-03-10 02:55:18",
		"ftime": "2018-03-10 02:55:18",
		"context": "[无锡市] 快件离开 [无锡中转部] 发往 [苏州中转部]"
	}, {
		"time": "2018-03-09 21:42:27",
		"ftime": "2018-03-09 21:42:27",
		"context": "[无锡市] 快件到达 [无锡中转部]"
	}, {
		"time": "2018-03-09 19:46:42",
		"ftime": "2018-03-09 19:46:42",
		"context": "[无锡市] 快件离开 [无锡长安] 发往 [无锡]"
	}, {
		"time": "2018-03-09 17:30:39",
		"ftime": "2018-03-09 17:30:39",
		"context": "[无锡市] [无锡长安] 的 赵娟 (18168881487) 已收件"
	}]
}
```


#### 广告位
###### POST /index/get_advert
**参数**
```
position：广告位置['home_branner','home_left','home_right']（必填）
 ```
###### 返回结果
```
{
"code":1001,
"msg":"ok",
"data":[
    {
       "link":"http:\/\/www.xinbingtuan.com\/",
       "logo":"\/upload\/advertise\/7f410abfc88e1b95b8e0483232ea5f2d.png",
       "name":"\u65b0\u5175\u56e2\u6b22\u8fce\u60a8"
     }   
    ]
}
```


#### 特惠商品
###### POST /index/get_product
###### 返回结果
```
{
"code":1001,
"msg":"ok",
"data":[
    {
        "id":"46",
        "title":"\u65b0\u7586\u5410\u9c81\u756a\u897f\u5dde\u871c",
        "logo":"\/upload\/72\/32\/bfc7223cce393bec5c5f4b14f6e0c875.jpeg",
        "cx_price":"13.00",
        "nb_price":"12.90",
        "price":"22.00",
        "weight":"1",
        "origin":"\u65b0\u7586",
        "standard":"80mm",
        "unit":"\u7bb1"
        }
   ]
}
```

#### 商品列表
#### /product/ajax_list
**参数**
```
token：接口认证（必填）
cat_id:分类id（非必填）
keyword：搜索关键词（非必填）
sort：排序字段（非必填）【price：价格，pay_num：效率】
order: 正序，倒序（1，0）
 ```
###### 返回结果
```
{
"code":1001,
"msg":"ok",
"data":[
    {
        "id":"46",
        "type":"1",
        "cat_id":"1",
        "title":"\u65b0\u7586\u5410\u9c81\u756a\u897f\u5dde\u871c",
        "logo":"\/upload\/72\/32\/bfc7223cce393bec5c5f4b14f6e0c875.jpeg",
        "price":"22.00",
        "cx_price":"13.00",
        "wl_price":"0.00",
        "pt_price":"0.00",
        "nb_price":"12.90",
        "gys_price":"10.00",
        "supplier_id":"34",
        "vedio_ids":"",
        "description":"详情",
        "address":"","add_date":
        "2017-10-27 09:25:42",
        "stock":"5",
        "is_onsale":"1",
        "code":"",
        "share_rate":"0.10",
        "back_rate":"0.02",
        "weight":"1",
        "reserve":"1",
        "third_party":"make in china",
        "reserve_time":"0",
        "origin":"\u65b0\u7586",
        "standard":"80mm",
        "unit":"\u7bb1",
        "xs_price":"13.00"
        }
   ]
}
```

### 商品详情
#### product/detail
**参数**
```
token：接口认证（必填）
id ：商品id（必填）
 ```
###### 返回结果
```
{
    "code":1001,
    "msg":"ok",
    "data":{
        "product":{
            "id":13,
            "type":1,
            "cat_id":1,
            "title":"\u5c0f\u767d\u83dc",
            "logo":"\/upload\/17\/91\/765ed513e4352a95e8bc2066b1ba40f5.jpeg",
            "price":"0.04",
            "cx_price":"32.00",
            "wl_price":"0.00",
            "pt_price":"0.00",
            "nb_price":"28.00",
            "gys_price":"20.00",
            "supplier_id":562,
            "vedio_ids":"",
            "description":"\u0026#60;p\u0026#62;\u53ef\u4ee5\u7684\u0026#60;\/p\u0026#62;",
            "address":"",
            "add_date":"2017-10-19 11:14:03",
            "stock":97,
            "is_onsale":1,
            "code":"",
            "share_rate":"0.15",
            "back_rate":"0.06",
            "weight":3,
            "reserve":1,
            "third_party":"15",
            "reserve_time":1518921638,
            "origin":"",
            "standard":"",
            "unit":"",
            "xs_price":"32.00"
        },
        "video":[],
        "cartCount":"0",
        "isFavorites":false
    }
}
```

### 添加购物车
#### user/ajax_add_cart
**参数**
```
token : 接口认证
product_id:产品id
```
###### 返回结果
```
{
    "code":1001,
    "msg":"ok",
    "data":{
        "count":5
    }
}
```

### 修改购物车
#### user/ajax_update_cart
**参数**
```
token : 接口认证
product_id:产品id
num：数量
```
###### 返回结果
```
{
    "code":1001,
    "msg":"ok"
}
```

### 删除购物车
#### user/ajax_del_cart
**参数**
```
token : 接口认证
ids:购物车id（多个产品id，分割）
```
###### 返回结果
```
{
    "code":1001,
    "msg":"ok"
}
```

### 我的购物车
#### user/shopping_cart
**参数**
```
token : 接口认证
```
###### 返回结果
```
{
    "code":1001,
    "msg":"ok",
    "data":[
        {
            "id":"48",
            "product_id":"13",
            "assoc_table":"product",
            "user_id":"141",
            "num":"1",
            "add_time":"1522055261",
            "share_id":"0",
            "share_end_time":"0",
            "title":"\u5c0f\u767d\u83dc",
            "logo":"\/upload\/17\/91\/765ed513e4352a95e8bc2066b1ba40f5.jpeg",
            "price":"0.04",
            "cx_price":32,
            "pt_price":"0.00",
            "type":"1",
            "supplier_id":"562",
            "address":"",
            "is_onsale":"1",
            "stock":"97"
        }
    ]
}
```

### 添加订单
#### pay/add_order
**参数**
```
token : 接口认证
cart_ids:购物车id集合（，分割）
```
###### 返回结果
```
{
    "code":1001,
    "msg":"ok",
    "data":{"product":[
        {"id":"48",
        "product_id":"13",
        "assoc_table":"product",
        "user_id":"141",
        "num":"1",
        "add_time":"1522055261",
        "share_id":"0","share_end_time":"0",
        "title":"\u5c0f\u767d\u83dc",
        "logo":"\/upload\/17\/91\/765ed513e4352a95e8bc2066b1ba40f5.jpeg",
        "price":"0.04",
        "cx_price":32,
        "pt_price":"0.00",
        "type":"1",
        "supplier_id":"562",
        "address":"",
        "is_onsale":"1",
        "stock":"97",
        "xs_price":32
        }
        ],
        "userAddress":{
        "id":"46",
        "user_id":"141",
        "real_name":"\u674e\u8bd7\u6dfc",
        "mobile":"18856535241",
        "province_id":"320000",
        "city_id":"320500",
        "area_id":"320505",
        "address":"\u5de5\u5175\u8def1564\u53f73\u680b",
        "add_date":"2018-03-23 18:25:32",
        "is_default":"1",
        "latitude":"31.335947",
        "longitude":"120.581043",
        "marking":"\u864e\u4e18\u5c71\u98ce\u666f\u533a",
        "province":"\u6c5f\u82cf\u7701",
        "city":"\u82cf\u5dde\u5e02",
        "area":"\u864e\u4e18\u533a"
        },
        "productIds":["13"],
        "userInfo":{
          ”id“：1,
          ”mobile“:13569875421,
          "username": "李大吊",
          ”head_img“:”/upload/01/asdfsdfdsf.jpg“（头像[需要加上域名]）,
          ”email“:'',
          "register_date" : '2018-03-20 00:00:00',
          "last_login_date" : '0000-00-00 00:00:00',
          "user_money" :'0.00' (余额'),
          "level" :1 '用户等级'
        }
    }
}
```

### 订单支付
#### pay/wx_pay
**参数**
```
token : 接口认证
wx_openid : 用户openid
cart_ids:购物车id
consignee: 收货人姓名
mobile： 收货人手机
province：地址省份
city ： 地址城市
area ： 地址区或县
address ：详细地址
pay_type："wechat"
wl_price：5 （物流费用）
order_type: 提货方式（1配送，2自提）
is_cart：1
```
###### 返回结果
```
{
    "code":1001,
    "msg":"ok",
    "data":{}
}
```

### 地区联动
#### user/get_area
***参数***
```
token : 接口认证（必填）
parent_id: 父级id（选填）第一次请求不需要此参数
```
#### 返还参数
```
{
    “code”:1001,
    "msg":"ok",
    "data":[
        {"id":"110000","region_name":"\u5317\u4eac"},
        {"id":"120000","region_name":"\u5929\u6d25"}
    ]
}
```

### 设置默认地址
#### user/address_set_def
***参数***
```
token: 接口认证（必填）
addr_id：地址id
```
#### 返回参数
```
{
    "code":1001,
    "msg":"成功"
}
```

### 删除地址
#### user/address_del
***参数***
```
token: 接口认证（必填）
addr_id：地址id
```
#### 返回参数
```
{
    "code":1001,
    "msg":"成功"
}
```

### 用户中心首页
### user/home
***参数***
```
token: 认证 （必填）
```
### 返回参数
```
{
    'code':1001,
    'msg':'成功',
    'data':{
    
    }
}
```

### 查找物流费用
#### pay/get_ship_fee
***参数***
```
token: 认证（必填）
addr_id:地址id（必填）
money:支付总金额 （必填）设计涉及到面免运费
```
### 返回参数
```
{
    code:1001,
    msg:'成功',
    data:5.00
}
```

### 去支付
#### pay/order_pay
***参数***
```
token:认证（必填）
order_sn:订单编号（必填）
```
### 返回参数
```
{
    code:1001,
    msg:'成功',
    data:{
    
    }
}
```

### 限时抢购-抢鲜众筹
#### activity/index
***参数***
```
token：认证（必填）
category：活动分类（限时抢购：flash_sale，抢鲜众筹:crowdfunding）
page:翻页（非必填：默认第一页）
size:每页条数（非必填：默认没也页10条）
```
### 返回参数
```
{
	"code":"1001",
	"msg":"\u6210\u529f",
	"data":{		
		"list":[
			{
				"id":"37",
				"title":"\u5f00\u5fc3\u679c",
				"product_id":"14",
				"type":"1",
				"price":"30",
				"img_url":"",
				"start_date":"1524550696",
				"end_date":"1525100458",
				"address_ids":"",
				"limit":"10",
				"stock":"300",
				"admin_id":"1",
				"is_onsale":"1",
				"status":"1",
				"created_at":"1524550957",
				"updated_at":"1524550957",
				"activity_category":"2",
				"cycle":"0",
				"rules":"0",
				"rule_price":"0.00",
				"protected_start":"0",
				"protected_end":"0",
				"limit_time":"0",
				"merge_buy_num":"2",
				"activity_des":"",
				"express":"1",
				"funding_type":"0",
				"media_type":"1",
				"media_addr":null,
				"weight":null,
				"product_title":"\u5f00\u5fc3\u679c",
				"logo":"\/upload\/47\/3\/9f1ad9897bfe447171b080b12ce0a0a3.jpeg",
				"unit":"\u5343\u514b"
			}
		],
		"page":1,
		"pageCount":1,
		"activity_category":"activity",
		"count":"1"
	}
}
```

### 首页全部
#### index/index
***参赛***
```
token:认证（必填）
```
### 返回参数
```
{
	"code": "1001",
	"msg": "首页数据",
	"data": {
		"advert": [{
			"alias": "home_branner",
			"link": "http:\/\/www.xinbingtuan.com\/",
			"logo": "\/upload\/advertise\/7f410abfc88e1b95b8e0483232ea5f2d.png",
			"name": "新兵团欢迎您"
		}, {
			"alias": "home_branner",
			"link": "http:\/\/www.xinbingtuan.com\/",
			"logo": "\/upload\/advertise\/0e09fa8de4e95bc394b505458fb3ad97.png",
			"name": "这是第二个广告"
		}, {
			"alias": "home_left",
			"link": "http:\/\/www.xinbingtuan.com\/",
			"logo": "\/upload\/advertise\/63dcb9611ac8e83832e39c399fa4edec.jpeg",
			"name": "阿克苏大红苹果"
		}, {
			"alias": "home_right",
			"link": "http:\/\/www.xinbingtuan.com\/",
			"logo": "\/upload\/advertise\/41b14dcb7cc84b6c88478023b2805492.jpeg",
			"name": "右边广告一"
		}, {
			"alias": "home_right",
			"link": "http:\/\/www.xinbingtuan.com\/",
			"logo": "\/upload\/advertise\/9d1bfd649424a7f4dfae008e48c8b390.jpeg",
			"name": "右边广告二"
		}],
		"qianggou": [{    ##### 限时抢购
			"id": "37",
			"title": "开心果",
			"product_id": "14",
			"type": "1",
			"price": "30",
			"img_url": "",
			"start_date": "1524550696",
			"end_date": "1525100458",
			"address_ids": "",
			"limit": "10",
			"stock": "300",
			"admin_id": "1",
			"is_onsale": "1",
			"status": "1",
			"created_at": "1524550957",
			"updated_at": "1524550957",
			"activity_category": "2",
			"cycle": "0",
			"rules": "0",
			"rule_price": "0.00",
			"protected_start": "0",
			"protected_end": "0",
			"limit_time": "0",
			"merge_buy_num": "2",
			"activity_des": "",
			"express": "1",
			"funding_type": "0",
			"media_type": "1",
			"media_addr": null,
			"weight": null,
			"product_title": "开心果",
			"logo": "\/upload\/47\/3\/9f1ad9897bfe447171b080b12ce0a0a3.jpeg",
			"unit": "千克"
		}],
		"zhunong": [{    ###### 助农
			"id": "35",
			"title": "海南大香蕉",
			"product_id": "9",
			"type": "1",
			"price": "100,200,500,1000",
			"img_url": "",
			"start_date": "1524153641",
			"end_date": "1525017641",
			"address_ids": "",
			"limit": "0",
			"stock": "0",
			"admin_id": "1",
			"is_onsale": "1",
			"status": "1",
			"created_at": "1524281969",
			"updated_at": "1524281969",
			"activity_category": "4",
			"cycle": "0",
			"rules": "0",
			"rule_price": "0.00",
			"protected_start": "0",
			"protected_end": "0",
			"limit_time": "0",
			"merge_buy_num": "1000",
			"activity_des": "<p>123123<\/p>",
			"express": "1",
			"funding_type": "6",
			"media_type": "2",
			"media_addr": "",
			"weight": "50KG,150KG,1000KG,3000KG",
			"product_title": "185纸皮核桃",
			"logo": "\/upload\/93\/59\/2d92fd0d823f5ea0febdc9752c29da61.jpeg",
			"unit": "千克"
		}],
		"youxuan": [{    ###### 优选
        			"id": "35",
        			"title": "海南大香蕉",
        			"product_id": "9",
        			"type": "1",
        			"price": "100,200,500,1000",
        			"img_url": "",
        			"start_date": "1524153641",
        			"end_date": "1525017641",
        			"address_ids": "",
        			"limit": "0",
        			"stock": "0",
        			"admin_id": "1",
        			"is_onsale": "1",
        			"status": "1",
        			"created_at": "1524281969",
        			"updated_at": "1524281969",
        			"activity_category": "4",
        			"cycle": "0",
        			"rules": "0",
        			"rule_price": "0.00",
        			"protected_start": "0",
        			"protected_end": "0",
        			"limit_time": "0",
        			"merge_buy_num": "1000",
        			"activity_des": "<p>123123<\/p>",
        			"express": "1",
        			"funding_type": "6",
        			"media_type": "2",
        			"media_addr": "",
        			"weight": "50KG,150KG,1000KG,3000KG",
        			"product_title": "185纸皮核桃",
        			"logo": "\/upload\/93\/59\/2d92fd0d823f5ea0febdc9752c29da61.jpeg",
        			"unit": "千克"
        		}],
		"xihuan": [{    ######### 猜你喜欢
			"id": "61",
			"title": "天畔玉米",
			"logo": "\/upload\/21\/79\/ac53b0961d86116a35b062acfd7f260e.jpeg",
			"cx_price": "45.80",
			"price": "45.80",
			"weight": "0.0",
			"origin": "新疆",
			"standard": "10根",
			"unit": "根"
		}]
	}
}
```

### 产品上滑翻页
#### index/getpage
***参赛***
```
token:认证（必填）
```
### 返回参数
```
{
	"code": "1001",
	"msg": "首页数据",
	"data": [{    ##### 限时抢购
        "id": "37",
        "title": "开心果",
        "product_id": "14",
        "type": "1",
        "price": "30",
        "img_url": "",
        "start_date": "1524550696",
        "end_date": "1525100458",
        "address_ids": "",
        "limit": "10",
        "stock": "300",
        "admin_id": "1",
        "is_onsale": "1",
        "status": "1",
        "created_at": "1524550957",
        "updated_at": "1524550957",
        "activity_category": "2",
        "cycle": "0",
        "rules": "0",
        "rule_price": "0.00",
        "protected_start": "0",
        "protected_end": "0",
        "limit_time": "0",
        "merge_buy_num": "2",
        "activity_des": "",
        "express": "1",
        "funding_type": "0",
        "media_type": "1",
        "media_addr": null,
        "weight": null,
        "product_title": "开心果",
        "logo": "\/upload\/47\/3\/9f1ad9897bfe447171b080b12ce0a0a3.jpeg",
        "unit": "千克"
	}]
}
```

### 取消订单
#### order/cancel_order
***参数***
```
token:认证（必填）
order_sn:订单号（必填）
```
返回参数
```
{
	"code":"1001",
	"msg":"\u6210\u529f"
}
```

### 订单商品确认收货
#### order/confirm_receipt
***参数***
```
token:认证（必填）
info_id:订单商品号（必填）
```
返回参数
```
{
	"code":"1001",
	"msg":"\u6210\u529f"
}
```

### 绑定分销商
#### message/binding_distributors
***参数***
```
token:认证（必填）
mobile:手机号 （必填）
code:手机验证码 （必填）
```
### 返回参数
```
{
    "code":"1001",
	"msg":"\u6210\u529f"
}
```

### 众筹档位
#### activity/crowdfunding_stalls
***参数***
```
token:认证（必填）
activity_id:众筹活动id(必填)
```
### 
```
{
	"code":"1001",
	"msg":"\u4f17\u7b79\u6863\u4f4d\u5217\u8868",
	"data":[
		{
			"id":"1",
			"active_id":"1",
			"price":"2000.00",
			"scale":"100kg",
			"target_amount":"100000.00",
			"overtop":"2",
			"order_num":"0",
			"addtime":"1524642702",
			"is_del":"1"
		}
	]
}
```

### 活动详情
#### activity/detail
***参数***
```
token:认证(必填)
detail:活动ID（必填）
category：（必填：activity,crowdfunding）活动别名
```
### 限时抢购返回结果
```
{
	"code": "1001",
	"msg": "成功",
	"data": {
		"id": "3",
		"title": "【限时抢购】夏威夷果",
		"product_id": "15",
		"type": "1",
		"price": "40",
		"img_url": "",
		"start_date": "04-26 14:09",
		"end_date": "06-30 00:00",
		"stock": "100",
		"keywords": "",
		"activity_des": "",
		"alias": "activity",
		"activity_category": "28",
		"product_title": "夏威夷果",
		"logo": "\/upload\/62\/7\/82c3a2015cdc15a1758e6927ffea5ef9.jpeg",
		"unit": "千克",
		"product_price": "45.00",
		"weight": "0.5",
		"origin": "新疆",
		"standard": "原产地",
		"description": "HTML"
	}
}
```
#### 众筹返回结果
```
{
	"code": "1001",
	"msg": "成功",
	"data": {		
		"id": "4",
		"title": "【集中采购】新疆吐鲁番西州蜜",
		"product_id": "0",
		"type": "1",
		"price": "1000.00",
		"img_url": "\/upload\/76\/22\/ca9cbe309d61ebf1fc215ae6f76a55da.jpeg",
		"start_date": "04-26 14:13",
		"end_date": "06-30 00:00",
		"stock": "0",
		"keywords": " 凉凉夏日我们一起去买西州蜜瓜吧。起采购价格更低，原产地发货，杜绝假货，可以以低价拿到、更新鲜更优质的水果。",
		"activity_des": "HTML",
		"alias":"crowdfunding",
		"activity_category":"29"		
	}
}
```


### 抢购产品订单
#### pay/activity_buy
***参数***
```
token:认证
activity_id:活动ID
category：（必填：activity,crowdfunding）活动别名
```
### 返回结果
```
{
	"code": "1001",
	"msg": "去支付吧",
	"data": {
		"activity": {
			"id": "3",
			"title": "【限时抢购】夏威夷果",
			"product_id": "15",
			"type": "1",
			"price": "40",
			"img_url": "",
			"start_date": "04-26 14:09",
			"end_date": "06-30 00:00",
			"stock": "100",
			"keywords": "",
			"activity_des": "",
			"alias": "activity",
			"activity_category": "28",
			"product_title": "夏威夷果",
			"logo": "\/upload\/62\/7\/82c3a2015cdc15a1758e6927ffea5ef9.jpeg",
			"unit": "千克",
			"product_price": "45.00",
			"weight": "0.5",
			"origin": "新疆",
			"standard": "原产地",
			"description": "HTML"
		},		
		"userAddress": null,
		"userInfo": {
			"id": "143",
			"mobile": "15912345678",
			"username": "fxs001",
			"head_img": "",
			"email": "ceshi@qq.com",
			"register_date": "0000-00-00 00:00:00",
			"last_login_date": "0000-00-00 00:00:00",
			"user_money": "0.00",
			"wx_openid": "o63hJ5LzKsh5o_0h6tQaotW8hYWk",
			"user_level": "2",
			"alias": "fenxiao_v2"
		}
	}
}
```

### 众筹产品订单
#### pay/activity_buy
***参数***
```
token:(必填)认证
activity_id:(必填)活动ID
category：（必填：crowdfunding）活动别名
scale_id：(必填)众筹档位ID
```
### 返回结果
```
{
	"code": "1001",
	"msg": "去支付吧",
	"data": {
		"activity": {
				"id": "5",
				"active_id": "4",
				"price": "2000.00",
				"scale": "80kg",
				"target_amount": "30000.00",
				"overtop": "2",
				"order_num": "0",
				"addtime": "1524735259",
				"is_del": "1",
				"title": "【集中采购】新疆吐鲁番西州蜜",
				"img_url": "\/upload\/76\/22\/ca9cbe309d61ebf1fc215ae6f76a55da.jpeg",
				"start_date": "1524723193",
				"end_date": "1530288019",
				"activity_des": "HTML"
			},
			,"userAddress":null,
			"userInfo":{
				"id":"143",
				"mobile":"18525654241",
				"username":"fxs001",
				"head_img":"",
				"email":"fxs001@xinbingtuan.com",
				"register_date":"0000-00-00 00:00:00",
				"last_login_date":"0000-00-00 00:00:00",
				"user_money":"0.00",
				"wx_openid":null,
				"user_level":"1",
				"alias":
				"fenxiao_v1"
			}
	}
}
```

### 活动订单去支付
#### pay/wx_pay
***参数***
```
token:(必填)认证
activity_id:(必填)活动ID
num：购买数量（必填）
order_alias：（必填：activity，crowdfunding）活动别名
consignee：收货人（必填）
mobile：收货人手机
province：省份（中文）
city：城市
area：区县
address：详细地址
pay_type：支付方式【wechat：微信支付，UserMoney：用户余额】
wl_price：物流费用
order_type：送货方式 （1物流，2自提）
is_cart：是否购物车（0这里必须填0）
scale_id：众筹档位ID（众筹产品必填）
```
### 返回结果
```
{
	code:"1001",
	msg:"",
	data:{
	
	}
}
```

### 获取产品信息
#### distribution/get_product
***参数***
```
token:认证(必填)
id:产品ID（必填）
```
### 返回结果
```
{
	"code": "1001",
	"msg": "成功",
	"data": {
		"id": "70",
		"title": "【五一大促】【尝鲜装】马连庄甜瓜中国地标性特产·瓜香浓郁【收件人必须实名】",
		"logo": "\/upload\/180502\/55\/b2e9395d8d9d9a656547e822cfee0940.jpeg",
		"price": "59.00",
		"pt_price": "48.00",
		"weight": "2.0",
		"origin": "山东",
		"standard": "7个",
		"unit": "箱"
	}
}
```

### 确认创建
#### distribution/add_distribution
***参数***
```
token:认证(必填)
product_id:产品ID（必填）
price:销售价格
```
### 返回结果
```
{
	"code": "1001",
	"msg": "成功",
	"data": {
		"id": "1"		
	}
}
```

### 转发产品详情
#### distribution/get_info
***参数***
```
token:认证(必填)
id:转发成功ID（必填）
```
### 返回结果
```
{
	"code": "1001",
	"msg": "成功",
	"data": {
		"id": "1",
		"product_id": "59",
		"title": "大美鲜疆 冰淇淋酸奶",
		"porduct_img": "\/upload\/68\/54\/3e60c3ac0c8571fe1c8f771ecec0030c.jpeg",
		"stock_price": "73.00",
		"price": "66.00",
		"keywords": "",
		"create_id": "144",
		"created_at": "1524809762",
		"updated_at": "1524809762",
		"product_price": "88.00",
		"description": " ",
		"weight": "0.1",
		"origin": "新疆",
		"standard": "120g*12杯",
		"unit": "千克",
		"head_img": "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTKkeAgcDSuVibv8Q1dKky2kCrCcIjdrtQIhZGMviaOXrK3EGn73cwuSib5tWdyO0p15lSvYC7kdgj0Dw\/0",
		"username": "林子大了"
	}
}
```


### 转发产品购买
#### distribution/confim_order
***参数***
```
token:认证(必填)
id:产品ID（必填）
```
### 返回结果
```
{
	"code": "1001",
	"msg": "去支付吧",
	"data": {
		"product": {
			"id": "1",
			"product_id": "59",
			"title": "大美鲜疆 冰淇淋酸奶",
			"porduct_img": "\/upload\/68\/54\/3e60c3ac0c8571fe1c8f771ecec0030c.jpeg",
			"stock_price": "73.00",
			"price": "66.00",
			"keywords": "",
			"create_id": "144",
			"created_at": "1524809762",
			"updated_at": "1524809762"
		},
		"userAddress": {
			"id": "48",
			"user_id": "144",
			"real_name": "林芝大",
			"mobile": "15865321452",
			"province_id": "130000",
			"city_id": "130200",
			"area_id": "130202",
			"address": "噢啦哈哈",
			"add_date": "2018-04-13 15:16:02",
			"is_default": "1",
			"latitude": "31.310461044311523",
			"longitude": "120.59888458251953",
			"marking": "",
			"province": "河北省",
			"city": "唐山市",
			"area": "路南区"
		},
		"userInfo": {
			"id": "144",
			"mobile": "15988888888",
			"username": "林子大了",
			"head_img": "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTKkeAgcDSuVibv8Q1dKky2kCrCcIjdrtQIhZGMviaOXrK3EGn73cwuSib5tWdyO0p15lSvYC7kdgj0Dw\/0",
			"email": "ceshi@qq.com",
			"register_date": "2018-04-13 09:23:54",
			"last_login_date": "2018-04-27 16:01:54",
			"user_money": "0.00",
			"wx_openid": "o63hJ5H23zj8JR2DsUJQZz6OQ3dc",
			"user_level": "2",
			"alias": "fenxiao_v2",
			"level_name": "分销商"
		}
	}
}
```

### 转发产品支付
#### pay/wx_pay
***参数***
```
token:认证(必填)
distribution_id:转发产品ID（必填）
num：购买数量（必填）
order_alias：distribution
consignee：收货人（必填）
mobile：收货人手机
province：省份（中文）
city：城市
area：区县
address：详细地址
pay_type：支付方式【wechat：微信支付，UserMoney：用户余额】
wl_price：物流费用
order_type：送货方式 （1物流，2自提）
is_cart：是否购物车（0这里必须填0）
```
### 返回结果
```
{
	code:1001,
	msg:"ok",
	data:{
	
	}
}
```

### 识别地址
#### user/show_addr
***参数***
```
token:认证(必填)
address:地址字符串
```
### 返回结果
```
{
	code:1001,
	msg:"ok",
	data:{
		 "18856985741",
		 "湖北省",
		 "晋州市",
		 "某某区",
		"某某县江景中路号"
	}
}
```

### 我的转发记录
#### distribution/user_distribution
***参数***
```
token:认证(必填)
```
### 返回结果
```
{
	"code": "1001",
	"msg": "成功",
	"data": {
		"pageCount": 1,
		"page": 1,
		"list": [{
			"id": "1",
			"product_id": "59",
			"title": "大美鲜疆 冰淇淋酸奶",
			"porduct_img": "\/upload\/68\/54\/3e60c3ac0c8571fe1c8f771ecec0030c.jpeg",
			"stock_price": "73.00",
			"price": "66.00",
			"keywords": "",
			"create_id": "144",
			"created_at": "1524809762",
			"updated_at": "1524809762",
			"product_price": "78.00",
			"weight": "0.1",
			"origin": "新疆",
			"standard": "120g*12杯",
			"unit": "千克",
			"head_img": "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTKkeAgcDSuVibv8Q1dKky2kCrCcIjdrtQIhZGMviaOXrK3EGn73cwuSib5tWdyO0p15lSvYC7kdgj0Dw\/0",
			"username": "林子大了"
		}]
	}
}
```

### 文章列表
#### article/index
***参数***
```
token:认证(必填)
```
### 返回结果
```
{
	"code": "1001",
	"msg": "成功",
	"data": {
		"list": [{
			"id": "1",
			"title": "胸不平何以平天下",
			"product_id": "0",
			"user_id": "0",
			"category": "1",
			"media_type": "1",
			"img_files": "\/upload\/24\/85\/7e5f3c1c0ce7fe5c31e62a21cce1dc6e.jpeg",
			"media_files": null,
			"content": "这是吃的什么呀这么香，都馋的我流口水林。。。",
			"admin_id": "0",
			"status": "1",
			"created_at": "1525405693",
			"updated_at": "1525405693",
			"username": null,
			"follow_count": "1",
			"praise_count": "1"
		}],
		"page": 1,
		"count": "2",
		"pageCount": 1
	}
}
```

### 我的文章
#### article/user_list
***参数***
```
token:认证(必填)
```
### 返回结果
```
{
	"code": "1001",
	"msg": "成功",
	"data": {
		"list": [{
			"id": "1",
			"title": "胸不平何以平天下",
			"product_id": "0",
			"user_id": "0",
			"category": "1",
			"media_type": "1",
			"img_files": "\/upload\/24\/85\/7e5f3c1c0ce7fe5c31e62a21cce1dc6e.jpeg",
			"media_files": null,
			"content": "这是吃的什么呀这么香，都馋的我流口水林。。。",
			"admin_id": "0",
			"status": "1",
			"created_at": "1525405693",
			"updated_at": "1525405693",
			"username": null,
			"follow_count": "1",
			"praise_count": "1"
		}],
		"page": 1,
		"count": "2",
		"pageCount": 1
	}
}
```

### 发布乐享一刻
#### article/article_save
***参数***
```
token:认证(必填)
title:文章标题（必填）
content：文章内容（必填）
img_files：图片列表（，分割）【必填】
```
### 返回结果
```
{
	"code": "1001",
	"msg": "成功"	
}
```


### 图片上传
#### article/upload_img
***参数***
```
token:认证(必填)
id:产品ID（必填）
```
### 返回结果
```
{
	"code": "1001",
	"msg": "成功",
	"data": {		
		"adfasdfasdfasdf.jpg"
	}
}
```

### 关注文章
#### article/add_follow
***参数***
```
token:认证(必填)
article_id:产品ID（必填）
form_id:微信form组件id
```
### 返回结果
```
{
	"code": "1001",
	"msg": "关注成功"	
}
```

### 文章点赞
#### article/add_praise
***参数***
```
token:认证(必填)
article_id:产品ID（必填）
form_id:微信form组件id
```
### 返回结果
```
{
	"code": "1001",
	"msg": "点赞成功"	
}
```

### 产品分类
#### /product/category
***返回结果***
 ```
{
	"code": "1001",
	"msg": "成功",
	"data": [{
		"id": "1",
		"name": "鲜果",
		"alias": "#",
		"link": "#",
		"pCount": "6"
	}]
}
 ```
 
 ### 佣金日志
 #### /product/category
 ***参数***
 ```
token:认证（必填）
start_date:（非必填）开始时间（2018-01-20）
end_date:（非必填）结束时间（2018-01-20）
 ```
 #### 返回结果
 ```
{
	"code": "1001",
	"msg": "成功",
	"data": {
		"pageCount": 1,
		"page": 1,
		"data": [{
			"id": "3",
			"user_id": "161",
			"assoc_table": "users_account",
			"money": "10.00",
			"order_id": "95",
			"order_info_id": "95",
			"product_id": "150",
			"product_title": "【现货】大美鲜疆冰淇淋酸奶120g*12杯",
			"created_at": "1525865175",
			"remark": "分享者分销佣金",
			"head_img": "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/QJNWyQh9KN4T1fc6vYB28VQxVnMWJEJLwicBkLp5I2SPHug5FBzvv8Tv6u9VicaUSthocQluU81ibOgIIkjx10JPA\/132",
			"add_time": "2018-05-09"
		}]
	}
}
 ```
 
 ## 分享拆红包
 ### 我的红包
 #### GET activity/helpredbag
 ***参数***
 ```
 token:认证(必填)
 ```
 ### 返回结果
 ```
 {
 	"code": "1001",
 	"msg": "成功",
 	"data": [{
 	    'user' => '',
 	    'redbag' => '',
 	    'count' => ''
 	}]
 }
 ```
 
 ### 好友的红包
 #### GET activity/openredbag
 ***参数***
 ```
 token:认证(必填)
 id:user_id(必填)
 ```
 ### 返回结果
 ```
 {
 	"code": "1001",
 	"msg": "成功",
 	"data": [{
 	    'user' => '',
 	    'redbag' => ''
 	}]
 }
 ```
 
 ### 帮好友拆红包
 #### GET activity/ajax_helpopen
 ***参数***
 ```
 token:认证(必填)
 uid:user_id(必填)
 ```
 ### 返回结果
 ```
 {
 	"code": "1001",
 	"msg": "成功",
 	"data": []
 }
 ```
 
### 会员充值
#### GET recharge/wx_pay
***参数***
```
token:认证(必填)
price:充值金额(必填)
```
### 返回结果
```
{
"code": "1001",
"msg": "success!",
"data": [

]
}
```
  
### 优惠券列表
#### GET coupon/lists
***参数***
```
token:认证(必填)
```
### 返回结果
```
{
    "code": "1001",
    "msg": "success!",
    "data": [
    
    ]
}
```
### 领取优惠券
#### GET coupon/receive
***参数***
```
token:认证(必填)
cid:优惠券ID(必填)
```
### 返回结果
```
{
    "code": "1001",
    "msg": '领取成功！',
    "data": [
        'money'=>'',
        'msg'=>'',
        'couponList'=>''
    ]
}
```

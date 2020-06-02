if(!self.__appxInited) {
self.__appxInited = 1;
require('@alipay/appx-compiler/lib/sjsEnvInit');

require('./config$');


var AFAppX = self.AFAppX.getAppContext
  ? self.AFAppX.getAppContext().AFAppX
  : self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;
        

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}

if(AFAppX.compilerConfig){ AFAppX.compilerConfig.component2 = true; }

function success() {
require('../../app');
require('../../components/tabbar/tabbar?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/login/login?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/verify/verify?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/setmessage/setmessage?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/myqecode/myqecode?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/bindcabinet/bindcabinet?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/cabinet/cabinet?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/repair/repair?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/cabinetlist/cabinetlist?hash=a2090241821113e4fb8ac212cb8b621a0cfc6688');
require('../../pages/housematterlist/housematterlist?hash=a2090241821113e4fb8ac212cb8b621a0cfc6688');
require('../../pages/bindcabinetedit/bindcabinetedit?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/deliveredlist/deliveredlist?hash=a2090241821113e4fb8ac212cb8b621a0cfc6688');
require('../../pages/personalcenter/personalcenter?hash=a2090241821113e4fb8ac212cb8b621a0cfc6688');
require('../../pages/updateinfo/updateinfo?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/updatepwd/updatepwd?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/getcash/getcash?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/shouquan/shouquan?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/myincome/myincome?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/buhuolist/buhuolist?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/tabbar/tabbar?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/checkdelivered/checkdelivered?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/delivereddetail/delivereddetail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/conplatedelivered/conplatedelivered?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/conplatedelivereddetail/conplatedelivereddetail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/getcashrecord/getcashrecord?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/user/user?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/getcashsuccess/getcashsuccess?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/indexselect/indexselect?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/housebulist/housebulist?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/logs/logs?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/hotel/hotel?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/index/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/replacerecord/replacerecord?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/detailnormal/detailnormal?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/repairsuccess/repairsuccess?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/lookdetail/lookdetail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/hotellist/hotellist?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}
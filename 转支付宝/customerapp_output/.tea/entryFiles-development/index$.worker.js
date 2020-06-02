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
require('../../components/pop/pop?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/redbagact/redbagact?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/newcomer/newcomer?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/text-input/text-input?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/text-time/text-time?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/text-radio/text-radio?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/text-textarea/text-textarea?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/text-data/text-data?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/input-number/input-number?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-antui/es/popup/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-antui/es/badge/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-antui/es/tabs/index?hash=b998354db5b64281090d8969355b2b3db41cda49');
require('../../node_modules/mini-antui/es/tabs/tab-content/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/area-select/index?hash=62f236f70e485aaaf11beda65e647925b3247954');
require('../../components/text-picker/text-picker?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/rili/rili?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/testzujian/testzujian?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/login/login?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/index/index?hash=ce6c7a4e3f4c21c097f23470ecdf8deb54f2e335');
require('../../pages/details/details?hash=079c2f0ca819693288adc2873c00261d8005e821');
require('../../pages/hotelstorylist/hotelstorylist?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/evaluate/evaluate?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/postevaluation/postevaluation?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/aftersale/aftersale?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/roomservice/roomservice?hash=ce6c7a4e3f4c21c097f23470ecdf8deb54f2e335');
require('../../pages/roomservicetype/roomservicetype?hash=0256460f61304960aa8b61a3d75ce0bad67dbec4');
require('../../pages/roomservicesuccess/roomservicesuccess?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/characteristic/characteristic?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/characteristicdetails/characteristicdetails?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/orderdetails/orderdetails?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/my/my?hash=079c2f0ca819693288adc2873c00261d8005e821');
require('../../pages/mybalance/mybalance?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mywithdraw/mywithdraw?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/kffulist/kffulist?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/livedhotel/livedhotel?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/map/map?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/specialty/specialty?hash=ce6c7a4e3f4c21c097f23470ecdf8deb54f2e335');
require('../../pages/hotelmalldetails/hotelmalldetails?hash=079c2f0ca819693288adc2873c00261d8005e821');
require('../../pages/hotelmalladdress/hotelmalladdress?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/hotelmallcar/hotelmallcar?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/hotelmallorder/hotelmallorder?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/hotelmallsuccess/hotelmallsuccess?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/hotelmallorderdetails/hotelmallorderdetails?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mhotelmallrefund/mhotelmallrefund?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mhotelmallafter/mhotelmallafter?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mhotelmallrefundlist/mhotelmallrefundlist?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/adview/adview?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/reservation/reservation?hash=29bd67f844eb4a17b60b7adfe55f8a9075cb2282');
require('../../pages/reservationdetail/reservationdetail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/reservationform/reservationform?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/reservationlist/reservationlist?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/reservationdetails/reservationdetails?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/billing/billing?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/billingrecord/billingrecord?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/billingdetail/billingdetail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/billingapply/billingapply?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/billingform/billingform?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/prodOrder/prodOrder?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/myorderDetails/myorderDetails?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/myorderDetail/myorderDetail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mycoupon/mycoupon?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/couponcenter/couponcenter?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/roomservicedetail1/roomservicedetail1?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/roomservicedetail2/roomservicedetail2?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/roomservicedetail3/roomservicedetail3?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/otherview/otherview?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/myredbag/myredbag?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/logs/logs?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/common/pop/pop?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/common/redbagact/redbagact?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/common/newcomer/newcomer?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/common/text-input/text-input?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/common/text-picker/text-picker?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/common/text-time/text-time?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/common/region-picker/region-picker?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/common/text-radio/text-radio?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/common/text-textarea/text-textarea?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/common/text-data/text-data?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/common/input-number/input-number?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/business/business?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/test/test?hash=b7efe897386ed97f14469f36aa10d309cb913aed');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}
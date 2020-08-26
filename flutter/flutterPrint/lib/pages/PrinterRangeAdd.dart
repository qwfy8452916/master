import 'package:flutter/material.dart';
import 'package:longan_counter/common/Api.dart';
import 'package:longan_counter/src/entity/PrinterCategory.dart';
import 'package:longan_counter/src/entity/PrinterFunc.dart';
import 'package:longan_counter/src/entity/PrinterFuncProduct.dart';
import 'package:longan_counter/utils/ColorUtil.dart';
import 'package:longan_counter/utils/DialogUtil.dart';
import 'package:longan_counter/utils/HttpUtil.dart';

class PrinterRangeAdd extends StatefulWidget {
  final Map arguments;
  PrinterRangeAdd({Key key, this.arguments}) : super(key: key);

  _PrinterRangeAddState createState() => _PrinterRangeAddState(arguments: arguments);
}

class _PrinterRangeAddState extends State<PrinterRangeAdd> {

  Map arguments = new Map();
  _PrinterRangeAddState({this.arguments});

  ///打印机与功能区的关系
  PrinterFunc _printerFunc;

  ///后台获取的分类列表
  List _categoryList = new List();

  ///已经被选中功能区IDs
  List<int>  _selectedFuncIds = new List();


  @override
  void initState() {
    super.initState();
    ///初始化关系
    if(null  != arguments ){
      _printerFunc =  arguments["printerFunc"];
      _getCategoryList(_printerFunc.funcId);
    }

    if(null  ==_printerFunc ){
      _printerFunc = new PrinterFunc();
      _printerFunc.funcId = 0;
      _printerFunc.funcProdFlag =0;
      _printerFunc.pCategorys = new  List();
      _printerFunc.pfProds = new  List();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("添加打印范围"),
        centerTitle: true,
      ),
      body:Column(
        children: <Widget>[
          Expanded(
            child: SingleChildScrollView(
              child: Container(
                color: Colors.white,
                  child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: <Widget>[
                    ///设置打印范围
                    Container(
                      padding: EdgeInsets.fromLTRB(10, 15, 10, 15),
                      child: Row(
                        children: <Widget>[
                          SizedBox(
                            width: 3,
                            child: Container(
                              height: 13,
                              decoration: BoxDecoration(
                                  color: ColorUtil.hexColor("#5C68C6"),
                                  borderRadius: BorderRadius.all(Radius.circular(1.5))
                              ),
                            ),
                          ),
                          SizedBox(width: 10),
                          Text(
                            '设置打印范围',
                            textAlign: TextAlign.left,
                            style: TextStyle(color: ColorUtil.hexColor("#1D38C4"),fontFamily: "PingFangSC-Regular",fontSize: 15),
                          )
                        ],
                      ),
                    ),
                    Divider(height: 0),
                    ///选择功能区
                    ListTile(
                        leading: Text("功能区  ",textAlign: TextAlign.left, style: TextStyle( color: ColorUtil.hexColor("#868FA3"), fontSize: 16),),
                        title: Text(_printerFunc.funcId == 0 ?"请选择功能区":_printerFunc.funcName,
                          textAlign: TextAlign.center,
                          style: TextStyle(color: _printerFunc.funcId == 0 ? ColorUtil.hexColor("#C5C9CF"):ColorUtil.hexColor("#2B2D30"),fontSize: 15),
                        ),
                        trailing: IconButton(
                          icon:Icon(Icons.keyboard_arrow_right),
                          iconSize: 29,
                          color: Color.fromRGBO(92, 104, 198, 0.3),
                          onPressed: (){
                            _funcSelection(context);
                          }
                        ),
                        onTap: (){
                          _funcSelection(context);
                        },
                      ),
                    Divider(height: 0),
                    ///分类
                    ListTile(
                      leading: Text("分类",textAlign: TextAlign.left, style: TextStyle( color: ColorUtil.hexColor("#868FA3"), fontSize: 16),),
                    ),
                    Container(
                      padding: EdgeInsets.only(right: 15,left: 15,bottom: 5),
                      child:Wrap(
                        spacing:10,
                        runSpacing:5,
                          verticalDirection:VerticalDirection.down,
                          children: _getCategoryWidgetList(),
                      ),
                    ),

                    Divider(height: 0),
                    ///商品选择
                    ListTile(
                      leading: Text("商品选择",textAlign: TextAlign.left, style: TextStyle( color: ColorUtil.hexColor("#868FA3"), fontSize: 16),),
                      title: Text(_printerFunc.funcProdFlag == 0 ?"不指定商品":(_printerFunc.funcProdFlag == 1 ?"指定商品": "除指定商品"),
                        textAlign: TextAlign.center,
                        style: TextStyle(color:ColorUtil.hexColor("#2B2D30"),fontSize: 15),
                      ),
                      trailing: IconButton(
                          icon:Icon(Icons.keyboard_arrow_right),
                          iconSize: 29,
                          color: Color.fromRGBO(92, 104, 198, 0.3),
                          onPressed: (){
                            _prodFlagSelection(context);
                          }
                      ),
                      onTap: (){
                        _prodFlagSelection(context);
                      },
                    ),
                    ///选择商品title
                    _printerFunc.funcProdFlag != 0?Container(
                      color: Color.fromRGBO(92, 104, 198, 0.1),
                      child: ListTile(
                        leading: Text("商品",textAlign: TextAlign.center, style: TextStyle( color: ColorUtil.hexColor("#868FA3"), fontSize: 16),),
                        trailing: IconButton(
                            icon:Icon(Icons.add_circle),
                            iconSize: 29,
                            color: ColorUtil.hexColor("#5C68C6"),
                            onPressed: (){
                              if(_printerFunc.funcId == null  ||  _printerFunc.funcId == 0){
                                DialogUtil.toast("请先选择功能区");
                                return;
                              }

                              Navigator.pushNamed(context, "/ProdList",arguments: {"funcId":_printerFunc.funcId,"funcProdIds":(null != _printerFunc.pfProds?_printerFunc.pfProds.map((e) => e.funcProdId).toList():[])}).then((value) => {
                                _getSelectedProd(value)
                              });
                            }
                        ),
                      ),
                    ):Container(),
                    ///被选中的商品列表
                    _printerFunc.funcProdFlag != 0?Container(
                      child: Column(
                        children: _getProdWidgetList(),
                      ),
                    ):Container(),

                  ],
                ),
              ),
            ),
          ),
          ///底部按钮
          Container(
            height: 50.0,
            child: SizedBox.expand(
              child: RaisedButton(
                child: Text('确定',style: TextStyle(fontSize: 16.0, color: Colors.white),),
                onPressed:_sure
              ),
            ),
          ),
        ],
      ),
    );
  }

  ///获取分类
  _getCategoryList(int funcId)  {
    HttpUtil().get(
      Api.categoryList,
      params: {'hotelId': Api.user.hotelId,'funcId':funcId},
      onSuccess: (data) {
        if(data is List){
          List<int> cids;
          if(null !=  _printerFunc.pCategorys  &&   _printerFunc.pCategorys.length>0){
            cids =  _printerFunc.pCategorys.map((e) => e.categoryId).toList();
          }
          data.forEach((element) {
            element["isSelected"] = false;
            if(null  !=  cids && cids.length>0 ){
              if(cids.contains(element["id"])){
                element["isSelected"] = true;
              }
            }
          });
          setState(() {
            _categoryList = data;
          });
        }
      },
      onError: (error) {
        DialogUtil.toast(error);
      },
    );
  }

  ///分类Widget列表
  List<Widget> _getCategoryWidgetList(){
    List<Widget>  categoryWidgetList   =  new  List();
    if(null  != _categoryList &&  _categoryList.length>0 ){

      _categoryList.forEach((category) {
        categoryWidgetList.add(
            Container(
              height: 30,
              decoration: BoxDecoration(
                border: Border.all(color: category["isSelected"] ? Color.fromRGBO(92, 104, 198, 0.2) : ColorUtil.hexColor("#D5D5D6") ),
                borderRadius: BorderRadius.circular(15)
              ),
              child: RaisedButton(
                  color: category["isSelected"] ? Color.fromRGBO(92, 104, 198, 0.2): Colors.white ,
                  elevation:0,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(15))
                  ),
                  textColor: category["isSelected"] ? ColorUtil.hexColor("#5C68C6"):ColorUtil.hexColor("#2B2D30"),
                  child: Text(category["categoryName"]),
                  onPressed: () {
                    _selectOrNoCategory(category);
                  }),
            )
        );
      });
    }
    return  categoryWidgetList;
  }

  ///选中或取消选中分类
  _selectOrNoCategory(Map category){
    category["isSelected"] = !category["isSelected"];
    if (category["isSelected"]) {
      PrinterCategory pc = new PrinterCategory();
      pc.hotelId = category["hotelId"];
      pc.categoryId = category["id"];
      pc.categoryName = category["categoryName"];
      _printerFunc.pCategorys.add(pc);
    } else {
      if (null != _printerFunc.pCategorys &&_printerFunc.pCategorys.length > 0) {
        _printerFunc.pCategorys.removeWhere((element) =>element.categoryId == category["id"]);
      }
    }

    print("${_printerFunc.pCategorys.length}");
    setState(() {});
  }

  ///选中的商品列表
  _getSelectedProd(List<PrinterFuncProduct> value){
    setState(() {
      if(null  !=  value && value.length>0){
        _printerFunc.pfProds  =value;
      }
    });
  }

  ///商品Widget列表
  List<Widget>  _getProdWidgetList(){
    List<Widget>  prodWidgetList   =  new  List();
    //被选中商品列表
    List<PrinterFuncProduct> selectProds  = _printerFunc.pfProds;
    if(null  != selectProds  && selectProds.length>0 ){
      for(int i = 0;i<selectProds.length;i++){
        prodWidgetList.add(Container(
          color: (i%2 == 0)?Colors.white : Color.fromRGBO(92, 104, 198, 0.1),
          child: ListTile(
            title: Text(selectProds[i].prodShowName),
            trailing: OutlineButton(
                child:Text("删除",style: TextStyle(color: Colors.red),),
                borderSide:BorderSide(style: BorderStyle.none),
                onPressed:(){
                  _printerFunc.pfProds.remove(selectProds[i]);
                  setState(() {});
                }
            ),
          ),
        ));
      }
    }
    return  prodWidgetList;
  }

  ///功能区选择项
  _funcSelection(BuildContext context) async{
    await HttpUtil().get(
      Api.funcList,
      params: {'hotelId': Api.user.hotelId, "funcIds": _selectedFuncIds == null? []:_selectedFuncIds},
      onSuccess: (data) {
        if (data is List) {
          List<Widget> funcTitleList  =  new  List();
          for(int  i = 0;i<data.length;i++){
            funcTitleList.add(Container(
              color: (i%2 == 0)?Colors.white : Color.fromRGBO(92, 104, 198, 0.1),
              child: ListTile(
                title: Text(data[i]["funcCnName"]),
                onTap: (){
                  if( _printerFunc.funcId != data[i]["id"]){
                    ///切换功能区初始化其他数据
                    _printerFunc.funcProdFlag =0;
                    _printerFunc.pCategorys = new  List();
                    _printerFunc.pfProds = new  List();

                    _printerFunc.funcName = data[i]["funcCnName"];
                    _printerFunc.funcId = data[i]["id"];
                    _getCategoryList(_printerFunc.funcId);
                  }

                  setState(() {});
                  Navigator.pop(context);
                },
              )),);
          }

          DialogUtil.showSelectionModalBottomSheet(context,funcTitleList);
        }else{
          DialogUtil.toast("暂无功能区");
        }
      },
      onError: (error) {
        DialogUtil.toast(error);
      },
    );
  }

  ///商品flag选项
  _prodFlagSelection(BuildContext context) async{

    List<Map<String,Object>>  prodFlagList = new List();
      Map<String,Object>  flag0 = new Map();
      flag0["progFlag"] = 0;
      flag0["flagName"] = "不指定商品" ;
      Map<String,Object>  flag1 = new Map();
      flag1["progFlag"] = 1;
      flag1["flagName"] = "指定商品" ;
      Map<String,Object>  flag2 = new Map();
      flag2["progFlag"] = 2;
      flag2["flagName"] = "除指定商品" ;
      prodFlagList.add(flag0);
      prodFlagList.add(flag1);
      prodFlagList.add(flag2);

    List<Widget> flagTitleList  =  new  List();
    for(int  i = 0;i<prodFlagList.length;i++){
      flagTitleList.add(Container(
          color: (i%2 == 0)?Colors.white : Color.fromRGBO(92, 104, 198, 0.1),
          child: ListTile(
            title: Text(prodFlagList[i]["flagName"]),
            onTap: (){

              if(_printerFunc.funcProdFlag != prodFlagList[i]["progFlag"]){
                _printerFunc.pfProds = new List();
                _printerFunc.funcProdFlag = prodFlagList[i]["progFlag"];
              }

              setState(() {});
              Navigator.pop(context);
            },
          )),);
    }

    DialogUtil.showSelectionModalBottomSheet(context,flagTitleList);

  }

  ///底部确定
  _sure(){
    if(null   ==  _printerFunc ||  _printerFunc.funcId == 0){
      DialogUtil.toast("至少需要指定功能区");
      return;
    }

    if(_printerFunc.funcProdFlag == 1  || _printerFunc.funcProdFlag == 2){
      if(null == _printerFunc.pfProds  || _printerFunc.pfProds.length <= 0 ){
        DialogUtil.toast("请选择商品");
        return;
      }
    }

    //市场分类关系
    if(null  != _printerFunc.pCategorys && _printerFunc.pCategorys.length> 0){
      //部分支持
      _printerFunc.categoryFlag =1;
    }else{
      //全部支持
      _printerFunc.categoryFlag =0;
    }

    if( null != _printerFunc.pfProds.length && _printerFunc.pfProds.length>3 ){
      _printerFunc.subPfProds = _printerFunc.pfProds.sublist(0,3);
      _printerFunc.isShowAll =false;
    }else{
      _printerFunc.subPfProds = _printerFunc.pfProds;
      _printerFunc.isShowAll =true;
    }

    Navigator.pop(context,_printerFunc);
  }


}

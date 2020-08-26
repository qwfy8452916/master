import 'package:flutter/material.dart';
import '../src/entity/PrinterFuncProduct.dart';
import '../common/Api.dart';
import '../utils/DialogUtil.dart';
import '../utils/HttpUtil.dart';

import '../utils/ColorUtil.dart';

class ProdList extends StatefulWidget {
  final Map arguments;

  ProdList({Key key, this.arguments}) : super(key: key);

  _ProdListState createState() => _ProdListState(arguments: arguments);
}

class _ProdListState extends State<ProdList> {
  Map arguments;

  _ProdListState({this.arguments});

  ///被选中商品
  List _selectedProds = new List();
  ///后台商品列表
  List _prods = new List();
  ///定义一个搜索商品的列表
  List _searchProds = new List();


  ///全选中
  bool _allSelected = false;
  ///搜索框焦点
  FocusNode _searchFocus = FocusNode();

  ///被选中上商品IDs
  List  _funcProdIds = new List();

  @override
  void initState() {
    super.initState();

    int  funcId = arguments["funcId"];
    _funcProdIds = arguments["funcProdIds"];
    //获取商品数据
    _getProds(funcId);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: Text("选择商品"),
            centerTitle: true),
        body: Container(
          decoration: BoxDecoration(color: Colors.white),
          child: Column(
            children: <Widget>[
              ///搜索
              _prods.length>0?Container(
                width: 300,
                margin: EdgeInsets.fromLTRB(37.5, 10, 37.5, 10),
                decoration: BoxDecoration(
                    color: ColorUtil.hexColor("#E9EAEA"),
                    borderRadius: BorderRadius.circular(30)),
                child: TextField(
                  focusNode: _searchFocus,
                  textAlign: _searchFocus.hasFocus? TextAlign.left: TextAlign.center,
                  decoration: InputDecoration(
                    contentPadding: EdgeInsets.all(5),
                    prefixIcon:  _searchFocus.hasFocus? Icon(Icons.search, size: 16):null,
                    labelStyle: TextStyle(fontSize: 15.0, color: Color.fromARGB(255, 93, 93, 93)),
                    hintText: _searchFocus.hasFocus?"请输入商品名称":"🔍请输入商品名称",
                    hintStyle: TextStyle(fontSize: 14,),
                    border: OutlineInputBorder(
                      borderSide: BorderSide.none,
                    ),
                  ),
                  onTap: (){
                    setState(() {});
                  },
                  onChanged: (v){
                    _findSearchProds(v);
                  },
                ),
              ):Container(),
              _prods.length>0?Divider(height: 0,):Container(),
              ///全选
              _searchProds.length>0?ListTile(
                title: Text(
                  "全选",
                  style: TextStyle(fontSize: 14),
                ),
                leading: Checkbox(
                  activeColor: ColorUtil.hexColor("#10BBBB"),
                  value: this._allSelected,
                  onChanged: (v) {
                    _selectAll();
                  },
                ),
                onTap:_selectAll
              ) :Container(),
              Expanded(
                child: this._searchProds.length > 0
                    ? ListView(children: this._listTitle())
                    : Text("暂无商品"),
              ),
              Container(
                height: 45.0,
                child: SizedBox.expand(
                  child: RaisedButton(
                    onPressed: sure,
                    child: Text(
                      '确定',
                      style: TextStyle(fontSize: 14.0, color: Colors.white),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ));
  }

  ///确定
  void sure() {
    List<PrinterFuncProduct>  pfpList = new List();
    if(null  != _selectedProds && _selectedProds.length>0){
      _selectedProds.forEach((element) {
        PrinterFuncProduct pfp = new PrinterFuncProduct();
        pfp.funcProdId = element["funcProdId"];
        pfp.prodShowName = element["prodShowName"];
        pfp.hotelId = element["hotelId"];
        pfpList.add(pfp);
      });
    }
    Navigator.pop(context,pfpList);
  }

  ///获取商品
  _getProds(int funcId) async {
    await HttpUtil().get(
      Api.unusedFuncProds,
      params: {'hotelId': Api.user.hotelId, 'funcId': funcId},
      onSuccess: (data) {
        if (data is List) {
          _selectedProds = new List();
          data.forEach((value) {
            //初始化未选择
            value["isSelected"] = false;

            if(null  !=  _funcProdIds &&  _funcProdIds.length>0){
              if(_funcProdIds.contains(value["funcProdId"])){
                value["isSelected"] = true;
                _selectedProds.add(value);
              }
            }
          });

          //如果全被选择了
          if( _selectedProds.length>0 && _selectedProds.length == data.length){
            _allSelected =true;
          }

          setState(() {
            _prods = data;
            _searchProds =data;
          });
        }
      },
      onError: (error) {
        DialogUtil.toast(error);
      },
    );
  }

  ///设置商品列表
  List<Widget> _listTitle() {
    List<Widget> list = new List();
    if (_searchProds.length > 0) {
      for (  int i = 0;i<_searchProds.length;i++) {
        list.add(Container(
          color: (i%2 == 1)?Colors.white : Color.fromRGBO(92, 104, 198, 0.1),
          child: ListTile(
              title: Text(
                _searchProds[i]["prodShowName"],
                style: TextStyle(fontSize: 14),
              ),
              leading: Checkbox(
                activeColor: ColorUtil.hexColor("#10BBBB"),
                value: _searchProds[i]["isSelected"],
                onChanged: (v) {
                  _selectPer(_searchProds[i]);
                },
              ),
              onTap: () {
                _selectPer(_searchProds[i]);
              }),
        ));
      }
    }
    return list;
  }

  ///单选
  _selectPer(prod){
    setState(() {
      prod["isSelected"] = !prod["isSelected"];
      //选中之后
      if (prod["isSelected"]) {
        _selectedProds.add(prod);

        if(_selectedProds.length == _searchProds.length){
          _allSelected =true;
        }
      } else {
        //取消选择
        _selectedProds.remove(prod);
        _allSelected =false;
      }
    });
  }

  ///全选
  _selectAll(){
    setState(() {
      this._allSelected = ! this._allSelected;
      _searchProds.forEach((prod) {
        prod["isSelected"] =  this._allSelected;
      });
      _selectedProds = new List();
      //选中，加入，
      if ( this._allSelected) {
        _selectedProds.addAll(_searchProds);
      }
      print("$_selectedProds");
    });
  }

  ///搜索商品
  _findSearchProds(String  prodName){
    //初始化被选中的数据
    _selectedProds = new List();
    _searchProds = new List();
    _allSelected = false;
    _prods.forEach((element) {
      element["isSelected"] =false;

      String  prodShowName = element["prodShowName"];
      if(prodShowName.indexOf(prodName)>-1){
        _searchProds.add(element);
      }
    });
    setState(() {});
  }

}

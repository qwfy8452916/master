abstract class PrintDataAdapter {
  //字符编码
  List<int> charEncode();

  //打印机基础指令--------------------------------------------------------------------------

  //初始化（解除禁止打印）
  List<int> initialize();

  //走纸一行(换行)
  List<int> lineFeed();

  //切纸
  List<int> cut();

  //蜂鸣
  List<int> beep();

  //字体样式--------------------------------------------------------------------------

  //默认行间距
  List<int> defRowSpace();

  //默认对齐方式
  List<int> defAlign();

  //默认字符大小
  List<int> defFont();

  //大字体
  List<int> bigFont();

  //小字体
  List<int> miniFont();

  //横向加宽
  List<int> widFont();

  //纵向加高
  List<int> highFont();

  //取消加粗(取消字体样式,变为小字体)
  List<int> cancelCrudeFont();

  //居中对齐
  List<int> alignCenter();

  //居左对齐
  List<int> alignLeft();

  //居右对齐
  List<int> alignRight();

  //二维码



  //条形码



  //位图





}

import '../PrintDataAdapter.dart';

class DataForSendToXinYe58Printer implements PrintDataAdapter {
  //字符编码
  @override
  List<int> charEncode() {
    return [0x1F, 0x1B, 0x1F, 0x46, 0x4F, 0x4E, 0x54, 0x00];
  }

  //打印机基础指令--------------------------------------------------------------------------

  //初始化（解除禁止打印）
  @override
  List<int> initialize() {
    return [0x1b, 0x40];
  }

  //走纸(换行)
  @override
  List<int> lineFeed() {
    return [0x1b, 0x4a, 0x10];
  }

  //切纸
  @override
  List<int> cut() {
    return [0x1D, 0x56, 0x42, 0x30];
  }

  //蜂鸣
  @override
  List<int> beep() {
    return [0x1b, 0x42, 0x01, 0x01];
  }

  //字体样式--------------------------------------------------------------------------

  //默认行间距
  @override
  List<int> defRowSpace() {
    return [0x1b, 0x32];
  }

  //默认对齐方式
  @override
  List<int> defAlign() {
    return [0x1D, 0x61, 0x0F];
  }

  //默认字符大小
  @override
  List<int> defFont() {
    return [0x1D, 0x21, 0x00];
  }

  //大字体
  @override
  List<int> bigFont() {
    return [0x1d, 0x21, 0x11];
  }

  //小字体
  @override
  List<int> miniFont() {
    return [0x1d, 0x21, 0x00];
  }

  //横向加宽
  @override
  List<int> widFont() {
    return [0x1b, 0x45, 0x01];
  }

  //纵向加高
  @override
  List<int> highFont() {
    return [0x1d, 0x21, 0x01];
  }

  //取消加粗(取消字体样式,变为小字体)
  @override
  List<int> cancelCrudeFont() {
    return [0x1b, 0x45, 0x00];
  }

  //居中对齐
  @override
  List<int> alignCenter() {
    return [0x1b, 0x61, 0x01];
  }

  //居左对齐
  @override
  List<int> alignLeft() {
    return [0x1b, 0x61, 0x00];
  }

  //居右对齐
  @override
  List<int> alignRight() {
    return [0x1b, 0x61, 0x02];
  }
}

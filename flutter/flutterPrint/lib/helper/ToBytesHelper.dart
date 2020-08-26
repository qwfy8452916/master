import 'package:fast_gbk/fast_gbk.dart';

import '../adapter/PrintDataAdapter.dart';
import '../adapter/printAdapterImpl/DataForSendToXinYe80Printer.dart';
import '../adapter/printAdapterImpl/DataForSendToXinYe58Printer.dart';

class ToBytesHelper {
  static PrintDataAdapter _adapter;

  //以@.开头的为行指令。
  static String cmdStr = "@.";

  //|.@以后为参数，可以为空，如需复杂格式可用json
  static String cmdEnd = "|.@";

  /// *
  /// 模板和数据内容匹配
  /// @param tempContent    模板内容
  /// @param jsonContent    参数内容
  /// @param printerType    打印机类型
  /// @return
  /// @throws JsonProcessingException
  /// @throws IOException
  static List<int> getBytes(List<String> cmds, int paperSize) {
    if (paperSize == 80) {
      _adapter = new DataForSendToXinYe80Printer();
    }else{
      _adapter = new DataForSendToXinYe58Printer();
    }

    List<int> bList = new List<int>();

    for (int i = 0; i < cmds.length; i++) {
      if (cmds[i].startsWith(cmdStr)) {
        String cmd = cmds[i].substring(cmdStr.length);

        if ("^N" == cmd) {
          bList.addAll(_adapter.lineFeed());
        } else if ("^L" == cmd) {
          bList.addAll(_adapter.alignLeft());
        } else if ("^C" == cmd) {
          bList.addAll(_adapter.alignCenter());
        } else if ("^R" == cmd) {
          bList.addAll(_adapter.alignRight());
        } else if ("^BEEP" == cmd) {
          bList.addAll(_adapter.beep());
        } else if ("\$H1W1" == cmd) {
          bList.addAll(_adapter.miniFont());
        } else if ("\$H2W2" == cmd) {
          bList.addAll(_adapter.bigFont());
        } else if ("\$H1W2" == cmd) {
          //加粗
          bList.addAll(_adapter.widFont());
        } else if ("\$H0W0" == cmd) {
          //取消加粗
          bList.addAll(_adapter.cancelCrudeFont());
        } else if ("\$H2W1" == cmd) {
          //纵向变大
          bList.addAll(_adapter.highFont());
        } else if ("^INITE" == cmd) {
          bList.addAll(_adapter.initialize());
        } else if ("^FONT" == cmd) {
          // 选择字符大小
          bList.addAll(_adapter.defFont());
        } else if ("^ROW" == cmd) {
          // 默认行间距
          bList.addAll(_adapter.defRowSpace());
        } else if ("^D" == cmd) {
          // 对齐方式
          bList.addAll(_adapter.defAlign());
        } else if ("^CUT" == cmd) {
          // 选择切纸模式并切纸
          bList.addAll(_adapter.cut());
        }
      } else {
        bList.addAll(gbk.encode(cmds[i]));
      }
    }

    return bList;
  }
}

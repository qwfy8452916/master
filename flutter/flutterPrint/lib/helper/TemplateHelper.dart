//import 'dart:convert';
import 'package:fast_gbk/fast_gbk.dart';

/*
 * 新版模板处理
 */
class TemplateHelper {
  // 补空
  static String blank =
      "                                                                                                                              ";

  //以@.开头的为行指令。
  static String cmdStr = "@.";

  //|.@以后为参数，可以为空，如需复杂格式可用json
  static String cmdEnd = "|.@";

  static List<String> getCmd(String tempContent, Map<String, Object> info) {
    List<String> cmds =createCmds(tempContent.replaceAll("\r\n", "\n").split("\n"), info);
    return cmds;
  }

  /// @param tmps
  /// @param info
  /// @return
  /// @throws UnsupportedEncodingException
  static List<String> createCmds(List<String> tmps, Map<String, Object> info) {
    // 模板+数据-》命令整理
    List<String> cmds = new List<String>();

    for (int i = 0; i < tmps.length; i++) {
      String t = tmps[i].replaceAll("\t", "");
      if (t.startsWith("CN")) {
        continue;
      }

      // ^A区块处理
      if (t.startsWith("^A")) {
        List<String> aTmpLstList = new List<String>();
        int bIdx = t.indexOf("{");
        int eIdx = t.indexOf(":{");
        String dataKey = t.substring(bIdx + 1, eIdx);

        List<Map<String, Object>> dataInfoMapList = info[dataKey];
        String key = t.substring(2, bIdx);

        i++;
        while (i < tmps.length) {
          if (tmps[i].contains("A" + key + "^")) {
            break;
          } else {
            aTmpLstList.add(tmps[i]);
          }
          i++;
        }
        List<String> dataTmp = aTmpLstList;
        for (int j = 0; j < dataInfoMapList.length; j++) {
          cmds.addAll(createCmds(dataTmp, dataInfoMapList[j]));
        }
      } else {
        // 行处理
        cmds.addAll(createLineCmds(t, info));
      }
    }
    return cmds;
  }

  static String rTrim(String s) {
    int i = 0;
    for (i = s.length - 1; i >= 0; i--) {
      String ch = s[i];
      if (ch != ' ') break;
    }
    return s.substring(0, i + 1);
  }

  /// 行处理用
  ///
  /// @return
  /// @throws UnsupportedEncodingException
  static List<String> createLineCmds(String tmp, Map<String, Object> info) {
    List<String> cmds = new List<String>();
    // 行显示指令
    int ifIdx = tmp.indexOf("^IF{");
    if (ifIdx >= 0) {
      int endIfIdx = tmp.indexOf("}", ifIdx);
      String key = tmp.substring(ifIdx + 4, endIfIdx);

      if (null == info[key] || "" == info[key]) {
        return cmds;
      }
    }
    // 行指令处理;
    List<String> lineCmds = [
      "^BLOCK",
      "^FONT",
      "^ROW",
      "^RE",
      "^D",
      "^INITE",
      "^CUT",
      "^L",
      "^C",
      "^R",
      "^N",
      "\$H1W1",
      "\$H2W2",
      "^BEEP",
      "\$H1W2",
      "\$H0W0",
      "\$H2W1",
      "^BIT"
    ];
    for (int i = 0; i < lineCmds.length; i++) {
      if (tmp.contains(lineCmds[i])) {
        cmds.add(cmdStr + lineCmds[i]);
        tmp = tmp.replaceAll(lineCmds[i], "");
      }
    }
    // 如果本行仅是行指令，则不走纸，直接返回
    if (tmp.length <= 0) {
      return cmds;
    }

    // 二维码
    String qr = "QR";
    // 北洋的二维码
    String bqr = "MQR";
    // 条码
    String bar = "BAR128";
    // 钱箱
    String ope = "EL";

    // 换行用
    List<String> appendLine = new List<String>();
    // 当前位置
    int idx = 0;
    // 单值变量处理
    while (true) {
      int bIdx = tmp.indexOf("^");
      if (bIdx == 0) {
        int eIdx = tmp.indexOf("{", bIdx);
        int dataEndIdx = tmp.indexOf("}", eIdx);
        String key = tmp.substring(bIdx + 1, eIdx);
        String dataKey = tmp.substring(eIdx + 1, dataEndIdx);

        String val = info[dataKey];

        if (qr == key) {
          // 二维码
          cmds.add(cmdStr + qr + cmdEnd + val);
        } else if (bar == key) {
          // 条码
          cmds.add(cmdStr + bar + cmdEnd + val);
        } else if (bqr == key) {
          // 北洋的二维码
          cmds.add(cmdStr + bqr + cmdEnd + val);
        } else if (ope == key) {
          // 钱箱
          cmds.add(cmdStr + "EL" + cmdEnd);
        } else if (key.startsWith("S")) {
          // 单值变量处理
          if (key.length == 4) {
            int maxLen = int.parse(key.substring(2));
            if (maxLen > 0) {
              int row = 0;
              while (true) {
                if (row == 0) {
                  if (maxLen * 2 >= gbk.encode(val).length) {
                    val = paddingAlign(key, val, maxLen);
                    cmds.add(val);
                    break;
                  } else {
                    String v = substr(val, maxLen * 2);
                    val = val.substring(v.length);
                    cmds.add(v);
                    row++;
                  }
                } else {
                  // 换行
                  String rowStr = blank;
                  int i = row - 1;
                  if (appendLine.length > i) {
                    rowStr = appendLine[i];
                  } else {
                    appendLine.add(rowStr);
                  }
                  String v = "";
                  if (maxLen * 2 < gbk.encode(val).length) {
                    v = substr(val, maxLen * 2);
                    val = val.substring(v.length);
                    appendLine.insert(
                        i,
                        rowStr.substring(0, idx) +
                            v +
                            rowStr.substring(idx + v.length));
                    row++;
                  } else {
                    v = paddingAlign(key, val, maxLen);
                    appendLine.insert(
                        i,
                        rowStr.substring(0, idx) +v +rowStr.substring(idx + v.length));
                    break;
                  }
                }
              }
              idx += maxLen * 2;
            } else {
              cmds.add(val);
              idx += gbk.encode(val).length;
            }
          }
        }
        tmp = tmp.substring(dataEndIdx + 1);
      } else if (bIdx > 0) {
        String val = tmp.substring(0, bIdx);
        cmds.add(val);
        tmp = tmp.substring(bIdx);
        idx += gbk.encode(val).length;
      } else {
        cmds.add(tmp);
        break;
      }
    }
    for (int i = 0; i < appendLine.length; i++) {
      cmds.add(cmdStr + "^N"); // 改行
      cmds.add(rTrim(appendLine[i]));
    }
    cmds.add(cmdStr + "^N"); // 改行
    return cmds;
  }

  /// 补空
  ///
  /// @param key    SL08
  /// @param val
  /// @param maxLen 08
  /// @return
  /// @throws UnsupportedEncodingException
  static String paddingAlign(String key, String val, int maxLen) {
// 补空
    String b = blank.substring(0, maxLen * 2 - gbk.encode(val).length);
    if (key[1] == 'L') {
      val = val + b;
    } else if (key[1] == 'R') {
      val = b + val;
    } else if (key[1] == 'C') {
      int len = (b.length / 2) as int;
      val = b.substring(0, len) + val + b.substring(0, len);
      if (b.length < len * 2) val += " ";
    }
    return val;
  }

  /// 按字节截取字符串
  ///
  /// @param s
  /// @param byteLen
  /// @return
  /// @throws UnsupportedEncodingException
  static String substr(String s, int byteLen) {
    if (s == null || s.isEmpty || byteLen <= 0) {
      return "";
    }
    for (int i = 0; i < s.length + 1; ++i) {
      String str = s.substring(0, i);

      if (gbk.encode(str).length > byteLen) {
        if (i < 1) return "";
        return str.substring(0, i - 1);
      }
    }
    return s;
  }
}

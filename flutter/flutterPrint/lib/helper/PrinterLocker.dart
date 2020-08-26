import 'package:synchronized/synchronized.dart';

class PrinterLocker {
  static Map<int, Lock> _printerLocks = Map();

  static Future<bool> doInLock(int printerId, Function printAction) async {
    Lock printerLock = _printerLocks.putIfAbsent(printerId, () => Lock());
    await printerLock.synchronized(printAction);
    return true;
  }
}

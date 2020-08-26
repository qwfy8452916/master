import 'package:flutter/material.dart';

class ColorUtil {
  static Color hexColor(String hexString) {
    if (int.tryParse(hexString.substring(1, 7), radix: 16) == null) {
      hexString = '#999999';
    }
    return new Color(
        int.parse(hexString.substring(1, 7), radix: 16) + 0xFF000000);
  }
}

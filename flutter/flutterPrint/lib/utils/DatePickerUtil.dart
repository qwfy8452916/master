import 'package:flutter/material.dart';
import 'package:longan_counter/utils/ColorUtil.dart';
import 'package:flutter_cupertino_date_picker/flutter_cupertino_date_picker.dart';

class DatePickerUtil {
  static const String MIN_DATE = '2010-01-01 00:00:00';
  static const String MAX_DATE = '2099-12-31 23:59:59';


  ///日期插件
  static void showDatePicker(BuildContext context,{Function onConfirm,Function onChange}) {
    DatePicker.showDatePicker(
      context,
      onMonthChangeStartWithFirstDate: true,
      pickerTheme: DateTimePickerTheme(
        showTitle: true,
        confirm: Text('确定', style: TextStyle(color: ColorUtil.hexColor("#5C68C6"))),
        cancel: Text('取消', style: TextStyle(color: Colors.black)),
      ),
      minDateTime: DateTime.parse(MIN_DATE),
      maxDateTime: DateTime.parse(MAX_DATE),
      initialDateTime: DateTime.now(),
      dateFormat: "yyyy-MMMM-dd",
      locale: DateTimePickerLocale.zh_cn,
//      onClose: () => print("----- onClose -----"),
//      onCancel: () => print('onCancel'),
      onConfirm: (dateTime, List<int> index) {
        if(null  !=onConfirm ){
          onConfirm(dateTime);
        }
      },
      onChange: (dateTime, List<int> index) {
        if(null  !=onChange ) {
          onChange(dateTime);
        }
      },
    );
  }

  ///时间插件
  static void showTimePicker(BuildContext context,String title,{Function onConfirm,Function onChange}) {
    DatePicker.showDatePicker(
      context,
      minDateTime: DateTime.parse(MIN_DATE),
      maxDateTime: DateTime.parse(MAX_DATE),
      initialDateTime: DateTime.now(),
      dateFormat: "HH:mm",
      pickerMode: DateTimePickerMode.time, // show TimePicker
      pickerTheme: DateTimePickerTheme(
        title: Container(
          decoration: BoxDecoration(color: ColorUtil.hexColor("#5C68C6")),
          width: double.infinity,
          height: 56.0,
          alignment: Alignment.center,
          child: Text(
            title,
            style: TextStyle(color: Colors.white, fontSize: 15.0),
          ),
        ),
        titleHeight: 56.0,
      ),
      onChange: (dateTime, List<int> index) {
        if(null != onChange){
          onChange(dateTime);
        }
      },
      onConfirm: (dateTime, List<int> index) {
        if(null != onConfirm ){
          onConfirm(dateTime);
        }
      },
    );
  }


}

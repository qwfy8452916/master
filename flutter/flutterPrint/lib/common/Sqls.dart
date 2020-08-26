///数据表定义

class Sqls {
  static final String dropTableSql = '''
     drop table if exists print_printer;
     drop table if exists print_printer_func;
     drop table if exists print_printer_category;
     drop table if exists print_printer_func_product;
     drop table if exists order_delivery;
     drop table if exists order_delivery_detail;
  ''';

  //打印机表
  static final String createTableSql_Change_log = '''
  CREATE TABLE  IF NOT EXISTS `change_log` (
      `name` varchar(100) NOT NULL DEFAULT '' 
      );
    ''';

  //打印机表
  static final String createTableSql_Template = '''
  CREATE TABLE  IF NOT EXISTS `template` (
      `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      `name` varchar(20) NOT NULL DEFAULT '' ,
      `paper_size` int(11) NOT NULL DEFAULT '80',
      `tmp_content` text NOT NULL
      );
    ''';

  //打印机表
  static final String createTableSql_Printer = '''
  CREATE TABLE  IF NOT EXISTS `printer` (
      `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      `hotel_id` int(11) NOT NULL DEFAULT '0',
      `name` varchar(20) NOT NULL DEFAULT '' ,
      `connect_way` tinyint(4) NOT NULL DEFAULT '0' ,
      `ip` varchar(20) NOT NULL DEFAULT '' ,
      `port` int(11) NOT NULL DEFAULT '0' ,
      `paper_size` int(11) NOT NULL DEFAULT '80',
      `template_id` int(11) NOT NULL DEFAULT 0,
      `is_work` tinyint(4) NOT NULL DEFAULT '1' ,
      `is_set_work_time` tinyint(4) NOT NULL DEFAULT '0' ,
      `work_start_time` varchar(20) NOT NULL DEFAULT '00:00:00',
      `work_end_time` varchar(20) NOT NULL DEFAULT '00:00:00' ,
      `is_printed_by_prod` tinyint(4) NOT NULL DEFAULT '0',
      `is_print_all` tinyint(4) NOT NULL DEFAULT '0',
      `is_extend_print` tinyint(4) NOT NULL DEFAULT '0',
      `extend_time` int(11) NOT NULL DEFAULT '0',
      `deliv_way_flag` tinyint(4) NOT NULL DEFAULT '0' ,
      `area_flag` tinyint(4) NOT NULL DEFAULT '0' ,
      `func_flag` tinyint(4) NOT NULL DEFAULT '0' ,
      `created_by` varchar(30)  NOT NULL DEFAULT '' ,
      `created_at` INTEGER NOT NULL DEFAULT 0,
      `last_updated_by` varchar(30) NOT NULL DEFAULT '',
      `last_updated_at` INTEGER NOT NULL DEFAULT 0
      );
    ''';

  //打印机表
  static final String init_Printer = '''
  INSERT INTO`printer` (
      `hotel_id` ,
      `name` ,
      `connect_way` ,
      `ip`,
      `port`,
      `paper_size` ,
      `template_id`,
      `is_work`,
      `func_flag`
      ) values (
      20,
      "Xprinter测试打印机",
      1,
      "192.168.1.244",
      9100,
      80,
      2,
      1,
      0
      );
    ''';

  //	打印机与功能区的关系表
  static final String createTableSql_Printer_func = '''
  CREATE TABLE  IF NOT EXISTS `printer_func` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    `hotel_id` int(11) NOT NULL DEFAULT '0',
    `printer_id` int(11) NOT NULL DEFAULT '0',
    `func_id` varchar(20) NOT NULL DEFAULT '' ,
    `func_name` varchar(30) NOT NULL DEFAULT '' ,
    `category_flag` tinyint(4) NOT NULL DEFAULT '0' ,
    `func_prod_flag` tinyint(4) NOT NULL DEFAULT '0' 
    );

    ''';

  //	打印机与市场分类的关系表
  static final String createTableSql_Printer_category = '''
  CREATE TABLE  IF NOT EXISTS `printer_category` (
      `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      `hotel_id` int(11) NOT NULL DEFAULT '0',
      `printer_func_id` int(11) NOT NULL DEFAULT '0',
      `printer_id` int(11) NOT NULL DEFAULT '0',
      `category_id` int(11) NOT NULL DEFAULT '0',
      `category_name` varchar(30) NOT NULL DEFAULT '' 
      );
    ''';

  //	打印机与功能区商品的关系表
  static final String createTableSql_Printer_func_product = '''
   CREATE TABLE  IF NOT EXISTS `printer_func_product` (
      `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      `hotel_id` int(11) NOT NULL DEFAULT '0',
      `printer_func_id` int(11) NOT NULL DEFAULT '0',
      `printer_id` int(11) NOT NULL DEFAULT '0',
      `func_prod_id` int(11) NOT NULL DEFAULT '0',
      `prod_show_name` varchar(50) NOT NULL DEFAULT '' 
      );
    ''';

  //配送单表
  static final String createTableSql_delivery = '''
   CREATE TABLE  IF NOT EXISTS `delivery` (
      `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      `service_delivery_id` int(11) NOT NULL DEFAULT '0',
      `deliv_code` varchar(50) NOT NULL DEFAULT '' ,
      `room_floor` varchar(50) NOT NULL DEFAULT '' ,
      `room_code` varchar(50) NOT NULL DEFAULT '' ,
      `func_id` int(11) NOT NULL DEFAULT '0',
      `func_name` varchar(50) NOT NULL DEFAULT '' ,
      `deliv_way` tinyint(4) NOT NULL DEFAULT '0' ,
      `prod_count` double(11,2) NOT NULL DEFAULT '0' ,
      `total_amount` decimal(18,2) NOT NULL DEFAULT '0' ,
      `is_cancel` tinyint(4) NOT NULL DEFAULT '0' ,
      `order_time` INTEGER NOT NULL DEFAULT 0,
      `print_state` tinyint(4) NOT NULL DEFAULT 0 ,
      `created_by` varchar(30)  NOT NULL DEFAULT '' ,
      `created_at` INTEGER NOT NULL DEFAULT 0,
      `last_updated_by` varchar(30) NOT NULL DEFAULT '',
      `last_updated_at` INTEGER NOT NULL DEFAULT 0
      );
    ''';

  //配送单详情表
  static final String createTableSql_delivery_detail = '''
   CREATE TABLE  IF NOT EXISTS `delivery_detail` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    `delivery_id` int(11) NOT NULL DEFAULT '0',
    `service_delivery_id` int(11) NOT NULL DEFAULT '0',
    `service_delivery_detail_id` int(11) NOT NULL DEFAULT '0',
    `category_id` int(11) NOT NULL DEFAULT '0',
    `func_prod_id` int(11) NOT NULL DEFAULT '0',
    `prod_show_name` varchar(50) NOT NULL DEFAULT '' ,
    `prod_spec_name` varchar(50) NOT NULL DEFAULT '' ,
    `prod_logo_url` text NOT NULL DEFAULT '' ,
    `prod_count` double(11,2) NOT NULL DEFAULT 0.00 ,
    `prod_price` decimal(18,2) NOT NULL DEFAULT 0.00 ,
    `print_state` tinyint(4) NOT NULL DEFAULT 0 ,
    `print_time` INTEGER NOT NULL DEFAULT 0
    );
    ''';


  //初始化模板数据
  static final String init_Template_data = '''
  INSERT INTO  `template` (`id`,`name`,`paper_size`,`tmp_content`) values (1,"58厨房飞单",58,"CN
^INITE
^FONT
^ROW
^D
\$H2W2^C点菜单^N
^L流水号：^SL00{delivCode}^N
\$H1W1桌  号：^SL00{area}^N
\$H1W1-------------------------------
^A1{datalist:{
\$H2W2^SL05{prodShowName}^SR02{prodCount}^N
\$H1W1^IF{prodSpecName}  ^SL00{prodSpecName}^N
}}A1^
\$H1W1-------------------------------
数      量： ^SL00{prodCount}^N
下单时间： ^SL00{orderTime}^N
^N
^N
^N
^N
^CUT
^BEEP
^INITE
^BLOCK"),
 (2,"80厨房飞单","80","CN
^INITE
^FONT
^ROW
^D
\$H2W2^C点菜单^N
^L流水号：^SL00{delivCode}^N
\$H1W1桌  号：^SL00{area}^N
\$H1W1----------------------------------------------		 
^A1{datalist:{
\$H2W2^SL09{prodShowName}^SR02{prodCount}^N
\$H1W1^IF{prodSpecName}  ^SL00{prodSpecName}^N
}}A1^
\$H1W1----------------------------------------------
数    量： ^SL00{prodCount}^N
下单时间： ^SL00{orderTime}^N
\$H1W1 ^N
^N
^N
^N
^CUT
^BEEP
^INITE
^BLOCK");
    ''';


  static Map<String,String> getAllSqls() {
    Map<String,String>  allSqls =  new Map();
    allSqls["createTableSql_Template"]=createTableSql_Template;
    allSqls["createTableSql_Printer"]=createTableSql_Printer;
    allSqls["createTableSql_Printer_func"]=createTableSql_Printer_func;
    allSqls["createTableSql_Printer_category"]=createTableSql_Printer_category;
    allSqls["createTableSql_Printer_func_product"]=createTableSql_Printer_func_product;
    allSqls["createTableSql_delivery"]=createTableSql_delivery;
    allSqls["createTableSql_delivery_detail"]=createTableSql_delivery_detail;
    allSqls["init_Template_data"]=init_Template_data;
//    allSqls["init_Printer"]=init_Printer;
    return allSqls;
  }
}

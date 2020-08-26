CREATE TABLE  IF NOT EXISTS `printer` (
      `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      `hotel_id` int(11) NOT NULL DEFAULT '0',
      `name` varchar(20) NOT NULL DEFAULT '' ,
      `connect_way` tinyint(4) NOT NULL DEFAULT '0' ,
      `ip` varchar(20) NOT NULL DEFAULT '' ,
      `port` int(11) NOT NULL DEFAULT '0' ,
      `paper_size` int(11) NOT NULL DEFAULT '80',
      `template` text NOT NULL,
      `is_work` tinyint(4) NOT NULL DEFAULT '1' ,
      `is_set_work_time` tinyint(4) NOT NULL DEFAULT '0' ,
      `work_start_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00',
      `work_end_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' ,
      `is_printed_by_prod` tinyint(4) NOT NULL DEFAULT '4',
      `func_flag` tinyint(4) NOT NULL DEFAULT '0' ,
      `created_by` varchar(30)  NOT NULL DEFAULT '' ,
      `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
      `last_updated_by` varchar(30) NOT NULL DEFAULT '',
      `last_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
      );


CREATE TABLE  IF NOT EXISTS `printer_func` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    `hotel_id` int(11) NOT NULL DEFAULT '0',
    `printer_id` int(11) NOT NULL DEFAULT '0',
    `func_id` varchar(20) NOT NULL DEFAULT '' ,
    `func_name` varchar(30) NOT NULL DEFAULT '' ,
    `category_flag` tinyint(4) NOT NULL DEFAULT '0' ,
    `func_prod_flag` tinyint(4) NOT NULL DEFAULT '0' ,
    `created_by` varchar(30)  NOT NULL DEFAULT '' ,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    `last_updated_by` varchar(30) NOT NULL DEFAULT '',
    `last_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    );



CREATE TABLE  IF NOT EXISTS `printer_category` (
      `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      `hotel_id` int(11) NOT NULL DEFAULT '0',
      `printer_func_id` int(11) NOT NULL DEFAULT '0',
      `printer_id` int(11) NOT NULL DEFAULT '0',
      `category_id` int(11) NOT NULL DEFAULT '0',
      `category_name` varchar(30) NOT NULL DEFAULT '' ,
      `created_by` varchar(30)  NOT NULL DEFAULT '' ,
      `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
      `last_updated_by` varchar(30) NOT NULL DEFAULT '',
      `last_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

CREATE TABLE  IF NOT EXISTS `printer_func_product` (
      `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      `hotel_id` int(11) NOT NULL DEFAULT '0',
      `printer_func_id` int(11) NOT NULL DEFAULT '0',
      `printer_id` int(11) NOT NULL DEFAULT '0',
      `func_prod_id` int(11) NOT NULL DEFAULT '0',
      `prod_show_name` varchar(50) NOT NULL DEFAULT '' ,
      `created_by` varchar(30)  NOT NULL DEFAULT '' ,
      `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
      `last_updated_by` varchar(30) NOT NULL DEFAULT '',
      `last_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

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
      `created_by` varchar(30)  NOT NULL DEFAULT '' ,
      `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
      `last_updated_by` varchar(30) NOT NULL DEFAULT '',
      `last_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
      );



CREATE TABLE  IF NOT EXISTS `delivery_detail` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    `delivery_id` int(11) NOT NULL DEFAULT '0',
    `service_delivery_id` int(11) NOT NULL DEFAULT '0',
    `service_delivery_detail_id` int(11) NOT NULL DEFAULT '0',
    `category_id` int(11) NOT NULL DEFAULT '0',
    `func_prod_id` int(11) NOT NULL DEFAULT '0',
    `prod_show_name` varchar(50) NOT NULL DEFAULT '' ,
    `prod_spec_name` varchar(50) NOT NULL DEFAULT '' ,
    `prod_logo_url` varchar(255) NOT NULL DEFAULT '' ,
    `prod_count` double(11,2) NOT NULL DEFAULT '0' ,
    `prod_price	` decimal(18,2) NOT NULL DEFAULT '0' ,
    `print_state` tinyint(4) NOT NULL DEFAULT '0' ,
    `send_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' ,
    `print_time	` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' ,
    `created_by` varchar(30)  NOT NULL DEFAULT '' ,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    `last_updated_by` varchar(30) NOT NULL DEFAULT '',
    `last_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

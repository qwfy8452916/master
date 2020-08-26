import 'dart:collection';

class Queues{

  //配送单队列(队列内容规则  DeliveryId : detailId(没有指定就是0) : isAgain (是否重新打单 0=不是  1=是 )   )
  static Queue<String> deliveryQueue = new Queue();

}

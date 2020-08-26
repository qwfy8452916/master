class PageDTO {
  ///第几页
  int _pageNo = 1;

  ///每页显示多少行
  int _pageSize = 10;

  int get pageNo => (_pageNo == null || _pageNo == 0) ? 1 : _pageNo;

  int get pageSize => (_pageSize == null || _pageSize == 0) ? 10 : _pageSize;

  set pageSize(int value) {
    _pageSize = value;
  }

  set pageNo(int value) {
    _pageNo = value;
  }

  int get startIndex => (pageNo - 1) * pageSize;

}

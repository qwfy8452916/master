class  User{

  int  _id;

  String  _username;

  String _password;

  String _token;

  int _hotelId;

  int get id => _id;

  set id(int value) {
    _id = value;
  }

  String get username => _username;

  int get hotelId => _hotelId;

  set hotelId(int value) {
    _hotelId = value;
  }

  String get token => _token;

  set token(String value) {
    _token = value;
  }

  String get password => _password;

  set password(String value) {
    _password = value;
  }

  set username(String value) {
    _username = value;
  }


}

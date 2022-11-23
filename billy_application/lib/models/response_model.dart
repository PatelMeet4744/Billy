class ResponseModel {
  final bool _status;
  final String _message;

  ResponseModel(this._status, this._message);
  String get message => _message;
  bool get status => _status;
}

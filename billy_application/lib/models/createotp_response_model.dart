import 'dart:convert';

CreateOTPResponseModel createOTPResponseJson(String str) =>
    CreateOTPResponseModel.fromJson(json.decode(str));

class CreateOTPResponseModel {
  CreateOTPResponseModel({
    required this.message,
    required this.data,
  });
  late final String message;
  late final String? data;

  CreateOTPResponseModel.fromJson(Map<String, dynamic> json) {
    message = json['message'];
    data = json['data'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['message'] = message;
    _data['data'] = data;
    return _data;
  }
}

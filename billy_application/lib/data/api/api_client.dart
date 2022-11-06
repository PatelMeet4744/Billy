import 'package:get/get.dart';

class ApiClient extends GetConnect implements GetxService {
  late String token;
  late final String appBaseUrl;
  late Map<String, String> mainHeaders;

  ApiClient({required this.appBaseUrl}) {
    baseUrl = appBaseUrl;
    timeout = const Duration(seconds: 30);
    token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InJlc3RhdXJhbnROYW1lIjoiRG9taW5vcyIsIm93bmVyTmFtZSI6Ik5hbWUiLCJvd25lclBhc3N3b3JkIjoiJDJhJDEwJEpEaVRjVTFhSmZEeHNwUUtCcGRSRk9pMGk0ZmExQVpJa0FmN0EwbjF1QXNEMGNzdnF3SWFtIiwicmVzdGF1cmFudElkIjoiNjJkZTQyYzY3NjVlYWQ2N2QzM2MzZmMwIn0sImlhdCI6MTY2NzcxMzM3MywiZXhwIjoxNjY3Nzk5NzczfQ.HL2FaILMHojUupyEtfXaw7EelRx0R_Exzs13G7ChjFw";
    mainHeaders = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer $token',
    };
  }

  Future<Response> getData(String uri) async {
    try {
      Response response = await get(uri, headers: mainHeaders);
      return response;
    } catch (e) {
      return Response(statusCode: 1, statusText: e.toString());
    }
  }

  Future<Response> getDataWithoutToken(String uri) async {
    try {
      Response response = await get(uri);
      return response;
    } catch (e) {
      return Response(statusCode: 1, statusText: e.toString());
    }
  }
}

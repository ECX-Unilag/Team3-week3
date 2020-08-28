import 'package:http/http.dart' as http;
import 'dart:convert';

class Api {
  String baseUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  searchRecipe(String query) async {
    String searchUrl = "$baseUrl$query";
    http.Response searchResponse = await http.get(searchUrl);
    var jsonData;
    if (searchResponse.statusCode == 200) {
      jsonData = jsonDecode(searchResponse.body);
    } else {
      jsonData = {"status": "fail"};
    }
    return jsonData;
  }
}

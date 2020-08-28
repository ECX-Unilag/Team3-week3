import 'package:ecx_recipe_app/models/recipe_model.dart';
import 'package:ecx_recipe_app/network/api.dart';

class SearchController {
  Api api = Api();
  handleSearch(String query) async {
    dynamic searchResults = await api.searchRecipe(query);
    List<Recipe> recipes = [];
    for (dynamic mealData in searchResults["meals"]) {
      Recipe newRecipe = Recipe.fromJson(mealData);
      recipes.add(newRecipe);
    }
    return recipes;
  }
}

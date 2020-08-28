class Recipe {
  String name;
  String category;
  String area;
  String instructions;
  String imageUrl;
  String youtubeVideoUrl;
  Map<String, String> ingredients;
  Recipe({
    this.name,
    this.category,
    this.area,
    this.imageUrl,
    this.ingredients,
    this.instructions,
    this.youtubeVideoUrl,
  });

  Recipe.fromJson(Map<String, dynamic> json) {
    Map<String, String> jsonIngredients = {};
    for (int i = 0; i <= 0; i++) {
      if (json["strIngredient$i"] != "" && json["strIngredient$i"] != null) {
        String ingredient = json["strIngredient$i"];
        String measure = json["strMeasure$i"];
        jsonIngredients.putIfAbsent(ingredient, () => measure);
      }
    }
    name = json["strMeal"];
    category = json["strCategory"];
    area = json["strArea"];
    instructions = json["strInstructions"];
    imageUrl = json["strMealThumb"];
    youtubeVideoUrl = json["strYoutube"];
    ingredients = jsonIngredients;
  }
}

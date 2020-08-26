AOS.init();
const searchBtn = document.getElementById("search-btn");
const backBtn = document.getElementById("back-btn");
const searchedItem = document.getElementById("meal-input");
const searchResultHTML = document.getElementById("output");
const mealSearched = document.getElementById("meal-searched");

searchBtn.addEventListener("click", () => {
  let item = searchedItem.value.toLocaleLowerCase();
  if (item) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
      .then((res) => res.json())
      //   .then((res) => console.log(res.meals));
      .then((res) => listSearchResult(res.meals, item))
      .catch((error) =>
        alert("Opps! Failed to fetch resources. Check your internet connection")
      );
  } else {
    console.log("enter valid input");
  }
});

const listSearchResult = (searchArray, item) => {
  mealSearched.newInnerHTML = `<div class='col-md-6 text-center mx-auto'><h6>Showing Results for <span class="font-weight-bold text-primary">${item}</span></h6></div>`;
  searchResultHTML.innerHTML = `${
    searchArray
      ? `${searchArray
          .map(
            (
              meal
            ) => `<div class="col-md-3 pointer meal" id=${meal.strMeal
              .split(" ")
              .join("-")}>
    <img src="${meal.strMealThumb}" class="img-fluid mb-2" alt="${
              meal.strMeal
            } Image">
    <p class="text-center text-orange">${meal.strMeal}</p></div>`
          )
          .join("")}`
      : "<p>No Result found</p>"
  }`;
};

output.addEventListener("click", (event) => {
  let mealId;
  if (event.target.classList.contains("meal")) {
    mealId = event.target.id.split("-").join(" ");
  } else if (event.target.parentElement.classList.contains("meal")) {
    mealId = event.target.parentElement.id.split("-").join(" ");
  }
  if (mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`)
      .then((res) => res.json())
      .then((res) =>
        res.meals ? createMeal(res.meals[0]) : console.log("NO Result found")
      )
      .catch((error) =>
        alert("Opps! Failed to fetch resources. Check your internet connection")
      );
  }
});

const createMeal = (meal) => {
  const mealresult = `<h4 class="text-center mx-auto">Showing Results for ${meal.strMeal}</h4>`;
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  const newInnerHTML = `
			<div class="col-md-5" data-aos="fade-in"
      data-aos-duration="1200"
      data-aos-easing="linear">
				<img src="${meal.strMealThumb}" alt="Meal Image" class="img-fluid">
				${
          meal.strCategory
            ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
            : ""
        }
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ""}
				${
          meal.strTags
            ? `<p><strong>Tags:</strong> ${meal.strTags
                .split(",")
                .join(", ")}</p>`
            : ""
        }
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
				</ul>
			</div>
			<div class="col-md-6" data-aos="fade-in"
      data-aos-duration="1200"
      data-aos-easing="linear">
				<h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>
        ${
          meal.strYoutube
            ? `
          <h5>Video Recipe</h5>
          <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${meal.strYoutube.slice(
              -11
            )}" allowfullscreen></iframe>
          </div>`
            : ""
        }
        `;
  mealSearched.innerHTML = mealresult;
  searchResultHTML.innerHTML = newInnerHTML;
};

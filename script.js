
const recipes = [
  {
    id: 1,
    name: "Masala Dosa",
    category: "Breakfast",
    time: "30 minutes",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80",
    ingredients: [
      "Dosa batter",
      "Potatoes",
      "Onion",
      "Mustard seeds",
      "Oil and spices"
    ],
    steps: [
      "Cook potatoes with onion and spices.",
      "Spread dosa batter on a hot pan.",
      "Add the potato filling.",
      "Fold the dosa and serve hot."
    ]
  },
  {
    id: 2,
    name: "Veg Biryani",
    category: "Lunch",
    time: "40 minutes",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80",
    ingredients: [
      "Basmati rice",
      "Mixed vegetables",
      "Onion",
      "Biryani spices",
      "Oil and salt"
    ],
    steps: [
      "Wash and soak the rice.",
      "Cook vegetables with onions and spices.",
      "Add rice and the required water.",
      "Cover and cook until the rice is tender."
    ]
  },
  {
    id: 3,
    name: "Margherita Pizza",
    category: "Dinner",
    time: "35 minutes",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80",
    ingredients: [
      "Pizza base",
      "Tomato sauce",
      "Mozzarella cheese",
      "Tomatoes",
      "Basil"
    ],
    steps: [
      "Spread tomato sauce on the pizza base.",
      "Add cheese and tomato slices.",
      "Bake until the base is crisp and cheese melts.",
      "Add basil and serve."
    ]
  },
  {
    id: 4,
    name: "Chocolate Cake",
    category: "Dessert",
    time: "45 minutes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80",
    ingredients: [
      "Flour",
      "Cocoa powder",
      "Sugar",
      "Milk",
      "Baking powder"
    ],
    steps: [
      "Mix the dry ingredients.",
      "Add milk and mix into a smooth batter.",
      "Pour into a prepared cake tin.",
      "Bake until a toothpick comes out clean."
    ]
  },
  {
    id: 5,
    name: "Veg Sandwich",
    category: "Breakfast",
    time: "15 minutes",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80",
    ingredients: [
      "Bread slices",
      "Cucumber",
      "Tomato",
      "Butter",
      "Salt and pepper"
    ],
    steps: [
      "Spread butter on the bread.",
      "Add sliced vegetables.",
      "Season with salt and pepper.",
      "Close the sandwich and serve."
    ]
  },
  {
    id: 6,
    name: "Paneer Curry",
    category: "Dinner",
    time: "30 minutes",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80",
    ingredients: [
      "Paneer",
      "Tomatoes",
      "Onion",
      "Ginger and garlic",
      "Indian spices"
    ],
    steps: [
      "Cook onions, ginger and garlic.",
      "Add tomatoes and spices.",
      "Cook the gravy until smooth.",
      "Add paneer and simmer until ready."
    ]
  }
];

const recipeList = document.getElementById("recipe-list");
const searchInput = document.getElementById("search");
const categoryButtons = document.querySelectorAll(
  ".categories button"
);
const modal = document.getElementById("recipe-modal");
const recipeDetails = document.getElementById("recipe-details");
const closeModal = document.getElementById("close-modal");

let selectedCategory = "All";

function renderRecipes() {
  const query = searchInput.value.trim().toLowerCase();

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(query) ||
      recipe.category.toLowerCase().includes(query) ||
      recipe.ingredients.some(item =>
        item.toLowerCase().includes(query)
      );

    const matchesCategory =
      selectedCategory === "All" ||
      recipe.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  recipeList.innerHTML = "";

  if (filteredRecipes.length === 0) {
    recipeList.innerHTML =
      '<p class="empty">No recipes found. Try another search!</p>';
    return;
  }

  filteredRecipes.forEach(recipe => {
    const card = document.createElement("article");
    card.className = "recipe-card";

    const img = document.createElement("img");
    img.src = recipe.image;
    img.alt = recipe.name;
    img.loading = "lazy";

    const info = document.createElement("div");
    info.className = "recipe-info";

    const title = document.createElement("h3");
    title.textContent = recipe.name;

    const description = document.createElement("p");
    description.textContent =
      `${recipe.category} • ${recipe.time}`;

    const button = document.createElement("button");
    button.textContent = "View Recipe";
    button.addEventListener("click", () => {
      showRecipe(recipe.id);
    });

    info.append(title, description, button);
    card.append(img, info);
    recipeList.appendChild(card);
  });
}

function showRecipe(id) {
  const recipe = recipes.find(item => item.id === id);

  if (!recipe) return;

  recipeDetails.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = recipe.name;

  const img = document.createElement("img");
  img.src = recipe.image;
  img.alt = recipe.name;

  const time = document.createElement("p");
  time.textContent = `Preparation time: ${recipe.time}`;

  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.textContent = "Ingredients";

  const ingredientsList = document.createElement("ul");

  recipe.ingredients.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ingredientsList.appendChild(li);
  });

  const stepsTitle = document.createElement("h3");
  stepsTitle.textContent = "How to Make";

  const stepsList = document.createElement("ol");

  recipe.steps.forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    stepsList.appendChild(li);
  });

  recipeDetails.append(
    title,
    img,
    time,
    ingredientsTitle,
    ingredientsList,
    stepsTitle,
    stepsList
  );

  modal.hidden = false;
}

searchInput.addEventListener("input", renderRecipes);

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;

    categoryButtons.forEach(item => {
      item.classList.toggle("active", item === button);
    });

    renderRecipes();
  });
});

closeModal.addEventListener("click", () => {
  modal.hidden = true;
});

modal.addEventListener("click", event => {
  if (event.target === modal) {
    modal.hidden = true;
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    modal.hidden = true;
  }
});

renderRecipes();

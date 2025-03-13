// fetching categories data
function fetchCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories#")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function displayCategories(permCategories) {
  const categorySection = document.getElementById("category-section");
  for (let cat of permCategories) {
    const categoryButtonDiv = document.createElement("div");
    categoryButtonDiv.innerHTML = `
        <button class="btn hover:text-white hover:bg-[#FF1F3D]">${cat.category}</button>
        `;
    categorySection.append(categoryButtonDiv);
  }
}

fetchCategories();

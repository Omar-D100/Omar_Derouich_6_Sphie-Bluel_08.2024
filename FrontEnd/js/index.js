// Sélection de l'élément de la galerie du portfolio
const portfolioGallery = document.querySelector(".portfolio-gallery");
const divParents = document.querySelector(".category-div-parents");

let selectedCategory = null;

// Fonction pour récupérer les travaux depuis le serveur
async function getWorks() {
  const url = "http://localhost:5678/api/works";
  const response = await fetch(url);
  const works = await response.json();
  return works;
}

// Fonction pour afficher les travaux en fonction du filtre sélectionné
function displayWorks(filter) {
  portfolioGallery.innerHTML = ""; // Vider la galerie avant d'ajouter de nouveaux travaux
  getWorks().then(works => {

    // Filtrer les travaux en fonction de la catégorie sélectionnée
    const filteredData = filter ? works.filter((work) => work.category.id === filter.id) : works;
    // Créer et ajouter chaque travail filtré à la galerie
    filteredData.forEach(item => {
      createWork(item);
    });
  });
}


// Fonction pour créer et ajouter une figure (image + légende) à la galerie
function createWork(data) {
  const figure = document.createElement("figure");
  figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
                      <figcaption>${data.title}</figcaption>`;
  portfolioGallery.append(figure);
}

// Fonction pour récupérer les catégories depuis le serveur
async function getCategories() {
  const url = "http://localhost:5678/api/categories";
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message); // Afficher une erreur en cas de problème
  }
  return [];
}

// Fonction pour afficher les catégories
function displayCategories() {
  const categories = getCategories();
  categories.then(items => {
    createCategory(); // Créer et ajouter le bouton "Tous"
    items.forEach(item => {
      createCategory(item); // Créer et ajouter un bouton pour chaque catégorie
    });
  });
}

// Fonction pour créer et ajouter un filtre de catégorie
function createCategory(data) {
  const button = document.createElement("button");
  button.type = "button";
  button.addEventListener("click", () => {
    const activeButton = document.querySelector(".category.active");
    activeButton.classList.remove("active"); 
    button.classList.add("active"); 
    selectedCategory = data; // Mettre à jour la catégorie sélectionnée
    displayWorks(data); // Afficher les travaux filtrés par la catégorie sélectionnée
  }); // Ajouter un écouteur d'événement pour filtrer les travaux
  button.textContent = data ? data.name : "Tous"; // Afficher le nom de la catégorie ou "Tous"
  button.className = `category ${!data ? "active" : ""}`; // Ajouter la classe active au bouton "Tous"
  divParents.append(button); // Ajouter le filtre à l'élément parent
}


displayCategories();
displayWorks();
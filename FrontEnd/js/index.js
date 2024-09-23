// Sélection de l'élément de la galerie du portfolio
const portfolioGallery = document.querySelector(".portfolio-gallery");

// Fonction pour récupérer les travaux depuis le serveur
async function getWorks() {
  const url = "http://localhost:5678/api/works";
  const response = await fetch(url);
  const works = await response.json();
  return works;
}


// Fonction pour récupérer les travaux filtrés par catégorie
async function getWorksByFilter(filter) {
  portfolioGallery.innerHTML = ""; // Vider la galerie avant d'ajouter des nouvelles images
  const url = "http://localhost:5678/api/works";
  try {
    const response = await fetch(url);
    const data = await response.json();
    const filteredData = filter ? data.filter((work) => work.category.id === filter.id) : data;
    for (let i = 0; i < filteredData.length; i++) {
      console.log(filteredData[i]);
      setFigure(filteredData[i]); // Ajouter chaque travail filtré à la galerie
    }
  } catch (error) {
    console.error(error.message); // Afficher une erreur en cas de problème
  }
}


// Appel initial pour récupérer et afficher tous les travaux
getWorksByFilter();

// Fonction pour créer et ajouter une figure (image + légende) à la galerie
function setFigure(data) {
  const figure = document.createElement("figure");
  figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
                      <figcaption>${data.title}</figcaption>`;
  portfolioGallery.append(figure);
}

const divParents = document.querySelector(".category-div-parents");

// Fonction pour récupérer les catégories depuis le serveur
async function getCategories() {
  const url = "http://localhost:5678/api/categories";
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);

    // Ajouter chaque catégorie comme filtre
    createCategory();
    for (let i = 0; i < json.length; i++) {
      createCategory(json[i]);
    }
  } catch (error) {
    console.error(error.message); // Afficher une erreur en cas de problème
  }
}
// Appel initial pour récupérer et afficher les catégories
getCategories();


// Fonction pour créer et ajouter un filtre de catégorie
function createCategory(data) {
  const button = document.createElement("button");
  button.addEventListener("click", () => {
    const activeButton = document.querySelector(".category.active");
    activeButton.classList.remove("active");
    button.classList.add("active");
    getWorksByFilter(data);
  }); // Ajouter un écouteur d'événement pour filtrer les travaux
  button.textContent = data ? data.name : "Tous"; // Afficher le nom de la catégorie ou "Tous"
  button.className = `category ${!data ? "active" : ""}`
  divParents.append(button); // Ajouter le filtre à l'élément parent
  
}


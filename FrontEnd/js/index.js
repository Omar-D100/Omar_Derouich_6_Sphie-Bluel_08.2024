const portfolioGallery = document.querySelector(".portfolio-gallery");

async function getWorks() {
  const url = "http://localhost:5678/api/works";
  const response = await fetch(url);
  const works = await response.json();
  return works;
}



async function getWorksByFilter(filter) {
  portfolioGallery.innerHTML = " ";
  const url = "http://localhost:5678/api/works";
  try {
    const response = await fetch(url);
    const json = await response.json();

    if (filter) {
      const filtered = json.filter((data) => data.categoryId === filter);
      for (let i = 0; i < filtered.length; i++) {
        setFigure(filtered[i]);
      }
    }
    else {
      for (let i = 0; i < json.length; i++) {
        setFigure(json[i]);
      }
    }
  }
  catch (error) {
    console.error(error.message);
  }
}
getWorksByFilter();


function setFigure(data) {
  const figure = document.createElement("figure");
  figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
                          <figcaption>${data.title}</figcaption>`;

  portfolioGallery.append(figure);
}


async function getCategories() {
  const url = "http://localhost:5678/api/categories";
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);

    for (let i = 0; i < json.length; i++) {
      setFilter(json[i]);
    }
  }
  catch (error) {
    console.error(error.message);
  }
}
getCategories()


function setFilter(data) {
  const div = document.createElement("div");
  div.addEventListener("click", () => getWorksByFilter(data.id));
  div.innerHTML = `${data.name}`;
  document.querySelector(".div-parents").append(div);
}

document.querySelector(".tous").addEventListener("click", () => getWorksByFilter());







const portfolioEditButton = document.querySelector(".portfolio-header-edit");
portfolioEditButton.addEventListener("click", handleEditPortfolio);

const gallery = document.querySelector(".gallery");
const galleryContent = document.querySelector(".gallery-content");
const galleryPhotos = document.querySelector(".gallery-photos");
gallery.addEventListener("click", closeEditPortfolio);
galleryContent.addEventListener("click", (e) => e.stopPropagation());


async function handleEditPortfolio() {
  gallery.classList.add('active');

  // Nettoyer la galerie avant d'ajouter des nouvelles images
  galleryPhotos.innerHTML = '';

  const works = await getWorks();
  for (let index = 0; index < works.length; index++) {
    const work = works[index];

    const div = document.createElement("div");
    div.classList.add("gallery-item");
    
    // Structure de l'image avec le bouton "Supprimer" à l'intérieur
    div.innerHTML = `
      <img class="gallery-photo" src="${work.imageUrl}" alt="${work.title}">
      <button class="delete-photo">✖</button>
    `;

    // Ajout du gestionnaire de clic pour supprimer l'image
    const deleteButton = div.querySelector(".delete-photo");
    deleteButton.addEventListener("click", () => {
      div.remove(); // Supprimer l'image du DOM
      deleteWork(work.id); // Suppression côté serveur (si nécessaire)
    });

    galleryPhotos.append(div);
  }

  const galleryClose = document.querySelector(".gallery-close");
  galleryClose.addEventListener("click", closeEditPortfolio);

}

const galleryAddButton = document.querySelector(".gallery-add");
const modal2 = document.querySelector("#modal2");


galleryAddButton.addEventListener("click", () => {
  gallery.classList.remove('active'); // Fermer la galerie
  modal2.classList.add('active');    // Ouvrir le modal2
});

function closeEditPortfolio() {
  gallery.classList.remove('active')
}



// modal 2 //

const galleryCloseButton = document.querySelector(".gallery-close");
const closeButton = document.querySelector(".close-button");
const returnButton = document.querySelector(".return-button");
const modal2Wrapper = document.querySelector(".modal2-wrapper");
// Empêcher la propagation des clics dans le wrapper du modal2
modal2Wrapper.addEventListener("click", (e) => e.stopPropagation());


function closeEditPortfolio() {
  gallery.classList.remove('active');
  modal2.classList.remove('active');
}

function openModal2() {
  gallery.classList.remove('active');
  modal2.classList.add('active');
}

function closeModal2() {
  modal2.classList.remove('active');
}

function returnToGallery() {
  modal2.classList.remove('active');
  gallery.classList.add('active');
}

galleryCloseButton.addEventListener("click", closeEditPortfolio);
closeButton.addEventListener("click", closeModal2);
returnButton.addEventListener("click", returnToGallery);
galleryAddButton.addEventListener("click", openModal2);



// Fermer le modal2 si vous cliquez en dehors du contenu du modal
modal2.addEventListener("click", closeModal2);




const categorySelect = document.querySelector('#category-select');

async function loadCategories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des catégories');
    }

    const categories = await response.json();
    console.log("Données récupérées :", categories); // Ajoutez cette ligne pour vérifier les données

    // Effacer les options existantes sauf la première
    categorySelect.innerHTML = '<option value="">Sélectionner une catégorie</option>';

    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories :', error);
  }
}
console.log(categorySelect); 
document.addEventListener('DOMContentLoaded', loadCategories);






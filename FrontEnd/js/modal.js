//modal 1 Sélection des éléments du DOM
const portfolioEditButton = document.querySelector(".portfolio-header-edit");
const gallery = document.querySelector(".gallery");
const galleryContent = document.querySelector(".gallery-content");
const galleryPhotos = document.querySelector(".gallery-photos");
const galleryAddButton = document.querySelector(".gallery-add");
const galleryAdd = document.querySelector("#gallery-add");

// Ajout des écouteurs d'événements
portfolioEditButton.addEventListener("click", (e) => handleEditPortfolio(e));
gallery.addEventListener("click", (e) => closeEditPortfolio(e));
galleryContent.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
});
galleryAddButton.addEventListener("click", (e) => openGalleryAdd(e));

// Fonction pour gérer la suppression d'un travail
function handleDelete(event, workId, elementToRemove) {
  // Empêche le comportement par défaut de l'événement (par exemple, la soumission d'un formulaire)
  event.preventDefault();

  // Appelle la fonction deleteWork avec l'ID du travail à supprimer
  deleteWork(workId).then((deleted) => {
    // Si la suppression est réussie
    if (deleted) {
      // Affiche les travaux de la catégorie sélectionnée
      displayWorks(selectedCategory);
      // Supprime l'élément de la galerie
      elementToRemove.remove();
    }
  });
}

// Fonction pour gérer l'édition du portfolio
async function handleEditPortfolio(e) {
  e.preventDefault();

  gallery.classList.add('active');
  galleryPhotos.innerHTML = ''; // Nettoyer la galerie avant d'ajouter des nouvelles images

  const works = await getWorks();
  works.forEach(work => {
    const div = document.createElement("div");
    div.classList.add("gallery-item");

    const imgElement = document.createElement("img");
    imgElement.classList.add("gallery-photo");
    imgElement.src = work.imageUrl;
    imgElement.alt = work.title;

    const deleteButton = document.createElement("button");
    const deleteButtonIcon = document.createElement("i");
    deleteButtonIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");
    deleteButton.classList.add("delete-photo");

    deleteButton.appendChild(deleteButtonIcon);
    div.appendChild(imgElement);
    div.appendChild(deleteButton);

    deleteButton.addEventListener("click", (event) => {
      handleDelete(event, work.id , div);
    });

    galleryPhotos.appendChild(div);
  });

  const galleryClose = document.querySelector(".gallery-close");
  galleryClose.addEventListener("click", closeEditPortfolio);
}




// Fonction pour fermer la galerie
function closeEditPortfolio(e) {
  e.preventDefault();

  gallery.classList.remove('active');
}

// Fonction pour ouvrir le galleryAdd
function openGalleryAdd(e) {
  e.preventDefault();

  gallery.classList.remove('active'); // Fermer la galerie
  galleryAdd.classList.add('active'); // Ouvrir le galleryAdd
}


// Fonction pour supprimer un travail du serveur
async function deleteWork(workId) {
  const accessToken = sessionStorage.getItem('token');
  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.ok || response.status === 200;
  } catch (error) {
    alert('Erreur lors de la suppression du travail');
    console.error('Erreur lors de la suppression du travail:', error);
  }
  return false;
}






// modal 2 ouverture, retour en arriere  est fermeture //

// Sélecteurs DOM
const galleryCloseButton = document.querySelector(".gallery-close");
const closeButton = document.querySelector(".close-button");
const returnButton = document.querySelector(".return-button");
const galleryAddWrapper = document.querySelector(".gallery-add-wrapper");


// Fonctions de gestion des modals
function closeEditPortfolio() {
  gallery.classList.remove('active');
  galleryAdd.classList.remove('active');
}

function openGalleryAdd() {
  gallery.classList.remove('active');
  galleryAdd.classList.add('active');
}

function closeGalleryAdd() {
  galleryAdd.classList.remove('active');
}


function returnToGallery() {
  galleryAdd.classList.remove('active');
  gallery.classList.add('active');
}

// Gestionnaires d'événements
galleryCloseButton.addEventListener("click", closeEditPortfolio);
closeButton.addEventListener("click", closeGalleryAdd);
returnButton.addEventListener("click", returnToGallery);
galleryAddButton.addEventListener("click", openGalleryAdd);

// Empêcher la propagation des clics dans le wrapper du galleryAdd
galleryAddWrapper.addEventListener("click", (e) => e.stopPropagation());

// Fermer le galleryAdd si vous cliquez en dehors du contenu du modal
galleryAdd.addEventListener("click", closeGalleryAdd);












// User connecté

const connected = () => {
  // Stockage du token
  let token = sessionStorage.getItem('token');

  // Selecteurs des différents éléments HTML
  const editionElement = document.querySelector('#edition');
  const editWorksButton = document.querySelector('.portfolio-header-edit');
  const filtersWorks = document.querySelector('.category-div-parents');

  if (token) {
    filtersWorks.style.display = 'none';
    editWorksButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (galleryContent) return;
      galleryContent = true;
      galleryContent.style.display = "flex";
    });

    // Changement du texte "login"
    const loginLink = document.querySelector('.loginLink');
    loginLink.textContent = "logout";

    // Création du lien de déconnexion
    const logoutLink = document.querySelector('#logoutLink');
    logoutLink.addEventListener('click', () => {
      sessionStorage.removeItem('token');
      window.location.href = './login.html';
    });



  } else {
    editionElement.style.display = 'none';
    editWorksButton.style.display = 'none';
    filtersWorks.style.display = 'flex';
  }

};
connected();







// modal2 ajout de l'image 

document.addEventListener('DOMContentLoaded', loadCategories);

// Sélection des éléments HTML nécessaires
const addImageInput = document.getElementById('add-image');
const addImageButton = document.querySelector('.add-image-button');
const iconeImageElement = document.querySelector('.icon-form');
const textImageElement = document.querySelector('.add-image-text');
const addImageContainer = document.querySelector('.gallery-add-img');
const titleInput = document.getElementById('gallery-add-img-title');
const categorySelect = document.getElementById('category-select');
const validButton = document.querySelector('.valid-button');

// Ajout d'un écouteur d'événement pour détecter le changement de fichier
addImageInput.addEventListener('change', (e) => {

  const imageMaxSize = 4194304;
  const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  addImageInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
  
    if (file.size <= imageMaxSize) {
      if (validImageTypes.includes(file.type)) {
        // Masquer les éléments de l'interface utilisateur
        addImageButton.style.display = 'none';
        addImageInput.style.display = 'none';
        textImageElement.style.display = 'none';
        iconeImageElement.style.display = 'none';
  
        // Créer un conteneur pour la miniature de l'image
        const miniatureContainer = document.createElement('div');
        miniatureContainer.setAttribute('id', 'miniature-container');
  
        // Créer un élément img pour afficher la miniature
        const miniatureImage = document.createElement('img');
        miniatureImage.classList.add('miniature');
  
        // Utiliser FileReader pour lire le fichier et afficher la miniature
        const reader = new FileReader();
        reader.onload = function (event) {
          // Définir la source de l'image avec le résultat de la lecture
          miniatureImage.src = event.target.result;
        };
        // Lire le fichier comme une URL de données
        reader.readAsDataURL(file);
  
        // Ajouter l'image miniature au conteneur
        miniatureContainer.appendChild(miniatureImage);
        // Ajouter le conteneur de la miniature à l'élément parent
        addImageContainer.appendChild(miniatureContainer);
      } else {
        // Afficher un message d'erreur si le fichier n'est pas une image
        alert("Le fichier sélectionné n'est pas une image valide.");
        // Réinitialiser la valeur de l'input
        addImageInput.value = "";
      }
    } else {
      // Afficher un message d'erreur si la taille du fichier est trop grande
      alert("La taille de l'image est supérieure à 4Mo");
      // Réinitialiser la valeur de l'input
      addImageInput.value = "";
    }
    checkFormCompletion();
  });
  
});











//modal2 ajout de catégorie  
async function loadCategories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des catégories');
    }

    const categories = await response.json();
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







//modal2 Ajout d'écouteurs d'événements pour les champs de titre et de catégorie
titleInput.addEventListener('input', checkFormCompletion);
categorySelect.addEventListener('change', checkFormCompletion);

// Fonction pour vérifier si tous les champs sont remplis
function checkFormCompletion() {
  if (titleInput.value && categorySelect.value && addImageInput.files.length > 0) {
    validButton.classList.add('valid-button-green');
    validButton.disabled = false;
  } else {
    validButton.classList.remove('valid-button-green');
    validButton.disabled = true;
  }
}









// //modal2 Ajout d'un écouteur d'événement pour le bouton de validation
validButton.addEventListener('click', async (e) => {
  e.preventDefault(); // Empêche le comportement par défaut du bouton de soumission

  // Récupérer les données du formulaire
  const formData = new FormData();
  formData.append('title', titleInput.value);
  formData.append('category', categorySelect.value);
  formData.append('image', addImageInput.files[0]);

  const token = sessionStorage.getItem('token');

  try {
    console.log('Envoi des données au serveur...');

    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout de l'image");
    }

    const result = await response.json();

    displayWorks(selectedCategory);
    galleryAdd.classList.remove('active');
    addImageInput.value='';
    const miniatureImage = document.querySelector('.miniature');
    miniatureImage.remove();
    addImageButton.style.display = 'block';
    textImageElement.style.display = 'block';
    iconeImageElement.style.display = 'block';
    titleInput.value='';
    categorySelect.value='';
    

    alert('Image ajoutée avec succès !');

  } catch (error) {
    alert('Erreur lors de l\'ajout de l\'image');
  }
});

const url = "http://localhost:5678/api/users/login"; // URL de l'API pour la connexion des utilisateurs

const form = document.getElementById('login-form'); // Sélectionne le formulaire de connexion par son ID

// Fonction pour créer et afficher un message d'erreur
function createError(e, field, text) {
    const errorText = document.createElement('p'); 
    errorText.classList.add('login-form-error'); 
    errorText.textContent = text; // Définit le texte du message d'erreur
    if (field) {
        e.target[field].parentNode.appendChild(errorText); // Ajoute le message d'erreur sous le champ correspondant
    } else {
        document.querySelector("form").prepend(errorText); // Ajoute le message d'erreur en haut du formulaire
    }
}

// Fonction pour supprimer tous les messages d'erreur
function clearErrors() {
    const errorMessages = document.querySelectorAll('.login-form-error');
    errorMessages.forEach(function (error) {
        error.remove(); 
    });
}

// Fonction asynchrone pour gérer la soumission du formulaire
async function handleSubmit(e) {
    e.preventDefault(); 

    let errors = []; // Tableau pour stocker les erreurs

    // Récupérer les valeurs des champs
    const email = e.target.email.value; 
    const password = e.target.password.value;

    
    clearErrors();

    
    if (!email) {
        createError(e, "email", errors["email"] = "Veuillez remplir le champ email");
    }

    
    if (!password) {
        createError(e, "password", errors["password"] = "Veuillez remplir le champ mot de passe");
    }

    // Si des erreurs sont présentes, arrêter la soumission
    if (Object.keys(errors).length > 0) {
        return;
    }

    // Envoie une requête POST à l'API pour la connexion
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Définit le type de contenu comme JSON
        },
        body: JSON.stringify({ email, password }) // Envoie les données de connexion en JSON
    });

    // Si la réponse n'est pas OK, affiche un message d'erreur
    if (!response.ok) {
        createError(e, null, "Veuillez vérifier votre email et/ou votre mot de passe");
    } else {
        const result = await response.json();  
        sessionStorage.setItem('token', result.token); // Stocke le token dans la session
        console.log(result.token); 
        window.location.href = "index.html"; 
    }
}

// Ajoute un écouteur d'événement pour la soumission du formulaire
form.addEventListener('submit', handleSubmit);

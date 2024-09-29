const url = "http://localhost:5678/api/users/login"

const form = document.getElementById('login-form')

function createError(e, field, text) {
    const errorText = document.createElement('p')
    errorText.classList.add('login-form-error')
    errorText.textContent = text
    e.target[field].parentNode.appendChild(errorText)
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.login-form-error');
    errorMessages.forEach(function (error) {
        error.remove();
    });
}

async function handleSubmit(e) {
    e.preventDefault();

    let errors = []

    // Récupérer les valeurs des champs
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Supprimer les anciennes erreurs
    clearErrors();

    if (!email) {
        createError(e, "email", errors["email"] = "Veuillez remplir le champ email")
    }

    if (!password) {
        createError(e, "password", errors["password"] = "Veuillez remplir le champ mot de passe")
    }

    if (Object.keys(errors).length > 0) {
        return;
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    sessionStorage.setItem('token', result.token);

    console.log(result.token)
    window.location.href = "index.html";
}

// Ecoute du submit
form.addEventListener("submit", handleSubmit)









// Partie connexion de l'utilisateur

// Fonction de vérification
function checkInputLogin() {
    // Regex
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{6,})/;
  
    // Inputs de l'utilisateur
    let formMail = document.querySelector('#email_connect').value;
    let formMdp = document.querySelector('#mdp_connect').value;
  
    // Vérifier les inputs de l'utilisateur
    if (EMAIL_REGEX.test(formMail) == false) {
        alert("Votre email doit être au format xxx@yyy.zzz");
        return false;
    }else if (PASSWORD_REGEX.test(formMdp) == false) {
        alerte("Votre mot de passe n'est pas correct");
        return false;
    } else {
        return true;
    }
};

// Selection du bouton d'envoie
const myButtonConnexion = document.querySelector('#btn_connect');

// Bouton d'envoie des données pour la connexion
myButtonConnexion.addEventListener('click', function (event) {
    event.preventDefault()
    if (checkInputLogin() == true) {

        let connexion = {
            email: document.querySelector('#email_connect').value,
            password: document.querySelector('#mdp_connect').value
        };
    
        // Création de la methode 
        const envoieConnexion = fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            body: JSON.stringify(connexion),    
            headers: {
                "Content-Type": "application/json"
            }       
        });
    
        // Envoie des données au serveur
        envoieConnexion.then ( async response => {
            try {
                console.log(response);
                const body = await response.json();
                console.log(body); 
                if (response.ok == true) {
                    myReponse = JSON.stringify(body);
                    localStorage.setItem("login", myReponse);
                    window.location.href = "mur.html";
                } else {
                    alert("Mauvais identifiant ou mot de passe");
                    location.reload();
                }          
            }catch(e) {
                console.log(e);
            }
        }); 

    };
       
});
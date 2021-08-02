// Partie inscription de l'utilisateur

// Selection du bouton d'envoie
const myButtonSubmit = document.querySelector('#btn_inscription');

// Fonction de vérification
function checkInputSignUp() {
    // Regex
    let checkString = /[a-zéèêàçî]/;
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{6,})/;
  
    // Inputs de l'utilisateur
    let formNom = document.querySelector('#name').value;
    let formMail = document.querySelector('#email_inscription').value;
    let formMdp = document.querySelector('#mdp').value;
    
    // Vérifier les inputs de l'utilisateur
    if (checkString.test(formNom) == false) {
        alert("Votre nom n'est pas correct");
        return false;
    } else if (EMAIL_REGEX.test(formMail) == false) {
        alert("Votre email doit être au format xxx@yyy.zzz");
        return false;
    } else if (PASSWORD_REGEX.test(formMdp) == false) {
        alert("Votre mot de passe n'est pas correct, il doit avoir 6 caractères minimun dont une majuscule, un chiffre et un caractère spéciales");
        return false;
    } else {
        return true;
    }
};

// Bouton d'envoie des données pour l'inscription
myButtonSubmit.addEventListener('click', function (event) {
    event.preventDefault()
    if (checkInputSignUp() == true) {

        // Récupération des données
        let inscription = {
            username: document.querySelector('#name').value,
            email: document.querySelector('#email_inscription').value,
            password: document.querySelector('#mdp').value
        };
    
        // Création de la methode 
        const envoieInscription = fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(inscription),    
            headers: {
                "Content-Type": "application/json"
            }       
        });
    
        // Envoie des données au serveur
        envoieInscription.then ( async response => {
            try {
                console.log(response);
                const body = await response.json();
                console.log(body);
                if (response.ok == true) {
                    window.location.href = "confirm.html";
                } else {
                    alert("Email deja utilisé");
                    location.reload();
                }              
            }catch(e) {
                console.log(e);
            }
        });

    };
 
});

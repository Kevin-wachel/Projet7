// Partie inscription

const myButtonSubmit = document.querySelector('#btn_inscription');

function checkInput() {
    // Regex
    let checkString = /[a-zéèêàçî]/;
    let checkMail = /.+@.+\..+/;
  
    // Inputs de l'utilisateur
    let formNom = document.querySelector('#name').value;
    let formMail = document.querySelector('#email').value;
    let formMdp = document.querySelector('#mdp').value;
  
    // Vérifier les inputs de l'utilisateur
    if (checkString.test(formNom) == false) {
        alert("Votre nom n'est pas correct");
        return false;
    } else if (checkMail.test(formMail) == false) {
        alert("Votre email doit être au format xxx@yyy.zzz");
        return false;
    }else if (checkMail.test(formMdp) == false) {
        alerte("Votre mot de passe n'est pas correct");
        return false;
    } else {
        return true;
    }
};

myButtonSubmit.addEventListener('click', function (event) {
    event.preventDefault()
    /*if (checkInput() == true) {

    }*/
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
            //window.location.href = "";
        }catch(e) {
            console.log(e);
        }
    }); 
    
});

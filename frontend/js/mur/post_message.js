// Récupération du token

const token = JSON.parse(localStorage.getItem("login"));

// Fonction pour avoir les informations de l'utilisateur grâce au token
const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.token.split('.')[1]));
    } catch (e) {
      return null;
    }
};
console.log(parseJwt(token));

// Création des messages

const myButtonPublish = document.querySelector('.btn_publier');

myButtonPublish.addEventListener('click', function (event) {
    event.preventDefault()

    const token = JSON.parse(localStorage.getItem("login"));
    
    let message = {
        userId: parseJwt(token).userId,
        content: document.querySelector('.msg_field').value,
        attachment: document.querySelector('.lien_field').value
    };

    // Création de la methode 
    const envoieMessage = fetch("http://localhost:3000/api/messages/", {
        method: "POST",
        body: JSON.stringify(message),    
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.token}`
        }       
    });

    // Envoie des données au serveur
    envoieMessage.then ( async response => {
        try {
            console.log(response);
            const body = await response.json();
            console.log(body);
            location.reload();
        }catch(e) {
            console.log(e);
        }
    }); 
    
});

// Bouton retour a l'acceuil et deconnexion
const myButtonDec = document.querySelector(".out");

myButtonDec.addEventListener('click', function (event) {
    localStorage.clear();
});
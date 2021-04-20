// Récupération et selection d'élèments
const infoUser = document.querySelector('.info_utilisateur');
const token = JSON.parse(localStorage.getItem("login"));

// Fonction pour avoir les informations de l'utilisateur grâce au token
const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.token.split('.')[1]));
    } catch (e) {
      return null;
    }
};

// Création de la methode 
const utilisateur = fetch("http://localhost:3000/api/auth/" + parseJwt(token).userId, {
    method: "GET",   
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.token}`
    }       
});

// Envoie des données au serveur
utilisateur.then ( async response => {
    try {
        console.log(response);
        const body = await response.json();
        console.log(body.results);
        function utilisateurId() {
            // Sélection des éléments
            const myName = document.querySelector('.name_uti');
            const myEmail = document.querySelector('.email_uti');
            const myBio = document.querySelector('.bio_uti');
        
            // Intégration des données
            myName.textContent = "Nom d'utilisateur :" + " " + body.results[0].username;
            myEmail.textContent = "Email de l'utilisateur :" + " " + body.results[0].email;
            myBio.textContent = "Bio :" + " " + body.results[0].bio;
        
        };
        utilisateurId();
    }catch(e) {
        console.log(e);
    }
}); 



// Modification des informations

// Création de la methode 
const utilisateurModify = fetch("http://localhost:3000/api/auth/:id", {
    method: "PUT",   
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.token}`
    }       
});

// Suppréssion du compte

const myButtonSup = document.querySelector('.btn_sup');

// Bouton d'envoie des données pour la suppréssion du compte
myButtonSup.addEventListener('click', function (event) {
    event.preventDefault()
    
    // Création de la methode 
    const utilisateurSup = fetch("http://localhost:3000/api/auth/" + parseJwt(token).userId, {
        method: "DELETE",   
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.token}`
        }       
    });
    
    // Envoie des données au serveur
    utilisateurSup.then ( async response => {
        try {
            console.log(response);
            const body = await response.json();
            console.log(body);
            alert(JSON.stringify(body));
            window.location.href = "index.html";
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
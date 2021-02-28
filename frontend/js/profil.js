// Création de la methode 
const utilisateur = fetch("http://localhost:3000/api/auth/");

// Envoie des données au serveur
utilisateur.then ( async response => {
    try {
        console.log(response);
        const body = await response.json();
        console.log(body);
    }catch(e) {
        console.log(e);
    }
}); 

const infoUser = document.querySelector('.info_utilisateur')

function utilisateurId() {
    // Sélection des éléments
    const myName = document.querySelector('.name_uti');
    const myEmail = document.querySelector('.email_uti');
    const myBio = document.querySelector('.bio_uti');

    // Intégration des données
    myName.textContent = response.username;
    myEmail.textContent = response.email;
    myBio.textContent = response.bio;

};



// Bouton retour a l'acceuil et deconnexion
const myButtonDec = document.querySelector(".out");

myButtonDec.addEventListener('click', function (event) {
    localStorage.clear();
});
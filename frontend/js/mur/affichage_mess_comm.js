// Récupération des messages et des commentaires

const ul = document.querySelector('.message');

// Création de la methode pour les messages
const messagesRecup = fetch("http://localhost:3000/api/messages/", {
    method: "GET",   
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.token}`
    }       
});

// Création de la methode pour les commentaires
const commentaireRecup = fetch("http://localhost:3000/api/commentaire/", {
    method: "GET",   
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.token}`
    }       
});


// Partie récupération

// Récupération des données du serveur
messagesRecup.then ( async response => {
    console.log(response);
    const bodyMessage = await response.json();
    console.log(bodyMessage.results);
    function affichageMessage() {
        for(let i = 0; i < bodyMessage.results.length; i++) {
            const myLi = document.createElement('li');
            myLi.classList.add("message_unique");
            const myH3 = document.createElement('h3');
            const myMessage = document.createElement('p');
    
            myH3.textContent = bodyMessage.results[i].username;
            myMessage.textContent = bodyMessage.results[i].content;
    
            myLi.appendChild(myH3);
            myLi.appendChild(myMessage);

            ul.appendChild(myLi);
    
        };
    };
    affichageMessage()
}); 

// Récupération des données du serveur
commentaireRecup.then ( async response => {
    console.log(response);
    const bodyCommentaire = await response.json();
    console.log(bodyCommentaire.results);
    function affichageCommentaire() {
        for(let j = 0; j < bodyCommentaire.results.length; j++) {
            const myMessageUnique = document.querySelector('.message_unique');
            const myUl = document.createElement('ul');
            myUl.classList.add("commentaire");
            const myLi = document.createElement('li');
            myLi.classList.add("commentaire_unique");
            const myH3 = document.createElement('h3');
            const myCommentaire = document.createElement('p');
            
            myH3.textContent = bodyCommentaire.results[j].username;
            myCommentaire.textContent = bodyCommentaire.results[j].content;
    
            myLi.appendChild(myH3);
            myLi.appendChild(myCommentaire);
    
            myUl.appendChild(myLi);
            myMessageUnique.appendChild(myUl);
        };
    }; 
    affichageCommentaire();
});


// Récupération des messages et des commentaires

const ul = document.querySelector('.message');

// Création de la methode pour les messages et les commentaires
const messagesRecup = fetch("http://localhost:3000/api/messages/", {
    method: "GET",   
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.token}`
    }       
}).then(response => response.json());

const commentaireRecup = fetch("http://localhost:3000/api/commentaire/", {
    method: "GET",   
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.token}`
    }       
}).then(response => response.json());

// Partie récupération

const messageEtCommentaire = async function() {
    let body = await Promise.all([messagesRecup, commentaireRecup]);
    console.log(body);

    // Récupération des messages
    for(let i = 0; i < body[0].results.length; i++) {
        const myLi = document.createElement('li');
        myLi.classList.add("message_unique");
        const myH3 = document.createElement('h3');
        const myMessage = document.createElement('p');

        myH3.textContent = body[0].results[i].username;
        myMessage.textContent = body[0].results[i].contentMessage;

        myLi.appendChild(myH3);
        myLi.appendChild(myMessage);

        ul.appendChild(myLi);
        
        // Récupération des commentaires
        
        for(let j = 0; j < body[1].results.length; j++) {
            if (body[0].results[i].id == body[1].results[j].messageId) {
            const myLi = document.createElement('li');
            myLi.classList.add("commentaire_unique");
            const myH3 = document.createElement('h3');
            const myCommentaire = document.createElement('p');
    
            myH3.textContent = body[1].results[j].username;
            myCommentaire.textContent = body[1].results[j].contentCommentaire;
    
            myLi.appendChild(myH3);
            myLi.appendChild(myCommentaire);
    
            ul.appendChild(myLi);
                
            };
        };

    };

    

};
messageEtCommentaire();

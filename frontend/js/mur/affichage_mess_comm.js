// Récupération des messages et des commentaires

const ul = document.querySelector('.message');

// Création de la methode pour les messages et les commentaires
const messagesRecup = fetch("http://localhost:3000/api/messages/all", {
    method: "GET",   
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.token}`
    }       
});

// Partie récupération

function recupMessage() {
    messagesRecup.then ( async response => {
        console.log(response);
        const bodyMessage = await response.json();
        console.log(bodyMessage.results);
        this.id = -1;
            
        for(let i = 0; i < bodyMessage.results.length; i++) {
            const myLi = document.createElement('li');
            myLi.classList.add("message_unique");
            
            const myH3 = document.createElement('h3');
            const myMessage = document.createElement('p');
            const myCommentaire = document.createElement('p');

            myH3.textContent = bodyMessage.results[i].username; 
            myLi.appendChild(myH3);

            if (this.id != bodyMessage.results[i].id) {
                myMessage.textContent = bodyMessage.results[i].contentMessage;
                myLi.appendChild(myMessage);
                this.id = bodyMessage.results[i].id;
            }

            myCommentaire.textContent = bodyMessage.results[i].contentCommentaire;
            myLi.appendChild(myCommentaire);

            ul.appendChild(myLi);
            
        };
    });    
    
};
recupMessage();

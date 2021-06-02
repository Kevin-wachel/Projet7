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
        
        // DOM des messages
        const myLi = document.createElement('li');
        myLi.classList.add("message_unique");
        const myH3Message = document.createElement('h3');
        const myMessage = document.createElement('p');
        const myHr = document.createElement('hr');

        myH3Message.textContent = body[0].results[i].username;
        myMessage.textContent = body[0].results[i].contentMessage;

        myLi.appendChild(myH3Message);
        myLi.appendChild(myMessage);
        myLi.appendChild(myHr);

        ul.appendChild(myLi);
               
        // Récupération des commentaires     
        for(let j = 0; j < body[1].results.length; j++) {
            if (body[0].results[i].id == body[1].results[j].messageId) {

            // DOM des commentaires    
            const myH3Commentaire = document.createElement('h3');
            const myCommentaire = document.createElement('p');
            const myHr2 = document.createElement('hr');

            myH3Commentaire.textContent = body[1].results[j].username;
            myCommentaire.textContent = body[1].results[j].contentCommentaire;
    
            myLi.appendChild(myH3Commentaire);
            myLi.appendChild(myCommentaire);
            myLi.appendChild(myHr2);
                
            };
        };

        
        /*
        const message = document.querySelector('.message');

        // Création de la partie post des commentaires
        const myH4 = document.createElement('h4');
        const myCommentaire = document.createElement('textarea');
        const myButtonCommentaire = document.createElement('button');

        myButtonCommentaire.classList.add("btn_commentaire");
        myCommentaire.classList.add("comm_field");
        myButtonCommentaire.textContent = "Publier";
        myH4.textContent = "Votre commentaire";

        message.appendChild(myH4)
        message.appendChild(myCommentaire);
        message.appendChild(myButtonCommentaire);
        */
    };  


};
messageEtCommentaire();

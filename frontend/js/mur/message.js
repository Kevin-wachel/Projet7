// Récupération des messages

const ul = document.querySelector('.message');

// Création de la methode 
const messagesRecup = fetch("http://localhost:3000/api/messages/");

// Récupération des données du serveur
messagesRecup.then ( async response => {
    try {
        console.log(response);
        const body = await response.json();
        console.log(body);
        function affichageMessage() {
            for(let i = 0; i < body.length; i++) {
                const myLi = document.createElement('li');
                myLi.classList.add("message_unique");
                const myH3 = document.createElement('h3');
                const myMessage = document.createElement('p');
        
                myH3.textContent = body[i].UserId;
                myMessage.textContent = body[i].content;
        
                myLi.appendChild(myH3);
                myLi.appendChild(myMessage);
        
                ul.appendChild(myLi);
        
            };
        }; 
        affichageMessage();
    }catch(e) {
        console.log(e);
    }
}); 



// Création des messages

const myButtonPublish = document.querySelector('.btn_publier');

myButtonPublish.addEventListener('click', function (event) {
    event.preventDefault()

    const myId = JSON.parse(localStorage.getItem("login"));
    
    let message = {
        UserId: myId.userId,
        content: document.querySelector('.msg_field').value
    };

    // Création de la methode 
    const envoieMessage = fetch("http://localhost:3000/api/messages/", {
        method: "POST",
        body: JSON.stringify(message),    
        headers: {
            "Content-Type": "application/json"
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

// Suppréssion des messages



// Bouton retour a l'acceuil et deconnexion
const myButtonDec = document.querySelector(".out");

myButtonDec.addEventListener('click', function (event) {
    localStorage.clear();
});
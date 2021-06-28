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

const commentaireRecup = fetch("http://localhost:3000/api/commentaires/", {
    method: "GET",   
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.token}`
    }       
}).then(response => response.json());

const likeRecup = fetch("http://localhost:3000/api/like/", {
    method: "GET",   
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.token}`
    }       
}).then(response => response.json());

// Partie récupération

const messageEtCommentaire = async function() {
    let body = await Promise.all([messagesRecup, commentaireRecup, likeRecup]);
    console.log(body);

    // Récupération des messages
    for(let i = 0; i < body[0].results.length; i++) {
        
        // DOM des messages
        const myLi = document.createElement('li');
        myLi.classList.add("message_unique");
        const myH3Message = document.createElement('h3');
        const myMessage = document.createElement('p');
        const myHr = document.createElement('hr');
        const myLien = document.createElement('img');
        const myButtonLike = document.createElement('button');
        const myButtonDeleteMessage = document.createElement('button');
        myButtonDeleteMessage.classList.add("btn_supp_message");

        myH3Message.textContent = body[0].results[i].username;
        myMessage.textContent = body[0].results[i].contentMessage;
        myLien.setAttribute('src', body[0].results[i].attachment);
        myButtonLike.innerHTML = '<i class="far fa-thumbs-up"></i>';
        myButtonDeleteMessage.innerHTML = '<i class="fas fa-times"></i>';

        myLi.appendChild(myButtonDeleteMessage);
        myLi.appendChild(myH3Message);
        myLi.appendChild(myMessage);
        myLi.appendChild(myLien);
        myLi.appendChild(myButtonLike);
        myLi.appendChild(myHr);

        ul.appendChild(myLi);
               
        // Récupération des commentaires     
        for(let j = 0; j < body[1].results.length; j++) {
            if (body[0].results[i].id == body[1].results[j].messageId) {

            // DOM des commentaires    
            const myH3Commentaire = document.createElement('h3');
            const myCommentaire = document.createElement('p');
            const myHr2 = document.createElement('hr');
            const myButtonDeleteCommentaire = document.createElement('button');
            myButtonDeleteCommentaire.classList.add("btn_supp_comm");
            
            myButtonDeleteCommentaire.innerHTML = '<i class="fas fa-times"></i>';

            myH3Commentaire.textContent = body[1].results[j].username;
            myCommentaire.textContent = body[1].results[j].contentCommentaire;
    
            myLi.appendChild(myButtonDeleteCommentaire);
            myLi.appendChild(myH3Commentaire);
            myLi.appendChild(myCommentaire);
            myLi.appendChild(myHr2);

            // Supprimer le commentaire
            if (body[0].results[i].isAdmin === 1 || body[0].results[i].userId === parseJwt(token).userId) {
                myButtonDeleteCommentaire.addEventListener('click', function (event) {
                    event.preventDefault()
    
                    // Création de la methode 
                    const deleteCommentaire = fetch("http://localhost:3000/api/commentaires/" + body[1].results[j].id, {
                        method: "DELETE",    
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token.token}`
                        }       
                    });
    
                    // Envoie des données au serveur
                    deleteCommentaire.then ( async response => {
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
            }
                
            };
        };

        // Création de la partie post des commentaires
        const myH4 = document.createElement('h4');
        const myCommentaire = document.createElement('textarea');
        const myButtonCommentaire = document.createElement('button');
        const myLabelCommentaire = document.createElement('label');
        const myFormCommentaire =document.createElement('form');

        myCommentaire.classList.add("comm_field");
        myButtonCommentaire.textContent = "Publier";
        myButtonCommentaire.classList.add("btn_publier_comm");
        myFormCommentaire.classList.add("form_comm");
        myH4.textContent = "Votre commentaire :";

        myH4.appendChild(myCommentaire);
        myLabelCommentaire.appendChild(myH4);
        myFormCommentaire.appendChild(myLabelCommentaire);
        myFormCommentaire.appendChild(myButtonCommentaire);
        myLi.appendChild(myFormCommentaire);

        ul.appendChild(myLi);

        // Bouton d'envoie des commentaires
        myButtonCommentaire.addEventListener('click', function (event) {
            event.preventDefault()

            const token = JSON.parse(localStorage.getItem("login"));
            
            const contentCommentaire = document.querySelectorAll('.comm_field');

            let commentaire = {
                userId: parseJwt(token).userId,
                messageId: body[0].results[i].id,
                contentCommentaire: contentCommentaire[i].value
            };

            // Création de la methode 
            const envoieCommentaire = fetch("http://localhost:3000/api/commentaires/", {
                method: "POST",
                body: JSON.stringify(commentaire),    
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token.token}`
                }       
            });

            // Envoie des données au serveur
            envoieCommentaire.then ( async response => {
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





/*
        for(let k = 0; k < body[2].results.length; k++) {
            if (body[2].results[k].likes === 0) { //Le problème se situe ici
                // Bouton pour ajouter les likes
                myButtonLike.addEventListener('click', function (event) {
                    event.preventDefault()

                    const token = JSON.parse(localStorage.getItem("login"));
                    
                    let like = {
                        userId: parseJwt(token).userId,
                        messageId: body[0].results[i].id,
                        likes: i + 1
                    };

                    // Création de la methode 
                    const envoieLike = fetch("http://localhost:3000/api/like/" + body[0].results[i].id, {
                        method: "POST",
                        body: JSON.stringify(like),    
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token.token}`
                        }       
                    });

                    // Envoie des données au serveur
                    envoieLike.then ( async response => {
                        try {
                            console.log(response);
                            const body = await response.json();
                            console.log(body);
                            //location.reload();
                        }catch(e) {
                            console.log(e);
                        }
                    }); 
                    
                });

            } else {
                // Bouton pour enlever les likes
                myButtonLike.addEventListener('click', function (event) {
                    event.preventDefault()

                    const token = JSON.parse(localStorage.getItem("login"));
                    
                    let like = {
                        userId: parseJwt(token).userId,
                        messageId: body[0].results[i].id,
                    };

                    // Création de la methode 
                    const removeLike = fetch("http://localhost:3000/api/like/" + body[0].results[i].id, {
                        method: "DELETE",
                        body: JSON.stringify(like),    
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token.token}`
                        }       
                    });

                    // Envoie des données au serveur
                    removeLike.then ( async response => {
                        try {
                            console.log(response);
                            const body = await response.json();
                            console.log(body);
                            //location.reload();
                        }catch(e) {
                            console.log(e);
                        }
                    }); 
                    
                });
            }
        }
*/




        
        // Supprimer le message
        if (body[0].results[i].isAdmin === 1 || body[0].results[i].userId === parseJwt(token).userId) {
            myButtonDeleteMessage.addEventListener('click', function (event) {
                event.preventDefault()
    
                // Création de la methode 
                const deleteMessage = fetch("http://localhost:3000/api/messages/" + body[0].results[i].id, {
                    method: "DELETE",    
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token.token}`
                    }       
                });
    
                // Envoie des données au serveur
                deleteMessage.then ( async response => {
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
        }
        
    };  

};
messageEtCommentaire();

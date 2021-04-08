// Récupération des commentaires

// Création de la methode 
const commentaireRecup = fetch("http://localhost:3000/api/commentaire/", {
    method: "GET",   
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.token}`
    }       
});

// Récupération des données du serveur
commentaireRecup.then ( async response => {
    try {
        console.log(response);
        const body = await response.json();
        console.log(body.results);
        function affichageCommentaire() {
            for(let i = 0; i < body.results.length; i++) {
                const myMessageUnique = document.querySelector('.message_unique');
                const myUl = document.createElement('ul');
                myUl.classList.add("commentaire");
                const myLi = document.createElement('li');
                myLi.classList.add("commentaire_unique");
                const myH3 = document.createElement('h3');
                const myCommentaire = document.createElement('p');
                
                myH3.textContent = body.results[i].username;
                myCommentaire.textContent = body.results[i].content;
        
                myLi.appendChild(myH3);
                myLi.appendChild(myCommentaire);
        
                myUl.appendChild(myLi);
                myMessageUnique.appendChild(myUl);
            };
        }; 
        affichageCommentaire();
    }catch(e) {
        console.log(e);
    }
}); 

// Création des commentaires

// Suppréssion des commentaires


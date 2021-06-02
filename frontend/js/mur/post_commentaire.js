// Création des commentaires
/*
const mRecup = fetch("http://localhost:3000/api/messages/", {
method: "GET",   
headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token.token}`
}       
});

mRecup.then ( async response => {
    try {
        console.log(response);
        const body = await response.json();
        console.log(body.results);
    }catch(e) {
        console.log(e);
    }
}); 
*/
/*
const myButtonCommentaire = document.querySelector('.btn_commentaire');

myButtonCommentaire.addEventListener('click', function (event) {
    event.preventDefault()

    const token = JSON.parse(localStorage.getItem("login"));
    
    let commentaire = {
        userId: parseJwt(token).userId,
        //messageId: ,
        contentCommentaire: document.querySelector('.comm_field').value
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
*/
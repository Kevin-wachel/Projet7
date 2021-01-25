//Partie connexion

const myButtonConnexion = document.querySelector('#btn_connect');


myButtonConnexion.addEventListener('click', function (event) {
    event.preventDefault()
    /*if (checkInput() == true) {

    }*/
    let connexion = {
        email: document.querySelector('#email_connect').value,
        password: document.querySelector('#mdp_connect').value
    };

    // Création de la methode 
    const envoieConnexion = fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(connexion),    
        headers: {
            "Content-Type": "application/json"
        }       
    });

    // Envoie des données au serveur
    envoieConnexion.then ( async response => {
        try {
            console.log(response);
            const body = await response.json();
            console.log(body);
            myReponse = JSON.stringify(body);
            localStorage.setItem("login", myReponse);
            window.location.href = "mur.html";
        }catch(e) {
            console.log(e);
        }
    }); 
    
});
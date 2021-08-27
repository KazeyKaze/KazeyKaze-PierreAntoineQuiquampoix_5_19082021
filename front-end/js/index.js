// Création de la fonction "API" qui va fetcher et stocker la réponse du fetch
const API = function () {
    fetch("http://localhost:3000/api/furniture")
        .then((response) => {
            let data = response.json();
            return data;
        })

        // Utilisation de la réponse pour afficher du contenu
        .then(function (data) {

            // Création d'une boucle qui va générer automatiquement les autres
            // cartes des produits
            for (let i = 0; i < data.length; i++) {

                // Concaténation des objets de "varnish"
                let varnish = [...data[i].varnish];

                // 
                let plan = document.getElementById("produits");

                plan.innerHTML += `<div class="produits" id="produits__${i}">
                <img class="produits__img" src="${data[i].imageUrl}" alt="">
                <div class="produits__name">${data[i].name}</div>
                <div class="produits__description">${data[i].description}</div>
                <div class="produits__varnish">${varnish.join(" / ")}</div>
                <div class="produits__price">${(data[i].price/100).toFixed(2)} €</div>
                </div>`;
            }
        })

        // Affichage d'un message d'erreur si la réponse du server ne se fait pas
        .catch(error => alert("Erreur : " + error));
}

// Utilisation de la fonction "API"
API();
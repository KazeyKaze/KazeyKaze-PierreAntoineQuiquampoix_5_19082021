// Récupération de l'id du produit qui se trouve dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Création de la fonction "API" qui va fetcher et stocker la réponse du fetch
const API_id = function () {
    fetch(`http://localhost:3000/api/furniture/${id}`)
        .then((response) => {
            let data = response.json();
            return data;
        })

        // Utilisation de la réponse pour afficher du contenu
        .then(function (data) {

            // Injection du HTML et des produits via JS de façon dynamique
            let plan = document.getElementById("produits");

            plan.innerHTML += `<div class="produits-page" id="produits-page">
                <img class="produits__img" src="${data.imageUrl}" alt="Image de ${data.name}">
                <div class="produits__name">${data.name}</div>
                <div class="produits__description">${data.description}</div>
                <div class="produits__varnish">${data.varnish.join(" / ")}</div>
                <div class="produits__price">${(data.price/100).toFixed(2)} €</div>
                <form action=""><button class="bouton-panier">Ajouter au panier</button></form>
                </div>`;
        })

        // Affichage d'un message d'erreur si la réponse du server ne se fait pas
        .catch(error => alert("Erreur : " + error));
}

// Utilisation de la fonction "API"
API_id();
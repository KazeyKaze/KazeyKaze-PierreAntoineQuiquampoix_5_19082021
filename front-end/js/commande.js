// Variable qui contient les données de la clé "Prix total" du local storage et qui les parse
let prix = JSON.parse(localStorage.getItem("Prix total"));

// Variable qui contient les données de "Order" du local storage et qui les parse
let orderId = JSON.parse(localStorage.getItem("Order"));

// Je cible un id HTML pour injecter du contenu à l'intérieur
let planPrice = document.getElementById("prix-total");

// Fonction qui contient le code HTML et les données que je veux injecter
function getPriceTemplate(prix) {

    // Si le prix n'est pas null
    if (prix != null) {

        // J'injecte ce HTML et ces données
        return `<div class="prix-total__paragraphe">Prix total de votre commande:</div>
            <div class="prix-total__price">${prix} €</div>
            <div class="prix-total__paragraphe">Identifiant de votre commande:</div>
            <div class="prix-total__price">${orderId}</div>`;

        // Sinon j'injecte ce HTML
    } else {
        return `<div class="prix-total__paragraphe">Aucune commande en cours !</div>`
    }
}

// J'applique le plan HTML
planPrice.innerHTML += getPriceTemplate(prix);

// Suppression des informations du localstorage au déchargement de la page
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    localStorage.clear();
});
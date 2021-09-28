// Récupération des informations du localStorage pour le parse
let prix = JSON.parse(localStorage.getItem("Prix total"));
let orderId = JSON.parse(localStorage.getItem("Order"));

// Affichage du prix et de l'ID de la commande
let planPrice = document.getElementById("prix-total");

function getPriceTemplate(prix) {
    return `<div class="prix-total__paragraphe">Prix total de votre commande:</div>
        <div class="prix-total__price">${prix} €</div>
        <div class="prix-total__paragraphe">Identifiant de votre commande:</div>
        <div class="prix-total__price">${orderId}</div>`;
}
planPrice.innerHTML += getPriceTemplate(prix);

// Suppression des informations du localstorage
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    localStorage.clear();
});
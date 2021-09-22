// Récupération des informations du localStorage pour le parse
let basket = localStorage.getItem("Produit");
basket = JSON.parse(basket);


// Création du HTML dynamique selon les informations contenues
// dans le localStorage
let plan = document.getElementById("produits");

for (let i = 0; i < basket.length; i++) {
    function getBasketTemplate(basket) {

        return `<div class="produits-page" id="produits-page">
            <img class="produits__img" src="${basket[i].image}" alt="Image de ${basket[0]}">
            <div class="produits__name">${basket[i].name}</div>
            <div class="produits__price">${(basket[i].price/100).toFixed(2)} €</div>
            <div class="produits__varnish__selected">${basket[i].varnish}</div>
            <button class="bouton-panier" id="bouton-panier">Retirer du panier</button>`;
    }
    plan.innerHTML += getBasketTemplate(basket);
}

// Retirer le produit du panier et actualiser la page
const boutonPanier = document.getElementById("bouton-panier");
boutonPanier.addEventListener('click', () => {
    window.location.reload();
})
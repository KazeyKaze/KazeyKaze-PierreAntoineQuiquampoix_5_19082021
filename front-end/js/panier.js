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
            <div class="produits__price">${(basket[i].price/100)} €</div>
            <div class="produits__varnish__selected">${basket[i].varnish}</div>`;
    }
    plan.innerHTML += getBasketTemplate(basket);
}

// Calcul et affichage du prix total du panier
let totalPrice = 0;
let planPrice = document.getElementById("prix-total");

for (let i = 0; i < basket.length; i++) {
    totalPrice = totalPrice + basket[i].price/100;

    function getPriceTemplate(totalPrice) {
        return `<div class="prix-total__paragraphe">Prix total de votre commande:</div>
        <div class="prix-total__price">${totalPrice} €</div>`
    } 
}
planPrice.innerHTML += getPriceTemplate(totalPrice);



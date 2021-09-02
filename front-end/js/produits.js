// Fetch de l'id des données produits
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

function API_id() {
    return fetch(`http://localhost:3000/api/furniture/${id}`)
        .then((response) => {
            return response.json();
        })
        .catch(error => alert("Erreur : " + error));
}

// Création du HTML pour un produit
let plan = document.getElementById("produits");

function getVarnishTemplate(data, varnishes) {
    return `<div class="produits-page" id="produits-page">
            <img class="produits__img" src="${data.imageUrl}" alt="Image de ${data.name}">
            <div class="produits__name">${data.name}</div>
            <div class="produits__description">${data.description}</div>
            <div class="produits__price">${(data.price/100).toFixed(2)} €</div>
            <form class="produits__varnish__select">
            <select id="select"><option>-- Choisissez un vernis --${varnishes}</option></select></form>
            <form><button class="bouton-panier" id="bouton-panier">Ajouter au panier</button></form>
            </div>`;
}

// Ajout des vernis disponibles pour le produit
API_id()
    .then(data => {
        let varnishes = "";
        for (const varnish of data.varnish) {
            varnishes += `<option>${varnish}</option>`;
        }
        plan.innerHTML += getVarnishTemplate(data, varnishes);
    })

// Ajout du produit dans le local storage
document.getElementById("bouton-panier").onclick = () => {
    data = localStorage;
}
console.log(localStorage);
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
            <select id="select" onChange=update()>${varnishes}</select></form>
            <form action="/front-end/html/page_panier.html"><button class="bouton-panier" id="bouton-panier">Ajouter au panier</button></form>
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
        ajoutPanier(data);
    })

// Ajout du produit dans le local storage
function ajoutPanier(data) {
    const boutonPanier = document.getElementById("bouton-panier");
    const selectId = document.getElementById("select");
    const selectedVarnish = selectId.options[selectId.selectedIndex].text;
    let objet = JSON.stringify([data.imageUrl, data.name, data.price, selectedVarnish]);

    boutonPanier.addEventListener('click', () => {
        localStorage.setItem("Produit", objet);
    })
}

function update() {
    const selectId = document.getElementById("select");
    const selectedVarnish = selectId.options[selectId.selectedIndex].text;
    console.log(selectedVarnish);
}
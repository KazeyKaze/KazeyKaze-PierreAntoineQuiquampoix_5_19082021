// Fetch de l'id d'un produits
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
            <div class="produits__varnish__select">
            <select id="select">${varnishes}</select></div>
            <button class="bouton-panier" id="bouton-panier">Ajouter au panier</button>
            </div>`;
}

// Ajout des vernis disponibles pour un produit
API_id()
    .then(data => {
        let varnishes = "";
        for (const varnish of data.varnish) {
            varnishes += `<option>${varnish}</option>`;
        }
        plan.innerHTML += getVarnishTemplate(data, varnishes);
        ajoutPanier(data);
    })

// Ajout d'un produit dans le local storage
function ajoutPanier(data) {
    const boutonPanier = document.getElementById("bouton-panier");

    // Création du tableau et de l'objet
    boutonPanier.addEventListener('click', () => {
        let products = [];
        const selectId = document.getElementById("select");
        const selectedVarnish = selectId.value;
        let objet = {
            image: data.imageUrl,
            name: data.name,
            price: data.price,
            varnish: selectedVarnish
        };

        // Verification de la présence d'un produit dans le local Storage pour le parse
        const verification = localStorage.getItem("Produit");
        if (verification != null) {
            products = JSON.parse(verification);
        }

        // Push et stringify d'un produit
        products.push(objet);
        localStorage.setItem("Produit", JSON.stringify(products));

        // Redirection vers la page panier
        window.location.href = "page_panier.html";
    })
}
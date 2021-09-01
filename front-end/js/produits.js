// // Récupération de l'id du produit qui se trouve dans l'URL
// const urlParams = new URLSearchParams(window.location.search);
// const id = urlParams.get('id');

// // Création de la fonction "API" qui va fetcher et stocker la réponse du fetch
// function API_id() {
//     return fetch(`http://localhost:3000/api/furniture/${id}`)
//         .then((response) => {
//             return response.json();
//         })

//         // Utilisation de la réponse pour afficher du contenu
//         .then(function (data) {

//             // Injection du HTML et des produits via JS de façon dynamique
//             let plan = document.getElementById("produits");
//             let varnishHtml = "";

//             for (let i = 0; i < data.varnish.length; i++) {
//                 varnishHtml += `<option value="choix">${data.varnish[i]}</option>`
//             }

//             plan.innerHTML += `<div class="produits-page" id="produits-page">
//                 <img class="produits__img" src="${data.imageUrl}" alt="Image de ${data.name}">
//                 <div class="produits__name">${data.name}</div>
//                 <div class="produits__description">${data.description}</div>
//                 <div class="produits__price">${(data.price/100).toFixed(2)} €</div>

//                 <form class="produits__varnish__select">
//                 <select id="select">
//                 <option>-- Choisissez un vernis --${varnishHtml}</option>
//                 </select>
//                 </form>

//                 <form><button class="bouton-panier">Ajouter au panier</button></form>
//                 </div>`;
//         })

//         // Affichage d'un message d'erreur si la réponse du server ne se fait pas
//         .catch(error => alert("Erreur : " + error));
// }

// // Utilisation de la fonction "API"
// API_id();



const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

function API_id() {
    return fetch(`http://localhost:3000/api/furniture/${id}`)
        .then((response) => {
            return response.json();
        })

        .catch(error => alert("Erreur : " + error));
}

let plan = document.getElementById("produits");
let varnishHtml = "";

getAPI_id()
    .then(varnish => {
        for (const choixVernis of varnish) {
            plan.innerHTML += getProductTemplate(choixVernis);
        }
    })

function getVarnishTemplate(choixVernis) {

    let varnish = [...choixVernis.varnish]; // Ca sert surement à rien ;)

    return `<div class="produits-page" id="produits-page">
            <img class="produits__img" src="${choixVernis.imageUrl}" alt="Image de ${choixVernis.name}">
            <div class="produits__name">${choixVernis.name}</div>
            <div class="produits__description">${choixVernis.description}</div>
            <div class="produits__price">${(choixVernis.price/100).toFixed(2)} €</div>
            
            <form class="produits__varnish__select">
            <select id="select">
            <option>-- Choisissez un vernis --${varnishHtml}</option>
            </select>
            </form>

            <form><button class="bouton-panier">Ajouter au panier</button></form>
            </div>`;
}
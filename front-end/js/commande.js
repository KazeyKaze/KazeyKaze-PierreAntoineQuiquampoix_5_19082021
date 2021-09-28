// Récupération des informations du localStorage pour le parse
let prix = localStorage.getItem("Prix total");
prix = JSON.parse(prix);
let formulaire = localStorage.getItem("Formulaire");
formulaire = JSON.parse(formulaire);
let produits = localStorage.getItem("Produit");
produits = JSON.parse(produits);

// Récupération de l'ID des produits
let produitsId = [];

produits.forEach(element => {
    produitsId.push(element.id)
})

// Envoi des données au server pour récupérer l'id de la commande




// Affichage du prix et de l'ID de la commande
let planPrice = document.getElementById("prix-total");

function getPriceTemplate(prix) {
    return `<div class="prix-total__paragraphe">Prix total de votre commande:</div>
        <div class="prix-total__price">${prix} €</div>
        <div class="prix-total__paragraphe">Identifiant de votre commande</div>
        <div class="prix-total__price">1540051-6524625ds-65sd4f654s</div>`;
}
planPrice.innerHTML += getPriceTemplate(prix);




/////////////////////////////////////
// Exemple pour obtenir l'order ID //
/////////////////////////////////////

// POST http://localhost:3000/api/furnitures/order
// Content-Type: application/json

// {
//     "contact": {
//         "firstName": "hioj",
//         "lastName": "hioj",
//         "email": "hioj",
//         "address": "hioj",
//         "city": "hioj"
//     }, 
//     "products": [
//         "5beaabe91c9d440000a57d96",
//         "5beaabe91c9d440000a57d96"
//     ]
// }

/////////////////////////////////////

/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */

/////////////////////////////////////
//////////////// FIN ////////////////
/////////////////////////////////////
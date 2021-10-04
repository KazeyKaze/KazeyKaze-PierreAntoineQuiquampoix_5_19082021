// Fonction qui fetch les données des produits "furniture"
function getProducts() {

    // Précision de l'URL à fetch
    return fetch("http://localhost:3000/api/furniture")

        // Si il y a une réponse, je transforme la réponse en format JSON
        .then((response) => {
            return response.json();
        })
        
        // Si il n'y a pas de réponse, je renvoi un message d'erreur
        .catch(error => alert("Erreur : " + error));
    }
    


// Je cible un id HTML pour injecter du contenu à l'intérieur
let plan = document.getElementById("produits");



// Fonction qui contient le code HTML et les données que je veux injecter
function getProductTemplate(product) {

    // Variable qui me sert à concaténer les vernis afin de les afficher proprement
    let varnish = [...product.varnish];

    // Plan HTML et données qui seront injectées
    return `<a href="/front-end/html/page_produit.html?id=${product._id}">
            <div class="produits" id="produits__">
            <img class="produits__img" src="${product.imageUrl}" alt="Image de ${product.name} ">
            <div class="produits__name">${product.name}</div>
            <div class="produits__description">${product.description}</div>
            <div class="produits__price">${(product.price/100)} €</div>
            <div class="produits__varnish">${varnish.join (" / ")}</div>
            </div>
            </a>`
}



// Appel de la fonction qui fetch les données des produits "furniture"
getProducts()

    // Pour chaque produit contenu dans les produits
    .then(products => {
        for (const product of products) {

            // J'applique le plan HTML
            plan.innerHTML += getProductTemplate(product);
        }
    })
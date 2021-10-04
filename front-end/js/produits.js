// Constante qui contient les paramètres de l'URL
const urlParams = new URLSearchParams(window.location.search);

// Constante qui cible le paramètre "id" de l'URL
const id = urlParams.get('id');



// Fonction qui fetch une URL en lui rajoutant l'"id"
function API_id() {

    // Fetch de l'URL avec l'"id" puis tranformation de la réponse au format JSON
    return fetch(`http://localhost:3000/api/furniture/${id}`)
        .then((response) => {
            return response.json();
        })

        // Si il n'y a pas de réponse, je renvoi un message d'erreur
        .catch(error => alert("Erreur : " + error));
}



// Je cible un id HTML pour injecter du contenu à l'intérieur
let plan = document.getElementById("produits");



// Fonction qui contient le code HTML et les données que je veux injecter
function getVarnishTemplate(data, varnishes) {

    // Plan HTML et données qui seront injectées
    return `<div class="produits-page" id="produits-page">
            <img class="produits__img" src="${data.imageUrl}" alt="Image de ${data.name}">
            <div class="produits__name">${data.name}</div>
            <div class="produits__description">${data.description}</div>
            <div class="produits__price">${(data.price/100)} €</div>
            <div class="produits__varnish__select">
            <select id="select">${varnishes}</select></div>
            <button class="bouton-panier" id="bouton-panier">Ajouter au panier</button>
            </div>`;
}



// Appel de la fonction qui fetch les données du produit sélectionné et qui
// me permet d'ajouter chaque vernis comme choix et d'appliquer le plan HTML pour chaque produit
API_id()
    .then(data => {
        
        // Variable qui me sert de container pour stocker les vernis
        let varnishes = "";

        // Pour chaque vernis des vernis un choix est rajoutée dans le "select"
        for (const varnish of data.varnish) {
            varnishes += `<option>${varnish}</option>`;
        }

        // J'applique le plan HTML
        plan.innerHTML += getVarnishTemplate(data, varnishes);
        ajoutPanier(data);
    })

// Fonction qui me permet l'ajout du produit dans le local storage
function ajoutPanier(product) {

    // Constante qui cible un id HTML pour l'utiliser plus simplement
    const boutonPanier = document.getElementById("bouton-panier");

    // Fonction qui me permet de mettre dans un tableau les données d'un produit si je clic sur un bouton
    boutonPanier.addEventListener('click', () => {

        // Variable qui contient un tableau vide qui contiendra les données du produit
        let basket = [];
        
        // Constante qui cible le "select" pour l'utiliser plus simplement
        const selectId = document.getElementById("select");
        
        // Constante qui contient la valeur sélectionnée du "select" des vernis
        const selectedVarnish = selectId.value;
        
        // Variable qui contient un objet contenant les données d'un produit
        let objet = {
            id: product._id,
            image: product.imageUrl,
            name: product.name,
            price: product.price,
            varnish: selectedVarnish
        };
        
        // Variable qui cible la clé "Produit" dans le local storage
        const verification = localStorage.getItem("Produit");
        
        // Si la clé "Produit" existe les données sont parsées dans le tableau "basket" afin d'éviter d'écraser les autres produits
        if (verification != null) {
            basket = JSON.parse(verification);
        }
        
        // Push des données du produit dans le tableau "basket"
        basket.push(objet);
        
        // J'injecte dans la clé "Produit" les données strigifiées du tableau "basket"
        localStorage.setItem("Produit", JSON.stringify(basket));
        
        // Redirection vers la page panier
        window.location.href = "page_panier.html";
    })
}
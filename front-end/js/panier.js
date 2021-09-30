// Variable qui contient les données "Produit" du local storage
let basket = localStorage.getItem("Produit");

// Je parse ces données
basket = JSON.parse(basket);

// Variable qui contient un tableau vide qui contiendra les id des produits
let produitsId = [];

// Si "basket" existe pour chaque élément de "basket" je push l'id dans le tableau "produitsId"
if (basket != null) {
    basket.forEach(element => {
        produitsId.push(element.id)
    })
}

// Chaque nouvel id push dans "produitsId" est unique
produitsId = [...new Set(produitsId)];


// Je cible un id HTML pour injecter du contenu à l'intérieur
let plan = document.getElementById("produits");

// Si "basket" existe, j'injecte du HTML pour chaque produit qu'il contient
if (basket != null) {
    for (let i = 0; i < basket.length; i++) {


        // Fonction qui contient le code HTML et les données que je veux injecter 
        function getBasketTemplate(basket) {
            return `<div class="produits-page" id="produits-page">
            <img class="produits__img" src="${basket[i].image}" alt="Image de ${basket[0]}">
            <div class="produits__name">${basket[i].name}</div>
            <div class="produits__price">${(basket[i].price/100)} €</div>
            <div class="produits__varnish__selected">${basket[i].varnish}</div>`;
        }

        // J'applique le plan HTML
        plan.innerHTML += getBasketTemplate(basket);
    }
}



// Variable qui contient une valeur null
let totalPrice = 0;

// Je cible un id HTML pour injecter du contenu à l'intérieur
let planPrice = document.getElementById("prix-total");

// Si "basket" n'est pas null j'additionne le prix de chaque produit qu'il contient
if (basket != null) {
    for (let i = 0; i < basket.length; i++) {
        totalPrice = totalPrice + basket[i].price / 100;

        // Fonction qui contient le code HTML et les données que je veux injecter
        function getPriceTemplate(totalPrice) {

            // J'injecte le prix dans le HTML
            return `<div class="prix-total__paragraphe">Prix total de votre commande:</div>
                <div class="prix-total__price">${totalPrice} €</div>`;
        }
    }

    // J'applique le plan HTML
    planPrice.innerHTML += getPriceTemplate(totalPrice);
}

// Validation de l'adresse mail via des regex
var ev = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
var x = document.getElementById("check-mail");

function validate(email) {
    if (!ev.test(email)) {
        x.innerHTML = "Not a valid email";
        x.style.color = "red"
    } else {
        x.innerHTML = "Looks good!";
        x.style.color = "green"
    }
}

// Validation des inputs sauf mail et adresse via des regex
var alpha = "[A-Za-z]";
var numeric = "[0-9]";
var alphanumeric = "[ A-Za-z0-9]";

function onKeyValidate(e, charVal) {
    var keynum;
    var keyChars = /[\x00\x08]/;
    var validChars = new RegExp(charVal);

    if (window.event) {
        keynum = e.keyCode;
    } else if (e.which) {
        keynum = e.which;
    }

    var keychar = String.fromCharCode(keynum);

    if (!validChars.test(keychar) && !keyChars.test(keychar)) {
        return false
    } else {
        return keychar;
    }
}

// Récupération et envoi de l'order id dans le local storage +
// envoi du montant total dans le local storage + changement de page

// Constante qui cible un id HTML pour l'utiliser plus simplement
const boutonCommander = document.getElementById("bouton-commander");

// Je cible les élements du formulaire afin de les utiliser plus facilement
let formulaireElements = document.getElementById("formulaire__input").elements;



// Au clic sur le bouton si un seul des champs du formulaire est vide
// et/ou que l'adresse n'est pas valide j'envoi un message d'erreur
boutonCommander.addEventListener('click', (e) => {
    if (formulaireElements.firstName.value == "" ||
        formulaireElements.lastName.value == "" ||
        formulaireElements.address.value == "" ||
        formulaireElements.city.value == "" ||
        formulaireElements.email.value == "" ||
        x.innerHTML == "Not a valid email") {

        e.preventDefault();
        alert("Le formulaire n'a pas été correctement rempli");

        // Sinon je crée un objet qui stockera toutes les informations du formulaire
    } else {
        e.preventDefault();
        let formulaireRempli = {
            firstName: formulaireElements.firstName.value,
            lastName: formulaireElements.lastName.value,
            address: formulaireElements.address.value,
            city: formulaireElements.city.value,
            email: formulaireElements.email.value
        };

        // Je créer une clé "Prix total" dans laquelle je strigifie la valeur de "totalPrice"
        localStorage.setItem("Prix total", JSON.stringify(totalPrice));

        // Constante qui contient les id des produits dans un tableau et l'objet contact
        const dataPost = {
            products: produitsId,
            contact: formulaireRempli
        };

        // J'eeffectue le POST
        sendData(dataPost)
    }
})



// Fonction qui effectue le POST pour recevoir l'"orderId"
function sendData(data) {
    
    // Je fetch sur l'URL requise et j'utilise la méthode "post"
    return fetch('http://localhost:3000/api/furniture/order', {
            method: 'post',
            headers: {
                'Content-Type': "application/JSON"
            },
            body: JSON.stringify(data)
        })

        // Je transforme la réponse en JSON
        .then(response => response.json())

        // Je stocke la réponse "orderId" dans la clé "Order" du local storage en la stringifiant
        .then(responseParsed => {
            localStorage.setItem("Order", JSON.stringify(responseParsed.orderId));

            // Redirection vers la page de vérification de commande
            window.location.href = "page_commande.html"
        })

        // Si la réponse ne se fait pas j'envoi un message d'erreur
        .catch(error => alert(error))
}
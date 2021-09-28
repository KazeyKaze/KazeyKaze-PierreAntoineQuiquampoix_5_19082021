// Récupération des informations du localStorage pour le parse
let basket = localStorage.getItem("Produit");
basket = JSON.parse(basket);

// Récupération de l'ID des produits
let produitsId = [];

if (basket != null) {
    basket.forEach(element => {
        produitsId.push(element.id)
    })
}
produitsId = [...new Set(produitsId)];

// Création du HTML dynamique selon les informations contenues
// dans le localStorage
let plan = document.getElementById("produits");

if (basket != null) {
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
}

// Calcul et affichage du prix total du panier
let totalPrice = 0;
let planPrice = document.getElementById("prix-total");

if (basket != null) {
    for (let i = 0; i < basket.length; i++) {
        totalPrice = totalPrice + basket[i].price / 100;

        function getPriceTemplate(totalPrice) {
            if (basket != null) {
                return `<div class="prix-total__paragraphe">Prix total de votre commande:</div>
                <div class="prix-total__price">${totalPrice} €</div>`
            } else {
                return `<div class="prix-total__paragraphe">Vous n'avez aucun produit dans votre panier</div>`
            }
        }
    }
    planPrice.innerHTML += getPriceTemplate(totalPrice);
}

// Validation de l'adresse mail
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

// Validation des inputs sauf mail et adresse
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
const boutonCommander = document.getElementById("bouton-commander");
let formulaireElements = document.getElementById("formulaire__input").elements;

boutonCommander.addEventListener('click', (e) => {
    if (formulaireElements.firstName.value == "" ||
        formulaireElements.lastName.value == "" ||
        formulaireElements.address.value == "" ||
        formulaireElements.city.value == "" ||
        formulaireElements.email.value == "" ||
        x.innerHTML == "Not a valid email") {

        e.preventDefault();
        alert("Le formulaire n'a pas été correctement rempli");
    } else {
        e.preventDefault();
        let formulaireRempli = {
            firstName: formulaireElements.firstName.value,
            lastName: formulaireElements.lastName.value,
            address: formulaireElements.address.value,
            city: formulaireElements.city.value,
            email: formulaireElements.email.value
        };
        localStorage.setItem("Prix total", JSON.stringify(totalPrice));
        const dataPost = {
            products: produitsId,
            contact: formulaireRempli
        };
        sendData(dataPost)
    }
})

// 
function sendData(data) {
    return fetch('http://localhost:3000/api/furniture/order', {
            method: 'post',
            headers: {
                'Content-Type': "application/JSON"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseParsed => {
            localStorage.setItem("Order", JSON.stringify(responseParsed.orderId));
            window.location.href = "page_commande.html"
        })
        .catch(error => alert(error))
}
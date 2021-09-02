function getProducts() {
    return fetch("http://localhost:3000/api/furniture")
        .then((response) => {
            return response.json();
        })
        .catch(error => alert("Erreur : " + error));
}


let plan = document.getElementById("produits");
function getProductTemplate(product) {
    let varnish = [...product.varnish];
    return `<a href="/front-end/html/page_produit.html?id=${product._id}">
            <div class="produits" id="produits__">
            <img class="produits__img" src="${product.imageUrl}" alt="Image de ${product.name} ">
            <div class="produits__name">${product.name}</div>
            <div class="produits__description">${product.description}</div>
            <div class="produits__price">${(product.price/100).toFixed(2)} €</div>
            <div class="produits__varnish">${varnish.join (" / ")}</div>
            </div>
            </a>`
}



getProducts()
    .then(products => {
        for (const product of products) {
            plan.innerHTML += getProductTemplate(product);
        }
    })
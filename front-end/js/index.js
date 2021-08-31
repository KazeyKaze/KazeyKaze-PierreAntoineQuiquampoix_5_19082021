let plan = document.getElementById("produits");

getProducts()
    .then(products => {
        for (const product of products) {
            plan.innerHTML += getProductTemplate(product);
        }
    })
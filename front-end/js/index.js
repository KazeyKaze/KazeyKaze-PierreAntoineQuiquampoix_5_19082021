const API = function () {
    fetch("http://localhost:3000/api/furniture")
        .then((response) => {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            let displayImg = document.querySelector(".produits1__img");
            displayImg.src = data[0].imageUrl;

            let displayDescription = document.querySelector(".produits1__description");
            displayDescription.innerHTML = data[0].description;

            let displayName = document.querySelector(".produits1__name");
            displayName.innerHTML = `- ${data[0].name} -`;

            data[0].price = data[0].price / 100;
            let displayPrice = document.querySelector(".produits1__price");
            displayPrice.innerHTML = data[0].price.toFixed(2) + " €";

            let varnish = [...data[0].varnish]
            let displayVarnish = document.querySelector(".produits1__varnish");
            displayVarnish.innerHTML = varnish.join(" / ");

            console.log(data);
        })
        .catch(error => alert("Erreur : " + error));
}

API();
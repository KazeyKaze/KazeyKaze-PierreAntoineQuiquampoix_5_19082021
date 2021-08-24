const API = function () {
    fetch("http://localhost:3000/api/furniture")
        .then(response => {
            let data = response.json();
            console.log(data);
        })
        .catch(error => alert("Erreur : " + error));
}

API();
function getProducts () {
    return fetch("http://localhost:3000/api/furniture")
        .then((response) => {
            return response.json();
        })
        
        .catch(error => alert("Erreur : " + error));
}
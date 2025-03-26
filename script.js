document.getElementById("searchBar").addEventListener("input", function () {
    let searchQuery = this.value.toLowerCase().trim();
    let products = document.querySelectorAll(".product");
    let noResultsMessage = document.getElementById("no-results-message");

    let found = false;

    products.forEach(product => {
        let productName = product.querySelector(".card-title").innerText.toLowerCase();
        let productCategory = product.getAttribute("data-category").toLowerCase();

        if (productName.includes(searchQuery) || productCategory.includes(searchQuery)) {
            product.style.opacity = "1"; 
            product.style.filter = "brightness(1)";
            found = true;
        } else {
            product.style.opacity = "0.5"; 
            product.style.filter = "brightness(0.7)";
        }
    });

    noResultsMessage.style.display = found || searchQuery === "" ? "none" : "block";
});

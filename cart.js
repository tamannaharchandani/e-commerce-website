document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; 
    const cartCount = document.getElementById("cart-count");
    const cartModalBody = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const clearCartBtn = document.getElementById("clear-cart");
    const checkoutBtn = document.getElementById("checkout");

    updateCartUI(); 

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let productName = this.getAttribute("data-name");
            let productPrice = parseFloat(this.getAttribute("data-price"));

            let existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }

            updateCartUI();
        });
    });

    function updateCartUI() {
        cartModalBody.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartModalBody.innerHTML = '<p class="text-muted">Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                let cartItem = document.createElement("div");
                cartItem.classList.add("cart-item", "d-flex", "justify-content-between", "align-items-center", "border-bottom", "py-2");
                cartItem.innerHTML = `
                    <div>
                        <h6>${item.name}</h6>
                        <p>₹${item.price} x <b>${item.quantity}</b></p>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-outline-secondary decrease-qty" data-index="${index}">-</button>
                        <button class="btn btn-sm btn-outline-secondary increase-qty" data-index="${index}">+</button>
                        <button class="btn btn-danger btn-sm remove-item" data-index="${index}"><i class="fa fa-trash"></i></button>
                    </div>
                `;
                cartModalBody.appendChild(cartItem);
            });
        }

        cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0);
        cartTotal.innerText = `₹${total.toLocaleString()}`;

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    cartModalBody.addEventListener("click", function (e) {
        if (e.target.classList.contains("increase-qty")) {
            let index = e.target.getAttribute("data-index");
            cart[index].quantity += 1;
            updateCartUI();
        }

        if (e.target.classList.contains("decrease-qty")) {
            let index = e.target.getAttribute("data-index");
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1); 
            }
            updateCartUI();
        }

        if (e.target.classList.contains("remove-item")) {
            let index = e.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCartUI();
        }
    });


    clearCartBtn.addEventListener("click", function () {
        cart = [];
        updateCartUI();
    });

    checkoutBtn.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            localStorage.setItem("checkoutCart", JSON.stringify(cart));
            window.location.href = "checkout.html";
        }
    });
});

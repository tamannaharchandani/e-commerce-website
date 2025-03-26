document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let checkoutItems = document.getElementById("checkout-items");
    let checkoutTotal = document.getElementById("checkout-total");
    let total = 0;

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {
        checkoutItems.innerHTML = "<p class='text-muted'>Your cart is empty.</p>";
        checkoutTotal.innerText = "₹0";
        return;
    }

    cart.forEach(item => {
        total += item.price * item.quantity;
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("d-flex", "justify-content-between", "border-bottom", "py-2");
        itemDiv.innerHTML = `
            <div>
                <h6 class="fw-bold">${item.name}</h6>
                <p>₹${item.price.toLocaleString()} x <b>${item.quantity}</b></p>
            </div>
            <p class="fw-bold">₹${(item.price * item.quantity).toLocaleString()}</p>
        `;
        checkoutItems.appendChild(itemDiv);
    });

    checkoutTotal.innerText = `₹${total.toLocaleString()}`;
});

document.getElementById("payment-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let cardNumber = document.getElementById("cardNumber").value;
    let expiryDate = document.getElementById("expiryDate").value;
    let cvv = document.getElementById("cvv").value;

    if (!validatePayment(cardNumber, expiryDate, cvv)) {
        alert("Invalid payment details. Please check your information.");
        return;
    }

    let orderDetails = {
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        timestamp: new Date().toISOString()
    };

    localStorage.setItem("lastOrder", JSON.stringify(orderDetails));
    localStorage.removeItem("cart");

    alert("✅ Payment successful! Redirecting to order confirmation.");
    window.location.href = "order-confirmation.html";
});

function validatePayment(cardNumber, expiryDate, cvv) {
    let cardRegex = /^\d{16}$/;
    let expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    let cvvRegex = /^\d{3}$/;

    return cardRegex.test(cardNumber) && expiryRegex.test(expiryDate) && cvvRegex.test(cvv);
}

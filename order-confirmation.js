document.addEventListener("DOMContentLoaded", function () {
    let orderDetails = JSON.parse(localStorage.getItem("lastOrder"));

    if (!orderDetails) {
        document.getElementById("order-items").innerHTML = "<p class='text-muted'>No recent orders found.</p>";
        document.getElementById("order-total").innerText = "₹0";
        return;
    }

    let orderItems = document.getElementById("order-items");
    let orderTotal = document.getElementById("order-total");
    orderItems.innerHTML = "";

    orderDetails.items.forEach(item => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("d-flex", "justify-content-between", "border-bottom", "py-2");
        itemDiv.innerHTML = `
            <div>
                <h6 class="fw-bold">${item.name}</h6>
                <p>₹${item.price.toLocaleString()} x <b>${item.quantity}</b></p>
            </div>
            <p class="fw-bold">₹${(item.price * item.quantity).toLocaleString()}</p>
        `;
        orderItems.appendChild(itemDiv);
    });

    orderTotal.innerText = `₹${orderDetails.total.toLocaleString()}`;
});
    
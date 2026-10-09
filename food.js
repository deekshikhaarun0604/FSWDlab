
let foods = [
    { name: "Pizza", price: 200, stock: 10 },
    { name: "Burger", price: 150, stock: 8 },
    { name: "Biryani", price: 250, stock: 5 },
    { name: "Juice", price: 80, stock: 12 }
];

let cart = [0, 0, 0, 0];
let orders = [];

// Add food
function addToCart(index) {
    if (cart[index] < foods[index].stock) {
        cart[index]++;
        displayCart();
    } else {
        alert("Sorry! No more stock available.");
    }
}

// Calculate total
function getTotal() {
    let total = 0;

    for (let i = 0; i < foods.length; i++) {
        total += cart[i] * foods[i].price;
    }

    return total;
}

// Display cart
function displayCart() {
    let output = "";
    let count = 0;

    for (let i = 0; i < foods.length; i++) {
        if (cart[i] > 0) {
            count += cart[i];

            output += `
                <div class="cart-item">
                    <h3>${foods[i].name}</h3>
                    <p>₹${foods[i].price} each</p>
                    <button onclick="changeQuantity(${i}, -1)">−</button>
                    ${cart[i]}
                    <button onclick="changeQuantity(${i}, 1)">+</button>
                    <button onclick="removeItem(${i})">Remove</button>
                </div>
            `;
        }
    }

    document.getElementById("cartItems").innerHTML =
        output || "Your cart is empty.";

    document.getElementById("total").innerHTML =
        "Total: ₹" + getTotal();

    document.getElementById("cartCount").innerHTML = count;
    document.getElementById("cartCount2").innerHTML = count;
}

// Change quantity
function changeQuantity(index, amount) {
    if (amount > 0 && cart[index] >= foods[index].stock) {
        alert("Stock limit reached!");
        return;
    }

    cart[index] += amount;

    if (cart[index] < 0) {
        cart[index] = 0;
    }

    displayCart();
}

// Remove item
function removeItem(index) {
    cart[index] = 0;
    displayCart();
}

// Open checkout
function showPayment() {
    if (getTotal() === 0) {
        alert("Please add food to your cart!");
        return;
    }

    document.getElementById("bill").innerHTML =
        "Your total bill is ₹" + getTotal();

    document.getElementById("payment").style.display = "block";
    document.getElementById("payment").scrollIntoView();
}

// Back to cart
function backToCart() {
    document.getElementById("payment").style.display = "none";
    document.getElementById("cartSection").scrollIntoView();
}

// Place order
function placeOrder() {
    let address = document.getElementById("address").value.trim();
    let method = document.getElementById("method").value;

    if (address === "") {
        alert("Please enter your delivery address!");
        return;
    }

    // Check stock before ordering
    for (let i = 0; i < foods.length; i++) {
        if (cart[i] > foods[i].stock) {
            alert("Not enough stock for " + foods[i].name);
            return;
        }
    }

    let details = [];

    for (let i = 0; i < foods.length; i++) {
        if (cart[i] > 0) {
            details.push(foods[i].name + " x " + cart[i]);
        }
    }

    // Reduce stock
    for (let i = 0; i < foods.length; i++) {
        foods[i].stock -= cart[i];

        document.getElementById("stock" + i).innerHTML =
            foods[i].stock;
    }

    // Save order
    orders.push({
        items: details.join(", "),
        total: getTotal(),
        address: address,
        method: method
    });

    displayOrders();

    cart = [0, 0, 0, 0];
    displayCart();

    document.getElementById("payment").style.display = "none";
    document.getElementById("address").value = "";

    alert("Order placed successfully!");

    document.getElementById("orders").scrollIntoView();
}

// Display order history
function displayOrders() {
    let output = "";

    for (let i = 0; i < orders.length; i++) {
        output += `
            <div class="order-item">
                <h3>📦 Order #${i + 1}</h3>
                <p>${orders[i].items}</p>
                <h3>Total: ₹${orders[i].total}</h3>
                <p>Delivery: ${orders[i].address}</p>
                <p>Payment: ${orders[i].method}</p>
                <p>Status: Order Placed</p>
            </div>
        `;
    }

    document.getElementById("orderList").innerHTML =
        output || "No orders yet. Order something delicious!";
}

// Start the website
displayCart();

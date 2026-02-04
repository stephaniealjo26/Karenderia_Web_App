// ===============================
// STUDENT 2 – MENU MANAGEMENT
// ===============================

const menuItems = [
    { name: "Chicken Adobo", price: 50, category: "ulam" },
    { name: "Pork Adobo", price: 60, category: "ulam" },
    { name: "Sinigang na Baboy", price: 70, category: "ulam" },
    { name: "Tinola", price: 65, category: "ulam" },
    { name: "Kare-Kare", price: 80, category: "ulam" },
    { name: "Bistek Tagalog", price: 75, category: "ulam" },

    { name: "Plain Rice", price: 15, category: "rice" },
    { name: "Fried Rice", price: 25, category: "rice" },

    { name: "Lumpiang Shanghai", price: 10, category: "snacks" },
    { name: "Tokwa't Baboy", price: 45, category: "snacks" },
    { name: "Chopsuey", price: 50, category: "snacks" },

    { name: "Iced Tea", price: 20, category: "drinks" },
    { name: "Soft Drinks", price: 25, category: "drinks" }
];

const menuContainer = document.getElementById("menu-container");
const menuCount = document.getElementById("menu-count");
const categoryFilter = document.getElementById("category-filter");

// Render menu
function displayMenu(items) {
    menuContainer.innerHTML = "";

    items.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "d-flex justify-content-between align-items-center border rounded p-2 mb-2";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small class="text-muted">
                    ₱${item.price} • ${item.category.toUpperCase()}
                </small>
            </div>
            <button class="btn btn-sm btn-primary" onclick="addToOrder(${index})">
                Add
            </button>
        `;

        menuContainer.appendChild(div);
    });

    menuCount.textContent = items.length;
}

// Filter menu
categoryFilter.addEventListener("change", () => {
    const category = categoryFilter.value;

    if (category === "all") {
        displayMenu(menuItems);
    } else {
        const filtered = menuItems.filter(item => item.category === category);
        displayMenu(filtered);
    }
});

// Initial menu load
displayMenu(menuItems);

// ===============================
// STUDENT 4 – DAILY SALES SUMMARY
// ===============================

function loadDailySalesSummary() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    let totalOrders = orders.length;
    let totalSales = 0;

    orders.forEach(order => {
        totalSales += order.total;
    });

    document.getElementById("total-orders").textContent = totalOrders;
    document.getElementById("total-sales").textContent = totalSales.toFixed(2);
}

// ===============================
// ORDERS LIST DISPLAY
// ===============================

function displayOrdersList() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const ordersList = document.getElementById("orders-list");

    ordersList.innerHTML = "";

    if (orders.length === 0) {
        ordersList.innerHTML = `<li class="list-group-item text-muted fst-italic">No orders yet.</li>`;
        return;
    }

    orders.forEach((order, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            <div>
                Order #${index + 1}: ${order.items.join(", ")}
            </div>
            <span>₱${order.total.toFixed(2)}</span>
        `;

        ordersList.appendChild(li);
    });
}

// ===============================
// ADD TO ORDER (with live updates)
// ===============================

function updateOrdersUI() {
    loadDailySalesSummary();
    displayOrdersList();
}

function addToOrder(index) {
    const item = menuItems[index];
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
        items: [item.name],
        total: item.price
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    updateOrdersUI();
}

// Initial load
document.addEventListener("DOMContentLoaded", () => {
    updateOrdersUI();
});

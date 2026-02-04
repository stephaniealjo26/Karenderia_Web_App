
const menuItems = [
// ===============================
// STUDENT 2 – MENU MANAGEMENT
// ===============================

// Expanded menu with categories
const menuItems = [
    // Ulam
    { name: "Chicken Adobo", price: 50, category: "ulam" },
    { name: "Pork Adobo", price: 60, category: "ulam" },
    { name: "Sinigang na Baboy", price: 70, category: "ulam" },
    { name: "Tinola", price: 65, category: "ulam" },
    { name: "Kare-Kare", price: 80, category: "ulam" },
    { name: "Bistek Tagalog", price: 75, category: "ulam" },

    { name: "Plain Rice", price: 15, category: "rice" },
    { name: "Fried Rice", price: 25, category: "rice" },

    // Rice
    { name: "Plain Rice", price: 15, category: "rice" },
    { name: "Fried Rice", price: 25, category: "rice" },

    // Snacks / Extras
    { name: "Lumpiang Shanghai", price: 10, category: "snacks" },
    { name: "Tokwa't Baboy", price: 45, category: "snacks" },
    { name: "Chopsuey", price: 50, category: "snacks" },

    // Drinks
    { name: "Iced Tea", price: 20, category: "drinks" },
    { name: "Soft Drinks", price: 25, category: "drinks" }
];

const menuContainer = document.getElementById("menu-container");
const menuCount = document.getElementById("menu-count");

// Render menu items
function displayMenu(items) {
    menuContainer.innerHTML = "";

    items.forEach((item, index) => {
        const menuItem = document.createElement("div");
        menuItem.className =
            "d-flex justify-content-between align-items-center border rounded p-2 mb-2";

        menuItem.innerHTML = `
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

        menuContainer.appendChild(menuItem);
    });

    menuCount.textContent = items.length;
}

displayMenu(menuItems);
// Initial load
displayMenu(menuItems);

// ============================
// ORDER MANAGEMENT
// ============================

// Get the Current Order card container
const orderContainer = document.getElementById("order-container");

// Variables to store orders and total price
let currentOrder = [];
let totalPrice = 0;

// Function to add an item to the order
function addOrder(item, price) {
  currentOrder.push({ item, price });
  totalPrice += price;
  renderOrder();
}

// Function to render the current order
function renderOrder() {
  orderContainer.innerHTML = ""; // Clear previous content

  if (currentOrder.length === 0) {
    orderContainer.innerHTML = `<p class="text-muted">No items selected.</p>`;
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "list-group";

  currentOrder.forEach(order => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = order.item;

    const span = document.createElement("span");
    span.textContent = `₱${order.price}`;
    li.appendChild(span);

    ul.appendChild(li);
  });

  orderContainer.appendChild(ul);

  // Total price display
  const totalDiv = document.createElement("p");
  totalDiv.className = "mt-2 fw-bold";
  totalDiv.textContent = `Total: ₱${totalPrice}`;
  orderContainer.appendChild(totalDiv);
}

// ============================
// CONNECT MENU ITEMS TO ORDERS
// ============================

// Select all menu item divs in the menu container
const menuContainerDivs = document.getElementById("menu-container").querySelectorAll("div");

menuContainerDivs.forEach((div, index) => {
  div.style.cursor = "pointer"; // Make it look clickable
  div.addEventListener("click", () => {
    const item = menuItems[index];
    addOrder(item.name, item.price);
  });
});


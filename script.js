
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

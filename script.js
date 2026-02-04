const menuItems = [
    { name: "Chicken Adobo", price: 50, category: "ulam" },
    { name: "Pork Adobo", price: 60, category: "ulam" },
    { name: "Sinigang na Baboy", price: 70, category: "ulam" },
    { name: "Plain Rice", price: 15, category: "rice" },
    { name: "Fried Rice", price: 25, category: "rice" },
    { name: "Lumpiang Shanghai", price: 10, category: "snacks" },
    { name: "Iced Tea", price: 20, category: "drinks" },
    { name: "Soft Drinks", price: 25, category: "drinks" }
];

let currentOrder = JSON.parse(localStorage.getItem("activeOrder")) || [];

function displayMenu() {
    const ulamCont = document.getElementById("ulam-container");
    const riceSnackCont = document.getElementById("rice-snacks-container");
    const drinksCont = document.getElementById("drinks-container");
    if(!ulamCont) return;

    menuItems.forEach((item, index) => {
        const html = `
            <div class="d-flex justify-content-between align-items-center border-bottom py-3 mb-2">
                <div><h6 class="mb-0 fw-bold">${item.name}</h6><small class="text-muted text-uppercase">${item.category}</small></div>
                <div class="d-flex align-items-center">
                    <span class="price-text me-3">₱${item.price}</span>
                    <button class="btn btn-sm btn-outline-success" onclick="addToTray(${index})">+</button>
                </div>
            </div>`;
        if (item.category === "ulam") ulamCont.innerHTML += html;
        else if (item.category === "rice" || item.category === "snacks") riceSnackCont.innerHTML += html;
        else if (item.category === "drinks") drinksCont.innerHTML += html;
    });
    document.getElementById("menu-count").innerText = menuItems.length;
}

function addToTray(index) {
    currentOrder.push(menuItems[index]);
    localStorage.setItem("activeOrder", JSON.stringify(currentOrder));
    alert(menuItems[index].name + " added!");
}

function updateOrderUI() {
    const list = document.getElementById("order-list");
    if (!list) return;
    list.innerHTML = currentOrder.map(item => `<div class="d-flex justify-content-between py-2 border-bottom"><span>${item.name}</span><b>₱${item.price}</b></div>`).join("");
    document.getElementById("total-price").innerText = currentOrder.reduce((s, i) => s + i.price, 0);
}

function confirmOrder() {
    if (currentOrder.length === 0) return alert("Tray empty!");
    let sales = JSON.parse(localStorage.getItem("salesData")) || { total: 0, count: 0 };
    sales.total += currentOrder.reduce((s, i) => s + i.price, 0);
    sales.count += 1;
    localStorage.setItem("salesData", JSON.stringify(sales));
    localStorage.removeItem("activeOrder");
    alert("Success!");
    window.location.href = "sales.html";
}

function resetSales() { localStorage.removeItem("salesData"); location.reload(); }

document.addEventListener("DOMContentLoaded", () => {
    displayMenu();
    updateOrderUI();
    if(document.getElementById("sales-total")) {
        const s = JSON.parse(localStorage.getItem("salesData")) || { total: 0, count: 0 };
        document.getElementById("sales-total").innerText = s.total;
        document.getElementById("sales-count").innerText = s.count;
    }
});

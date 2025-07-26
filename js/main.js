// -------- Sidebar Toggle --------
document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("active");
  document.getElementById("main-content").classList.toggle("shifted");
});


// -------- Smooth Scroll --------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


// -------- Delivery / Pickup Toggle --------
document.getElementById('btn-delivery').addEventListener('click', function () {
  this.classList.add('active');
  document.getElementById('btn-pickup').classList.remove('active');
});

document.getElementById('btn-pickup').addEventListener('click', function () {
  this.classList.add('active');
  document.getElementById('btn-delivery').classList.remove('active');
});


// -------- Theme Toggle (Day/Night) --------
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("day-mode");
  body.classList.toggle("night-mode");

  themeToggle.innerText = 
  (themeToggle.innerText === "🌙") ? "☀️" : "🌙";
});


const foodItems = [
  {
    name: "Zinger Burger",
    price: "Rs. 750",
    desc: "Spicy, crispy & delicious!",
    image: "https://www.kfcpakistan.com/images/65428500-ea56-11ef-bf82-75f537a23a2b-Mighty_variant_0-2025-02-13220345.png"
  },
  {
    name: "Krunch Burger with Cold Drink",
    price: "Rs. 1050",
    desc: "Affordable & tasty",
    image: "images/krunch burger.png"
  },
  {
    name: "Family Festival 3",
    price: "Rs. 2500",
    desc: "Enough for the family",
    image: "images/family-festival-3.png"
  },
  {
    name: "KFC Meal",
    price: "Rs. 1500",
    desc: "Enjoy with KFC",
    image: "https://www.kfcpakistan.com/images/63fb28b0-9627-11ef-b5b6-331c16c28159-CrispyDuoBox-2024-10-29185539.png"
  },
  {
    name: "Bucket",
    price: "Rs. 1750",
    desc: "Enjoy our KFC Bucket",
    image: "https://www.kfcpakistan.com/images/0fdf6a30-51f6-11f0-8a81-2bca8fac3701-1-min-2025-06-25185611.png"
  },
  {
    name: "Promotions",
    price: "Rs. 2050",
    desc: "Our new Promotions",
    image: "images/newone.png"
  }
];


// -------- Render Food Items --------
const foodContainer = document.getElementById("food-container");

foodItems.forEach(item => {
  const card = `
    <div class="col-md-4">
      <div class="card product-item">
        <img src="${item.image}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text fw-bold text-dark">${item.price}</p>
          <p class="card-text">${item.desc}</p>
          <a href="#" class="btn btn-danger">Order Now</a>
        </div>
      </div>
    </div>
  `;
  foodContainer.innerHTML += card;
});


// -------- Sticky Header on Scroll --------
window.addEventListener('scroll', () => {
  const header = document.getElementById('kfc-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


// -------- Search Function --------
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const productItems = document.querySelectorAll(".product-item");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = searchInput.value.toLowerCase();

      productItems.forEach(function (item) {
        const title = item.querySelector(".card-title").textContent.toLowerCase();

        if (title.includes(query)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  }
});


// -------- Show Order Modal --------
document.addEventListener("click", function (e) {
  if (e.target.matches('.product-item .btn-danger')) {
    e.preventDefault();

    const card = e.target.closest('.card');
    const title = card.querySelector('.card-title').textContent;
    const price = card.querySelector('.card-text.fw-bold').textContent;

    document.getElementById('modalItemName').textContent = title;
    document.getElementById('modalItemPrice').textContent = price;

    const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
    orderModal.show();
  }
});


// -------- Confirm Order Button --------
document.getElementById('confirmOrderBtn').addEventListener('click', function () {
  alert("✅ Order confirmed! Thank you for ordering.");

  const modal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
  modal.hide();

  const badge = document.querySelector('.badge');
  if (badge) {
    let count = parseInt(badge.textContent);
    badge.textContent = count + 1;
  }
});
// --- Cart Items Initialization ---
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const badge = document.querySelector('.badge');
const cartBody = document.getElementById('cart-body');
const viewCartModal = new bootstrap.Modal(document.getElementById('viewCartModal'));

// --- Update Cart Badge ---
function updateBadge() {
  badge.textContent = cartItems.length;
}

// --- Save to localStorage ---
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

// --- Render Cart in Modal ---
function renderCart() {
  cartBody.innerHTML = '';

  if (cartItems.length === 0) {
    cartBody.innerHTML = '<p class="text-center">Cart is empty 🪣</p>';
    return;
  }

  cartItems.forEach((item, index) => {
    cartBody.innerHTML += `
      <div class="d-flex justify-content-between align-items-center border-bottom py-2">
        <div>${index + 1}. ${item.name} - ${item.price}</div>
        <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Delete</button>
      </div>
    `;
  });

  cartBody.innerHTML += `
    <div class="text-end mt-3">
      <button class="btn btn-outline-danger btn-sm" onclick="clearCart()">Clear Cart</button>
    </div>
  `;
}

// --- Add to Cart ---
function addToCart(name, price) {
  cartItems.push({ name, price });
  saveCart();
  updateBadge();
}

// --- Remove Item by Index ---
function removeItem(index) {
  cartItems.splice(index, 1);
  saveCart();
  updateBadge();
  renderCart();
}

// --- Clear Entire Cart ---
function clearCart() {
  cartItems = [];
  saveCart();
  updateBadge();
  renderCart();
}

// --- Show Cart on Button Click ---
document.getElementById('btn-badge').addEventListener('click', () => {
  renderCart();
  viewCartModal.show();
});

// --- Also allow cart icon click to open modal ---
document.querySelector('.bi-bucket-fill').addEventListener('click', () => {
  renderCart();
  viewCartModal.show();
});

// --- Add item on confirm order ---
document.getElementById('confirmOrderBtn').addEventListener('click', () => {
  const name = document.getElementById('modalItemName').textContent;
  const price = document.getElementById('modalItemPrice').textContent;
  addToCart(name, price);

  alert("✅ Order Confirmed!");
  const orderModal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
  orderModal.hide();
});

// --- On Load ---
window.addEventListener("DOMContentLoaded", () => {
  updateBadge();
});
// ✅ Add This In Your HTML
// Make sure your modal has this structure inside #cart-body:

// html
// Copy
// Edit
// <div class="modal-body" id="cart-body">
//   <!-- Items injected here -->
// </div>
//--- Model open+ populate---

document.querySelector('.bi-bucket-fill').addEventListener('click', function () {
  const cartBody = document.getElementById('cart-body');
  cartBody.innerHTML = '';

  if (cartItems.length === 0) {
    cartBody.innerHTML = '<p class="text-center">Cart is empty 🪣</p>';
  } else {
    cartItems.forEach((item, index) => {
      cartBody.innerHTML += `
        <div class="d-flex justify-content-between border-bottom py-2">
          <div>${index + 1}. ${item.name}</div>
          <div>${item.price}</div>
        </div>
      `;
    });
  }

  const cartModal = new bootstrap.Modal(document.getElementById('viewCartModal'));
  cartModal.show();
});


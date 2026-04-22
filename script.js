// Food Delivery App - Complete JavaScript Functionality

// Data
const restaurants = [
  { 
    id: 1,
name: "Pizza Hub",
cuisine: "Italian",
    rating: 4.5, 
location: "KIIT Square",
img: "pizza hub.jpg",
    menu: [
      { id: 'p1', name: 'Margherita Pizza', price: 12.99, img: 'margherita-pizza-resize-8-1.jpg' },
      { id: 'p2', name: 'Pepperoni Pizza', price: 14.99, img: 'pepperoni_620x350_61517464056.webp' },
      { id: 'p3', name: 'Pasta Carbonara', price: 10.99, img: 'Pasta-Carbonara-Recipe.jpg' }
    ]
  },
  { 
    id: 2,
name: "Biryani House",
cuisine: "Indian",
    rating: 4.2, 
location: "Saheed Nagar",
img: "biryani-house-logo-vector.jpg",
    menu: [
      { id: 'b1', name: 'Chicken Biryani', price: 11.99, img: 'chicken-hyderabadi-biryani-01.jpg' },
      { id: 'b2', name: 'Veg Biryani', price: 9.99, img: 'easy-vegetable-biryani.jpg' },
      { id: 'b3', name: 'Butter Naan', price: 3.99, img: 'Butter-Naan-3.jpg' }
    ]
  },
  { 
    id: 3,
name: "Burger King",
cuisine: "Fast Food",
    rating: 4.0, 
location: "Patia",
img: "Burger_King-Logo.wine.png",
    menu: [
      { id: 'bk1', name: 'Burger', price: 8.99, img: 'whopper-cheese.png' },
      { id: 'bk2', name: 'Cheese Fries', price: 4.99, img: 'Copycat-McDonalds-French-Fries-.jpg' },
      { id: 'bk3', name: 'Coke', price: 2.49, img: 'coke-458464735-612x612.jpg' }
    ]
  }
];

// State
let currentUser = null;
let currentLocation = 'Bhubaneswar';
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentRestaurant = null;

// Utils
function getStars(rating) {
  return '⭐'.repeat(Math.floor(rating));
}

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || null;
}

function isLoggedIn() {
  return !!loadFromStorage('currentUser');
}

function requireLogin() {
  if (!isLoggedIn()) {
    alert('Please login first!');
    window.location.href = 'login.html';
    return false;
  }
  return true;
}


function getCurrentRestaurant() {
  const id = parseInt(sessionStorage.getItem('currentRestaurantId'));
  return restaurants.find(r => r.id === id) || restaurants[0];
}

// Function to put the items on the screen
// Removed broken displayMenu stub - use main one below

// Removed duplicate goHome


// Stub for your header loading
// Removed stub - use main loadHeader below


// Header injection
function loadHeader() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = `
      <header class="header">
        <div class="header-content">
          <div class="logo">🍕 FoodDelivery</div>
          <div class="nav-right">
            <div class="location-btn" onclick="detectLocation()">
              📍 ${currentLocation}
            </div>
            <div class="search-bar">
              <span class="search-icon">🔍</span>
              <input type="text" class="search-input" id="search-input" placeholder="Search restaurants..." oninput="searchRestaurants()">
            </div>
            <button class="cart-btn" onclick="window.location.href='cart.html'">
              🛒
              <span class="cart-count" id="cart-count" style="display: ${cart.length ? 'flex' : 'none'}">${cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </button>
            ${isLoggedIn() ? 
              `<div class="auth-links"><span>👋 ${loadFromStorage('currentUser').name}</span> <a href="#" onclick="logout()">Logout</a></div>` :
              `<div class="auth-links"><a href="login.html">Login</a> | <a href="signup.html">Signup</a></div>`
            }
          </div>
        </div>
      </header>
    `;
  }
}


// Search & Filter
function searchRestaurants() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const filtered = restaurants.filter(r => 
    r.name.toLowerCase().includes(query) || 
    r.cuisine.toLowerCase().includes(query)
  );
  displayRestaurants(filtered);
}

function filterRestaurantsByLocation() {
  const filtered = restaurants.filter(r => r.location === currentLocation);
  displayRestaurants(filtered);
}

// Display Restaurants (index.html)
function displayRestaurants(list) {
  const container = document.getElementById("cardContainer") || document.getElementById("restaurant-container");
  if (container) {
    container.innerHTML = list.map(r => `
      <div class="card" onclick="viewMenu(${r.id})">
        <img src="./${r.img}" alt="${r.name}" loading="lazy">
        <div class="card-content">
          <h3>${r.name}</h3>
          <p>${r.cuisine} • ${r.location}</p>
          <p>${getStars(r.rating)} (${r.rating})</p>
        </div>
      </div>
    `).join('');
  }
}

// Auth functions
function signup() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password || password.length < 6) {
    alert('Please fill all fields. Password must be at least 6 chars.');
    return;
  }

  const users = loadFromStorage('users') || [];
  if (users.find(u => u.email === email)) {
    alert('Email already registered!');
    return;
  }

  const user = { name, email, password };
  users.push(user);
  saveToStorage('users', users);
  
  currentUser = user;
  saveToStorage('currentUser', user);
  alert('Signup successful!');
  window.location.href = 'index.html';
}

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const users = loadFromStorage('users') || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert('Invalid email or password!');
    return;
  }

  currentUser = user;
  saveToStorage('currentUser', user);
  alert('Login successful!');
  window.location.href = 'index.html';
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// Menu functions (menu.html)
// Removed duplicate - use sessionStorage version above


function viewMenu(id) {
  sessionStorage.setItem('currentRestaurantId', id);
  window.location.href = 'menu.html?id=' + id;
}

function displayMenu(restaurant) {
  const container = document.getElementById('menu-items-container');
  if (container) {
    container.innerHTML = restaurant.menu.map(item => `
      <div class="menu-item">
        <img src="./${item.img}" alt="${item.name}" loading="lazy">
        <h4>${item.name}</h4>
        <div class="price">$${item.price}</div>
        <button class="add-to-cart-btn" onclick="addToCart('${item.id}', '${restaurant.id}')">
          Add to Cart
        </button>
      </div>
    `).join('');
  }
}

function goHome() {
  window.location.href = 'index.html';
}


// Cart functions
function addToCart(itemId, restaurantId) {
  if (!requireLogin()) return;

  const restaurant = getCurrentRestaurant();
  const menuItem = restaurant.menu.find(m => m.id === itemId);
  
  const existing = cart.find(item => item.restaurantId === restaurantId && item.itemId === itemId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...menuItem, restaurantId, restaurantName: restaurant.name, quantity: 1 });
  }
  
  saveToStorage('cart', cart);
  updateCartCount();
  alert(`${menuItem.name} added to cart!`);
}

function displayCart() {
  const container = document.getElementById('cart-items-container');
  const emptyMsg = document.getElementById('empty-cart');
  const totalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (cart.length === 0) {
    if (container) container.innerHTML = '';
    if (emptyMsg) emptyMsg.style.display = 'block';
    if (totalEl) totalEl.textContent = '0';
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (container) {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>${item.restaurantName} • $${item.price} x ${item.quantity}</p>
        </div>
        <div class="cart-item-controls">
          <button class="quantity-btn" onclick="updateQuantity('${item.itemId}', '${item.restaurantId}', -1)">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity('${item.itemId}', '${item.restaurantId}', 1)">+</button>
          <button class="remove-btn" onclick="removeFromCart('${item.itemId}', '${item.restaurantId}')">Remove</button>
        </div>
      </div>
    `).join('');
  }

  if (totalEl) totalEl.textContent = total.toFixed(2);
  if (checkoutBtn) checkoutBtn.disabled = false;
}

function updateQuantity(itemId, restaurantId, change) {
  const item = cart.find(item => item.itemId === itemId && item.restaurantId === restaurantId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(itemId, restaurantId);
    } else {
      saveToStorage('cart', cart);
      displayCart();
      updateCartCount();
    }
  }
}

function removeFromCart(itemId, restaurantId) {
  const index = cart.findIndex(item => item.itemId === itemId && item.restaurantId === restaurantId);
  if (index > -1) {
    cart.splice(index, 1);
    saveToStorage('cart', cart);
    displayCart();
    updateCartCount();
  }
}

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countEl) {
    countEl.textContent = totalItems;
    countEl.style.display = totalItems > 0 ? 'flex' : 'none';
  }
}

function checkout() {
  if (cart.length === 0) return;
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  alert(`Order placed successfully! Total: $${total.toFixed(2)}\nThanks for ordering! (Mock checkout)`);
  
  cart = [];
  saveToStorage('cart', cart);
  window.location.href = 'index.html';
}

// Menu search
function searchMenu() {
  const query = document.getElementById('menu-search').value.toLowerCase();
  const restaurant = getCurrentRestaurant();
  const filtered = restaurant.menu.filter(item => item.name.toLowerCase().includes(query));
  // Re-render filtered menu (simplified)
  displayMenu({ ...restaurant, menu: filtered });
}

// Init on pages that need it
if (document.getElementById('cardContainer') || document.getElementById('restaurant-container')) {
  loadHeader();
  displayRestaurants(restaurants);
  filterRestaurantsByLocation();
}

if (document.getElementById('menu-items-container')) {
  loadHeader();
}

if (window.location.pathname.includes('cart')) {
  loadHeader();
  displayCart();
}


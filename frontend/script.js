const restaurants = [
  { name: "Pizza Hub", cuisine: "Italian", rating: 4.5, img: "https://source.unsplash.com/400x300/?pizza" },
  { name: "Biryani House", cuisine: "Indian", rating: 4.2, img: "https://source.unsplash.com/400x300/?biryani" }
];

function getStars(rating) {
  return "⭐".repeat(Math.floor(rating));
}

function displayRestaurants(list) {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  list.forEach(r => {
    container.innerHTML += `
      <div class="card">
        <img src="${r.img}" />
        <h3>${r.name}</h3>
        <p>${r.cuisine}</p>
        <p>${getStars(r.rating)} (${r.rating})</p>
      </div>
    `;
  });
}
function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  alert("Signup successful (frontend only)");
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  alert("Login successful (frontend only)");
}
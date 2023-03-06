// Retrieving ID information from URLSearchParams
let params = new URLSearchParams(document.location.search);
let id = params.get("id");

// API
const apiProduct = "http://localhost:3000/api/products/" + id;

// Retrieving information from API
function fetchData() {
  fetch(apiProduct)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      createItem(data);
    })
    .catch((err) => {
      console.log("Error while fetching :" + err.message);
  });
}

// Create the Right item
function createItem(data) {

      productTitle(data);
      productDesc(data);
      productPrice(data);
      productImage(data);
      productColor(data);
};

// Image
function productImage(data) {
  const imageElm = document.createElement("img");
  let imageID = data.imageUrl
  imageElm.setAttribute("src", imageID);
  document.querySelector(".item__img").appendChild(imageElm);
}

// Title
function productTitle(data) {
  return (document.getElementById("title").innerText = data.name);
}

// Description
function productDesc(data) {
  return (document.getElementById("description").innerText = data.description);
}

// Price
function productPrice(data) {
  return (document.getElementById("price").innerText = data.price);
}

// Color
function productColor(data) {
  const colors = data.colors;
  data.colors.forEach((element) => {
    let color = document.createElement("option");
    color.setAttribute("value", element);
    color.innerText = element;
    document.querySelector("#colors").appendChild(color);
  });
}

// Add to cart
function addToCart() {

  let addToCart = document.getElementById("addToCart");

  addToCart.addEventListener("click", function () {

    let quantity = document.getElementById("quantity").value;
    let color = document.getElementById("colors").value;

    // Check if the quantity/color as a valid value
    if (color == "") {
      alert("Veuilliez choisir une couleur valide, Merci.");
    } else if (quantity < 1 || quantity > 100) {
      alert("Veuilliez choisir une quantité valide, Merci.");
    } else {

      // Retrieves cart data
      var cart = JSON.parse(localStorage.getItem("cart"));

      // If Cart is null, create an empty cart
      if (cart == null) cart = [];

      // Check to see if we already have a cart with this item and if it has we just add the quantity
      if (
        cart.find((element) => element.id === id && element.color === color)
      ) {
        // return l'index
        index = cart.findIndex(
          (element) => element.id === id && element.color === color
        );

        // Edit quantity
        cart[index].quantity =
          parseInt(cart[index].quantity) + parseInt(quantity);

        // If Cart doesn't have this item
      } else {
        var newCart = {
          id: id,
          color: color,
          quantity: quantity,
        };

        // Add our new cart to the global one
        cart.push(newCart);
      }
      // Save all to local storage
      localStorage.setItem("cart", JSON.stringify(cart));

      // redirect to cart.html page
      document.location.href = "cart.html";
    }
  });
}

fetchData();
addToCart();

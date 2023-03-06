// API
const apiProduct = "http://localhost:3000/api/products";

// Getting our cart items
var cart = JSON.parse(localStorage.getItem("cart")) || [];

var product
var sumQty = 0;
var sumPrice = 0;

// Fetching Api
function fetchData() {
  fetch(apiProduct)
    .then((response) => response.json())
    .then((data) => {
      createCartProduct(data);
    })
    .catch((err) => {
      alert("Error while fetching :" + err.message);
    });
  }

  // Check if cart has content and display it to user
  function createCartProduct(data) {
    const formulaire = document.getElementsByClassName("cart__order");
    const cartPrice = document.getElementsByClassName("cart__price");
    
    // For each product in cart do the following
    if (cart.length > 0) {
      cart.forEach((items) => {
        // Find the product that matches between cart items and api items
        product = data.find((element) => element._id === items.id);

        // create a new article
        const article = createArticle();

        // Populate the article with the product image
        createImg(article, product);

        // Populate the article with the product description
        const divContent = createDescription(article, product, items);

        // Populate the article with the product settings
        createSettings(divContent, items);

        // Total quantity of products in the cart
        sumQty += parseInt(items.quantity);
        const totalQuantity = document.getElementById("totalQuantity");
        totalQuantity.innerText = sumQty;

        // Total price of products in the cart
        const totalPrice = document.getElementById("totalPrice");
        sumPrice += items.quantity * product.price;
        totalPrice.innerText = sumPrice;
      });

      deleteItems(cart, data);
      changeQty(cart, data);

    } else {
      document.querySelector("h1").innerText = "Votre panier est vide !";
      formulaire[0].remove()
      cartPrice[0].remove()
    }
  }

  function createArticle() {
    const cartItem = document.querySelector("#cart__items");
    const article = document.createElement("article");
    article.className = "cart__item";
    cartItem.appendChild(article);
    return article;
  }
  // Setting part
  function createSettings(divContent, items) {
    const divContentSettings = document.createElement("div");
    divContentSettings.className = "cart__item__content__settings";
    divContent.appendChild(divContentSettings);

    // create div setting qty
    const divContentSettingQuantity = document.createElement("div");
    divContentSettingQuantity.className =
      "cart__item__content__settings__quantity";
    divContentSettings.appendChild(divContentSettingQuantity);

    //create qty
    const pQuantity = document.createElement("p");
    pQuantity.innerText = "Qté : ";
    divContentSettingQuantity.appendChild(pQuantity);

    //create input quantity
    const pPriceInput = document.createElement("input");
    pPriceInput.className = "itemQuantity";
    pPriceInput.type = "number";
    pPriceInput.value = items.quantity;
    pPriceInput.name = "itemQuantity";
    pPriceInput.min = 1;
    pPriceInput.max = 100;
    divContentSettingQuantity.appendChild(pPriceInput);

    // create div delete
    const divContentSettingsDelete = document.createElement("div");
    divContentSettingsDelete.className =
      "cart__item__content__settings__delete";
    divContentSettings.appendChild(divContentSettingsDelete);

    // create delete
    const pDelete = document.createElement("p");
    pDelete.className = "deleteItem";
    pDelete.innerText = "Suppprimer";
    pDelete.id = "deleteItem";
    divContentSettingsDelete.appendChild(pDelete);
  }
  // Description part
  function createDescription(article, product, items) {
    const divContent = document.createElement("div");
    divContent.className = "cart__item__content";
    article.appendChild(divContent);

    //CREATE DESCRIPTION
    const divContentDescription = document.createElement("div");
    divContentDescription.className = "cart__item__content__description";
    divContent.appendChild(divContentDescription);

    //CREATE Name
    const h2 = document.createElement("h2");
    h2.innerText = product.name;
    divContentDescription.appendChild(h2);

    //Create colors
    const pColor = document.createElement("p");
    pColor.innerText = items.color;
    divContentDescription.appendChild(pColor);

    //create price
    const pPrice = document.createElement("p");
    pPrice.innerText = product.price + " €";
    divContentDescription.appendChild(pPrice);
    return divContent;
  }
  // Image part
  function createImg(article, product) {
    const divImg = document.createElement("div");
    divImg.className = "cart__item__img";
    article.appendChild(divImg);
    //CREATE IMG
    const img = document.createElement("img");
    divImg.appendChild(img);
    img.setAttribute("alt", "Photographie d'un canapé");
    let imageID = product.imageUrl.split("/")[4];
    img.setAttribute("src", "../../back/images/" + imageID);
  }


// Form
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let address = document.querySelector("#address");
let city = document.querySelector("#city");
let email = document.querySelector("#email");

// RegExp
const regexName = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç-]+$")
const regexMail = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,5}$")
const regexAdress = new RegExp('^[0-9-a-zA-Zàâäéèêëïîôöùûüç .,:"]+$')
const regexCity = new RegExp("^[a-zA-Z-àâäéèêëïîôöùûüç]+$")

// Listen for change, check if the entry have valid value
firstName.addEventListener("change", () => {
  if (regexName.test(firstName.value)) {
    firstName.nextElementSibling.innerHTML = "";
  } else {
    firstName.nextElementSibling.innerHTML = "Veuillez vérifier votre saisie";
    firstName.value = "";
  }
});

lastName.addEventListener("change", () => {
  if (regexName.test(lastName.value)) {
    lastName.nextElementSibling.innerHTML = "";
  } else {
    lastName.nextElementSibling.innerHTML = "Veuillez vérifier votre saisie";
    lastName.value = "";
  }
});

address.addEventListener("change", () => {
  if (regexAdress.test(address.value)) {
    address.nextElementSibling.innerHTML = "";
  } else {
    address.nextElementSibling.innerHTML = "Veuillez vérifier votre saisie";
    address.value = "";
  }
});

city.addEventListener("change", () => {
  if (regexCity.test(city.value)) {
    city.nextElementSibling.innerHTML = "";
  } else {
    city.nextElementSibling.innerHTML = "Veuillez vérifier votre saisie";
    city.value = "";
  }
});

email.addEventListener("change", () => {
  if (regexMail.test(email.value)) {
    email.nextElementSibling.innerHTML = "";
  } else {
    email.nextElementSibling.innerHTML = "Veuillez vérifier votre saisie";
    email.value = "";
  }
});

// Delete item for the selected one
function deleteItems(cart, data) {
  let deleteBtn = document.getElementsByClassName("deleteItem");
  let article = document.getElementsByClassName("cart__item");

  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", () => {
      product = data.find((element) => element._id === cart[i].id)

      sumQty = sumQty - cart[i].quantity
      totalQuantity.innerHTML = sumQty
      sumPrice = sumPrice - (product.price * cart[i].quantity)
      totalPrice.innerHTML = sumPrice

      cart.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      article[i].remove()

      if (cart.length < 1) {
        alert("Panier vide, retour a l'acceuil.");
        window.location.href = "index.html";
      }
    })
  }}

// Change quantity for the selected item
function changeQty(cart, data) {
  let inputQty = document.getElementsByClassName("itemQuantity");
  let article = document.getElementsByClassName("cart__item");

  for (let i = 0; i < inputQty.length; i++) {

    inputQty[i].addEventListener("change", () => {
      product = data.find((element) => element._id === cart[i].id)

      sumQty = sumQty - cart[i].quantity
      sumPrice = sumPrice - (product.price * cart[i].quantity)
      cart[i].quantity = inputQty[i].value

      localStorage.setItem("cart", JSON.stringify(cart))

      sumQty = sumQty + parseInt(cart[i].quantity)
      sumPrice = sumPrice + (cart[i].quantity * product.price)
      totalQuantity.innerHTML = sumQty
      totalPrice.innerHTML = sumPrice
      
      if (cart[i].quantity < 1) {
        cart.splice(i, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        article[i].remove()
      }

      if (cart.length < 1) {
        alert("Panier vide, retour a l'acceuil.");
        window.location.href = "index.html";
      }
    })
  }
}

// from cart to cartID
function getCartId() {
  let cartId = [];

  for (var i = 0; i < cart.length; i++) {
    cartId.push(cart[i].id);
  }

  return cartId;
}

function sendForm() {
  const btn_commander = document.getElementById("order");
  

  btn_commander.addEventListener("click", (event) => {

    event.preventDefault();

    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("email");

    // Check if form is complete
    if ((firstName.value == null || firstName.value == "") || (lastName.value == null || lastName.value == "") || (city.value == null || city.value == "") || (email.value == null || email.value == "") || (address.value == null || address.value == "")){
      alert("Merci de remplir tout les champs");
    } else if (cart.length < 1) {
      alert("Votre panier est vide, retour a l'acceuil");
      window.location.href = "index.html";
    } else {

    const order = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },

      products: getCartId(),
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.removeItem("cart");
        window.location.href = "confirmation.html?orderId=" + data.orderId;
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
    }
  });
  return false;
}

sendForm();
fetchData();
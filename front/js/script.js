// API
const apiProduct = "http://localhost:3000/api/products";

// Select where products should be inserted
let items = document.querySelector("#items");

// Retrieving information from API
function fetchData() {
  fetch(apiProduct)
    .then((response) => response.json())
    .then((data) => {

        for(let canape of data){
            createArticle(canape)
        }

    })
    .catch((err) => {
        console.log("Error while fetching :" + err.message);
    });
};

// Product Item
function createArticle(data) {
  const anchor = document.createElement("a");
  const article = document.createElement("article");

  items.appendChild(anchor);
  productLink(data, anchor);
  anchor.appendChild(article);

  productName(data, article);
  productImage(data, article);
  productDesc(data, article);
}

// Product Link
function productLink(data, balise) {
  balise.setAttribute("href", "product.html?id=" + data._id);
}

// Product Name
function productName(data, balise) {
  const nameElm = document.createElement("h3");
  nameElm.innerText = data.name;
  balise.appendChild(nameElm);
}

// Product Image
function productImage(data, balise) {
  const imageElm = document.createElement("img");
  imageElm.setAttribute("src", data.imageUrl);
  imageElm.setAttribute("alt", data.altTxt);
  balise.appendChild(imageElm);
}

// Product Description
function productDesc(data, balise) {
  const descElm = document.createElement("p");
  descElm.textContent = data.description;
  balise.appendChild(descElm);
}

fetchData();
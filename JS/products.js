import { showError } from "./UI/displayMessage.js";
import { getJackets } from "./data/API.js";

async function displayJackets() {

try { 
    const jackets = await getJackets();
    const jacketContainer = document.getElementById("jacket_container");

for (let i = 0; i < jackets.length; i++) {
    const jacket = jackets[i];

    const jacketDiv = document.createElement("div");
    jacketDiv.classList.add("products");

    const productImg = document.createElement("img");
    productImg.classList.add("products");
    productImg.src = jacket.image;
    productImg.alt = jacket.description;

    const jacketText = document.createElement("h2");
    jacketText.classList.add("products");
    jacketText.textContent = jacket.title;

    const price = document.createElement("p");
    price.classList.add("products");
    price.textContent = ("$ ") + jacket.price;

    jacketContainer.appendChild(jacketDiv)
    jacketDiv.appendChild(productImg)
    jacketDiv.appendChild(jacketText)
    jacketDiv.appendChild(price)
    }
} catch (error) {
    showError(error.message);
}
}

displayJackets();
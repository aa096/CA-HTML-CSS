import { showError } from "./UI/displayMessage.js";
import { getJackets } from "./data/API.js";

async function displayJackets() {

try { 
    const jackets = await getJackets();
    const jacketContainer = document.getElementById("new_items");

for (let i = 0; i < jackets.length; i++) {
    const jacket = jackets[i];

    const jacketDiv = document.createElement("div");
    jacketDiv.classList.add("new_arrivals");

    const productImg = document.createElement("img");
    productImg.classList.add("new_arrivals");
    productImg.src = jacket.image;
    productImg.alt = jacket.description;

    jacketContainer.appendChild(jacketDiv)
    jacketDiv.appendChild(productImg)
    }
} catch (error) {
    showError(error.message);
}
}

displayJackets();
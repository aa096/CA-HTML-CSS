import { showError } from "./UI/displayMessage.js";
import { getJackets } from "./data/API.js";

async function displayNewArrivals() {

try { 
    const jackets = await getJackets();
    const jacketContainer = document.getElementById("new_items");

for (let i = 0; i < 4; i++) {
    const jacket = jackets[i];

    const newArrival = document.createElement("div");
    newArrival.classList.add("new_arrivals");

    const productImg = document.createElement("img");
    productImg.src = jacket.image;
    productImg.alt = jacket.description;

    jacketContainer.appendChild(newArrival)
    newArrival.appendChild(productImg)
    }
} catch (error) {
    showError(error.message, "#new_items");
}
}

displayNewArrivals();
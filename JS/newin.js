import { showError } from "./UI/displayMessage.js";
import { getJackets } from "./data/API.js";
import { showLoadingIndicator } from "./UI/loadingIndicator.js";

const newContainer = document.querySelector("#new_items");


async function displayNewArrivals() {
    try { 
        showLoadingIndicator("#new_items")
        const jackets = await getJackets();
 
        newContainer.innerHTML ="";

    for (let i = 0; i < 4; i++) {
        const jacket = jackets[i];

        const newArrival = document.createElement("a");
        newArrival.classList.add("products");
        newArrival.href = "productpage.html?id=" + jacket.id; 

        const productImg = document.createElement("img");
        productImg.src = jacket.image;
        productImg.alt = jacket.description;

        const jacketText = document.createElement("h2");
        jacketText.classList.add("products");
        jacketText.textContent = jacket.title;

        const price = document.createElement("p");
        price.classList.add("products");
        price.textContent = ("$ ") + jacket.price;
        
        newContainer.appendChild(newArrival)
        newArrival.appendChild(productImg)
        newArrival.appendChild(jacketText)
        newArrival.appendChild(price)
    }

    } 
    catch (error) {
        showError(error.message, "#new_items");
    }
}

displayNewArrivals();
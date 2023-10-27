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
        productImg.src = jacket.images[0].src;
        productImg.alt = jacket.images[0].name;

        const jacketText = document.createElement("h2");
        jacketText.classList.add("products");
        jacketText.textContent = jacket.name;

        const priceHolder = document.createElement("p");
        const formattedPrice = (Number(jacket.prices.price) / 100). toFixed(2);
        priceHolder.classList.add("price");
        priceHolder.textContent = `${jacket.prices.currency_prefix} ${formattedPrice}`;
        
        newContainer.appendChild(newArrival)
        newArrival.appendChild(productImg)
        newArrival.appendChild(jacketText)
        newArrival.appendChild(priceHolder)
    }

    } 
    catch (error) {
        showError(error.message, "#new_items");
    }
}

displayNewArrivals();
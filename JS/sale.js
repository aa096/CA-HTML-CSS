import { showError } from "./UI/displayMessage.js";
import { getJackets } from "./data/API.js";
import { showLoadingIndicator } from "./UI/loadingIndicator.js";

const newContainer = document.querySelector("#sale_container");


async function displayNewArrivals() {
    try { 
        showLoadingIndicator("#sale_container")
        const jackets = await getJackets();
 
        newContainer.innerHTML ="";

    for (let i = 0; i < jackets.length; i++) {
        const jacket = jackets[i];

       if(jacket.onSale) { 
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
        price.innerHTML = `<span class="sale_price">$ ${jacket.price}</span> <span class="red"> $ ${jacket.discountedPrice}</span>`;
        
        newContainer.appendChild(newArrival)
        newArrival.appendChild(productImg)
        newArrival.appendChild(jacketText)
        newArrival.appendChild(price)
    }}

    } 
    catch (error) {
        showError(error.message, "#sale_container");
    }
}

displayNewArrivals();
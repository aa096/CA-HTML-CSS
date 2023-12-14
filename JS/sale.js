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

       if(jacket.on_sale) { 
       const newArrival = document.createElement("a");
        newArrival.classList.add("products");
        newArrival.href = "productpage.html?id=" + jacket.id; 

        const productImg = document.createElement("img");
        productImg.src = jacket.images[0].src;
        productImg.alt = jacket.images[0].name;

        const jacketText = document.createElement("h2");
        jacketText.classList.add("products");
        jacketText.textContent = jacket.name;

        const price = document.createElement("p");
        const formattedPrice = (Number(jacket.prices.regular_price) / 100). toFixed(2);
        const formattedSalePrice = (Number(jacket.prices.sale_price) / 100). toFixed(2);
        price.classList.add("products");
        price.innerHTML = `<span class="sale_price">${jacket.prices.currency_prefix} ${formattedPrice}</span> <span class="red">${jacket.prices.currency_prefix} ${formattedSalePrice}</span>`;
        
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
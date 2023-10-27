import { showError } from "./UI/displayMessage.js";
import { getJackets } from "./data/API.js";
import { showLoadingIndicator } from "./UI/loadingIndicator.js";

const jacketContainer = document.querySelector("#jacket_container")

async function displayJackets() {

    try { 
        showLoadingIndicator ("#jacket_container")
        const jackets = await getJackets();

        jacketContainer.innerHTML ="";

        const jacket = jackets;

        jackets.forEach(function(jacket) {
            const jacketDiv = document.createElement("a");
            jacketDiv.classList.add("products");
            jacketDiv.href = "productpage.html?id=" + jacket.id; 

            const productImg = new Image();
            productImg.classList.add("products");
            productImg.src = jacket.images[0].src;
            productImg.alt = jacket.images[0].name;

            const jacketText = document.createElement("h2");
            jacketText.classList.add("products");
            jacketText.textContent = jacket.name;

            const price = document.createElement("p");
            const formattedPrice = (Number(jacket.prices.price) / 100). toFixed(2);
            price.classList.add("products");
            price.textContent = `${jacket.prices.currency_prefix} ${formattedPrice}`;

            jacketContainer.appendChild(jacketDiv)
            jacketDiv.appendChild(productImg)
            jacketDiv.appendChild(jacketText)
            jacketDiv.appendChild(price)
    }); 

    } 
    catch(error) {
        showError(error.message, "#jacket_container");
    }
}

displayJackets();
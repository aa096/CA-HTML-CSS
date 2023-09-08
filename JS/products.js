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
    }); 

    } 
    catch(error) {
        showError(error.message, "#jacket_container");
    }
}

displayJackets();
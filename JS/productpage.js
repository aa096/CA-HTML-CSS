import { showError } from "./UI/displayMessage.js";
import { showLoadingIndicator } from "./UI/loadingIndicator.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const title = params.get("title")

const url = "https://api.noroff.dev/api/v1/rainy-days/"+ id;

async function getJacket() {
    try { 
        showLoadingIndicator (".main_section");
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("It's raining, failed to fetch jackets");
        }
        const result = await response.json();

            createHTML (result); 
            getTitle (result);
            addStylingIcons ();
        } 

        catch (error) {
            showError (error.message, ".main_section");
        }
}

getJacket ();


function createHTML (result) {
    const detailContainer = document.querySelector(".main_section");
    detailContainer.innerHTML = `<img src = "${result.image}" alt="${result.description}"></img>
                                 <div class="product_name">
                                    <h1>${result.title}</h1>
                                    <p class="price">$ ${result.price}</p>
                                    <img src="Images/size.png" alt="Find your size logo" class="size_logo">
                                    <p class="size_p">Size: ${result.sizes}</p>
                                    <button class="cta_bag">add to bag</button>
                                    <p class="description">${result.description}</p>
                                </div>`
}


function getTitle (result) {
    const titleContainer = document.getElementById("title");    
    titleContainer.textContent = result.title;
}

function addStylingIcons () {
    const PropertiesContainer = document.querySelector(".properties");
    PropertiesContainer.innerHTML = `<h2> Properties </h2>
                                     <img src="Images/Waterproof.png" alt="icon demostrating that jacket is waterproof" class="properties_icons">
                                     <img src="Images/Feather.png" alt="Icon demostrating that jacket is lightweight" class="properties_icons">
                                     <img src="Images/Windproof.png" alt="icon demostrating that jacket is windproof" class="properties_icons">
                                     <img src="Images/Breath.png" alt="Icon demostrating that jacket is breathable" class="properties_icons">`
}
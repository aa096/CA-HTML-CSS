import { showError } from "./UI/displayMessage.js";

const detailContainer = document.querySelector(".main_section");

const infoContainer = document.querySelector(".info")

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const url = "https://api.noroff.dev/api/v1/rainy-days/"+ id;

async function getJackets() {
    
try { 
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("It's raining, failed to fetch jackets");
    }
    const result = await response.json();

   // return result; 

    createHTML (result); 

    createDetailHTML (result);

    } 

    catch (error) {
    
        throw error;
    }
}

getJackets ();

function createHTML (result) {
    detailContainer.innerHTML = `<div class="product_name">
                                    <img src = "${result.image}" alt="${result.description} class="main_section"></img>
                                    <h1>${result.title}</h1>
                                    <p class="price">$ ${result.price}</p>
                                    <p class="size_p">Size: ${result.sizes}</p>
                                    <button class="cta_bag">add to bag</button>
                                </div>`
}

function createDetailHTML (result) {
    infoContainer.innerHTML = `<div class="info"> 
                                <p>${result.description}</p>
                                </div>`

}
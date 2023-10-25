import { showError } from "./UI/displayMessage.js";
import { showLoadingIndicator } from "./UI/loadingIndicator.js";
import { sizeMessage } from "./UI/sizeMessage.js";
import { addStylingIcons } from "./UI/renderStylingIcons.js";
import { addToCart } from "./utils/cart.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://api.noroff.dev/api/v1/rainy-days/"+ id;

function getTitle (result) {
    const titleContainer = document.getElementById("title");    
    titleContainer.textContent = result.title;
}

async function getJacket() {
    try { 
        showLoadingIndicator (".main_section");
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("It's raining, failed to fetch jackets");
        }
        const result = await response.json();
            renderProductDetails (result); 
            getTitle (result);
            addStylingIcons ();
        } 

        catch (error) {
            showError (error.message, ".main_section");
        }
}

getJacket ();

function renderProductDetails (result) {
    const detailContainer = document.querySelector(".main_section");
    detailContainer.innerHTML = `<img class="product_img" src = "${result.image}" alt="${result.description}"/>
                                 <div class="product_name">
                                    <div class="flex">
                                        <h1>${result.title}</h1>
                                        <p class="price">$ ${result.discountedPrice}</p>
                                    </div>
                                    <p class="description">${result.description}</p>
                                    <div class="line">
                                        <p class="bold">Color</p>
                                        <p class="regular">${result.baseColor}</p>
                                    </div>
                                    <div class="size_line">
                                        <p class="bold">Size</p>
                                        <p class="regular_size"></p>
                                        <img src="Images/size.png" alt="Find your size logo" class="size_logo">
                                    </div>
                                    <div class="error_here"></div>
                                    <div class="size_p"></div>
                                    <button class="cta_bag"> add to cart</button>
                                </div>`

    const sizeButtonContainer = document.querySelector(".size_p");
    const showSize = document.querySelector(".regular_size");
    let selectSizeBtn = null;
    let selectSize = "";

    if (result.sizes) {
        result.sizes.forEach((size) => {
            const sizeButton = document.createElement ("button");
            sizeButton.textContent = size;
            sizeButton.className = "size_p"


            sizeButton.addEventListener("click", () => {
                if (selectSizeBtn) {
                    selectSizeBtn.classList.remove("clicked");
                }
                sizeButton.classList.toggle("clicked");
                selectSizeBtn = sizeButton;
                selectSize = size;

                showSize.textContent = selectSize;
            })

             sizeButtonContainer.appendChild(sizeButton)
        });
   }

   const addToCartButton = document.querySelector (".cta_bag");
   addToCartButton.addEventListener("click", () => {

        if (!selectSize) {
            sizeMessage ("Please select a size before adding to the cart");
            return;
        }
            sizeMessage ("✓ The item has been added to the cart")
            addToCart (result, selectSize);
   });
}



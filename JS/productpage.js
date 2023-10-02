import { showError } from "./UI/displayMessage.js";
import { getExistingCart } from "./utils/cartFunctions.js";
import { showLoadingIndicator } from "./UI/loadingIndicator.js";
import { sizeMessage } from "./UI/sizeMessage.js";

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
                                    <button class="cta_bag"> add to bag</button>
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
            sizeMessage ("Please select a size before adding to the bag");
            return;
        }
            sizeMessage ("✓ The item has been added to the bag")
            addToCart (result, selectSize);
   });

}


function addToCart (result, selectSize) {
    const id = result.id;
    const title = result.title;
    const img = result.image;
    const price = result.discountedPrice;
    const desc = result.description;
    const color = result.baseColor;
    const size = selectSize;

    const currentCart = getExistingCart();

    const productExsists = currentCart.find (function(bag) {
        return bag.id === id; 
    });

    if (productExsists === undefined) {
        const cartItem = { id, title, img, price, desc, color, quantity: 1, size };
        currentCart.push(cartItem);
        saveCart(currentCart);
    }
    else {
        productExsists.quantity += 1;
        saveCart (currentCart);
    }
}

const products = getExistingCart ();

function saveCart(cart) {
    localStorage.setItem("products", JSON.stringify(cart));
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


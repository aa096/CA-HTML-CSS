import { showError } from "./UI/displayMessage.js";
import { showLoadingIndicator } from "./UI/loadingIndicator.js";
import { sizeMessage } from "./UI/sizeMessage.js";
import { addStylingIcons } from "./UI/renderStylingIcons.js";
import { addToCart } from "./utils/cart.js";
import { renderProductDetails } from "./UI/renderProductDetails.js";
import { updateCartImage } from "./script.js";

const detailContainer = document.querySelector(".main_section");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = `http://aashild-rasmussen.no/wp-json/wc/store/products/${id}`;

function getTitle (result) {
    const titleContainer = document.getElementById("title");    
    titleContainer.textContent = result.name;
}

async function getJacket() {
    try { 
        showLoadingIndicator (".main_section");
        const response = await fetch(url);

        detailContainer.innerHTML ="";

        if (!response.ok) {
            throw new Error("It's raining, failed to fetch jackets");
        }
        const result = await response.json();
            renderProductDetails (result); 
            getTitle (result);
            addStylingIcons ();

        const sizeButtonContainer = document.querySelector(".size_p");
        const showSize = document.querySelector(".regular_size");
        let selectSizeBtn = null;
        let selectSize = "";

        if (result.attributes) {
            const sizesAttribute = result.attributes.find(
                (attribute) => attribute.name === "Sizes"
            );
            
            if (sizesAttribute && sizesAttribute.terms) { 
                sizesAttribute.terms.forEach((size) => {
                    const sizeButton = document.createElement ("button");
                    sizeButton.textContent = size.name;
                    sizeButton.className = "size_p"


                    sizeButton.addEventListener("click", () => {
                        if (selectSizeBtn) {
                            selectSizeBtn.classList.remove("clicked");
                        }
                        sizeButton.classList.toggle("clicked");
                        selectSizeBtn = sizeButton;
                        selectSize = size.name;

                        showSize.textContent = selectSize;
                    });

                    sizeButtonContainer.appendChild(sizeButton)
                });
            }
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

    } catch (error) {
        showError(error.message, "main_section");
    }
}

getJacket();
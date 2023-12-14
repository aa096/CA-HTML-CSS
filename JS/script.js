import { getExistingCart } from "./utils/cartFunctions.js";

const cart = getExistingCart ();

const bagImg = document.getElementById("change");

export function updateCartImage () {
    const totalQuantity = cart.reduce ((total, item) => total + item.quantity, 0);

    const quantityElement = document.createElement("p");
    quantityElement.textContent = totalQuantity;
    quantityElement.classList.add("cart_quantity");

    bagImg.parentElement.appendChild(quantityElement);

    bagImg.addEventListener("mouseover", function() {
        bagImg.src = "Images/bag.png";
        quantityElement.style.color = "white";
    });

    bagImg.addEventListener("mouseout", function() {
        bagImg.src = "images/Shoppingbag.png";
        quantityElement.style.color = "black";
    });
}

updateCartImage ();
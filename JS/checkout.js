import { getExistingCart } from "./utils/cartFunctions.js";

const products = getExistingCart ();
const cartContainer = document.querySelector (".cart_info");

if (products.length === 0) {
    cartContainer.innerHTML = "Nothing in the cart";
}
 

let totalPrice = 0;

products.forEach((product, index) => {
    totalPrice = product.price * product.quantity;

    cartContainer.innerHTML += `<div class="cart_item" data-index="${index}">
                                    <div class="line">
                                        <div class="wrapper">
                                            <img class="cart_img" src="${product.img}" alt="${product.description}"/>
                                            <span class="quantity_bubble">${product.quantity}</span>
                                        </div>
                                        <h1>${product.title}</h1>
                                    </div>
                                    <div class="info_line">
                                        <p class="blue">${product.color} / ${product.size}</p>
                                        <p class="price">$ ${totalPrice.toFixed(2)}</p>
                                    </div>
                                    <button class="remove_item">Remove</button>
                                    <hr>
                                </div>`;
});



function createHTML (product) {
    const totalContainer = document.querySelector(".total");
    totalContainer.innerHTML += `<label class="discount" for="name">Discount code</label>
                                <input type="text" discount="discount" id="name" class="discount">
                                <input type="submit" value="Apply">
                                <p>Subtotal:</p> 
                                <button class="cta_bag">Complete purchase</button>`
}

createHTML ();

document.querySelectorAll(".remove_item").forEach((button, index) => {
    button.addEventListener("click", () => {
        removeItem(index);
    });
});

function removeItem (index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));

    displayCart();
}

function displayCart() {
    cartContainer.innerHTML = "";

    products.forEach((product, index) => {
        const totalPrice = product.price * product.quantity;

        cartContainer.innerHTML += `<div class="cart_item" data-index="${index}">
                                        <div class="line">
                                            <div class="wrapper">
                                                <img class="cart_img" src="${product.img}" alt="${product.description}"/>
                                                <span class="quantity_bubble">${product.quantity}</span>
                                            </div>
                                            <h1>${product.title}</h1>
                                            <p class="price">$ ${totalPrice.toFixed(2)}</p>
                                            <p class="blue">${product.color} / ${product.size}</p>
                                        </div>
                                        <button class="remove_item">Remove</button>
                                        <hr>
                                    </div>`;
    });

    document.querySelectorAll(".remove_item").forEach((button, index) => {
        button.addEventListener("click", () => {
            removeItem(index)
        });
    });
} 


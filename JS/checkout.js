import { getExistingCart } from "./utils/cartFunctions.js";

const products = getExistingCart ();
const totalContainer = document.querySelector(".total");
const cartContainer = document.querySelector (".cart_info");

const staticHTML =  `<div class="discount">
                        <label class="disc" for="disc">Discount code:</label>
                        <input type="text" name="discount" id="disc" class="discount">
                        <input class="apply_cta" type="submit" value="Apply">
                    </div>
                    <div class="price_total">
                        <p class="subtotal">Subtotal: </p>
                        <p class="price_to">$ 0.00</p> 
                    </div>
                    <button class="cta_bag">Complete purchase</button>`

totalContainer.innerHTML = staticHTML;

if (products.length === 0) {
    const container = document.querySelector (".message");
    container.innerHTML = `<div class="empty">
                            <h1>Your shopping cart is empty.</h1>
                            <a href="products.html"> <- Go back</a>
                            </div>`;
}

function displayCart() { 
    let totalPrice = 0;

    cartContainer.innerHTML = "";

    products.forEach((product, index) => {
        totalPrice += product.price * product.quantity;
        const itemPrice = product.price * product.quantity;

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
                                            <p class="price">$ ${itemPrice.toFixed(2)}</p>
                                        </div>
                                        <button class="remove_item">Remove</button>
                                        <hr>
                                    </div>`;
    });

    totalContainer.querySelector(".price_to").textContent = `$ ${totalPrice.toFixed(2)}`;

    document.querySelectorAll(".remove_item").forEach((button, index) => {
        button.addEventListener("click", () => {
            removeItem(index)
        });
    });
}

function removeItem (index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));

    window.location.reload();

    displayCart();
}

displayCart();




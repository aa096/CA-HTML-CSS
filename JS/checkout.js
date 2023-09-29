import { getExistingCart } from "./utils/cartFunctions.js";

const products = getExistingCart ();
const cartContainer = document.querySelector (".cart_info");

if (products.lenght === 0) {
    cartContainer.innerHTML = `<p>Nothing in the cart</p>`;
}
 

let totalPrice = 0;

products.forEach((product) => {
    totalPrice = product.price * product.quantity;

    cartContainer.innerHTML += ` <div class="wrapper">
                                    <img class="cart_img" src="${product.img}" alt="${product.description}"/>
                                    <span class="quantity_bubble">${product.quantity}</span>
                                </div>
                                <h1>${product.title}</h1>
                                <p class="blue">${product.color}</p>
                                <p class="price">$ ${totalPrice.toFixed(2)}</p>
                                <hr>`;
});



function createHTML (product) {
    const totalContainer = document.querySelector(".total");
    totalContainer.innerHTML += `<label class="discount" for="name">Discount code</label>
                                <input type="text" discount="discount" id="name" class="discount">
                                <input type="submit" value="Apply">
                                <p>Subtotal:</p> 
                                <button class="cta_bag">Complete purchase</button>`
}

createHTML ()




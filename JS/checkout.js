import { getExistingCart } from "./utils/cartFunctions.js";

const products = getExistingCart ();
const cartContainer = document.querySelector (".cart_info");

if (products.lenght === 0) {
    cartContainer.innerHTML = `<p>Nothing in the cart</p>`;
}
 
products.forEach((product) => {
    cartContainer.innerHTML += `<img class="cart_img" src="${product.img}" alt="${product.description}"/>
                                <h1>${product.title}</h1>
                                <p class="blue">${product.color}</p>
                                <div class="table">
                                    <div class=row>
                                        <p class="cell">Quantity: </p>
                                        <p class="cell">${product.quantity} x </p>
                                        <p class="price">$ ${product.price}</p>
                                    </div>
                                </div>
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




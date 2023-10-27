import { getExistingCart } from "./utils/cartFunctions.js";

const products = getExistingCart ();
const totalContainer = document.querySelector(".total");
const cartContainer = document.querySelector (".cart_info");

function removeItem (index) {
    const removeProduct = products[index];

    if (removeProduct.quantity > 1) {
        removeProduct.quantity -= 1;
    } else { 
        products.splice(index, 1);
    }
    
    localStorage.setItem("products", JSON.stringify(products));
    displayCart();
}

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

function displayCart() { 
    let totalPrice = 0;

    cartContainer.innerHTML = "";

    if (products.length === 0) {
        const container = document.querySelector (".message");
        container.innerHTML = `<div class="empty">
                                <h1>Your shopping cart is empty.</h1>
                                <a href="products.html"> <- Go back</a>
                                </div>`;
    } else {
        products.forEach((product, index) => {
        totalPrice += product.price * product.quantity;
        const itemPrice = product.price * product.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart_item");
        cartItem.setAttribute("data-index",index);

        const lineItem = document.createElement("div");
        lineItem.classList.add("line");

        const wrapperItem = document.createElement("div");
        wrapperItem.classList.add("wrapper");

        const cartImg = document.createElement("img");
        cartImg.src = product.img;
        cartImg.alt = product.name;
        cartImg.classList.add("cart_img");

        const bubble = document.createElement("span");
        bubble.classList.add("quantity_bubble");
        bubble.textContent = product.quantity;

        const productTitle = document.createElement("h1");
        productTitle.textContent = product.title;

        const infoLine = document.createElement("div");
        infoLine.classList.add("info_line");

        const infoP = document.createElement("p");
        infoP.classList.add("blue");
        infoP.textContent = product.color;

        const priceP = document.createElement("p");
        priceP.classList.add("price");
        priceP.textContent = product.price;

        const buttonRemove = document.createElement("button");
        buttonRemove.classList.add("remove_item");
        buttonRemove.textContent = "Remove";

        const divider = document.createElement("hr");

        cartContainer.appendChild(cartItem);
        
        lineItem.appendChild(wrapperItem);

        wrapperItem.appendChild(cartImg);
        wrapperItem.appendChild(bubble);

        infoLine.appendChild(infoP);
        infoLine.appendChild(priceP);

        cartItem.appendChild(lineItem);
        cartItem.appendChild(wrapperItem);
        cartItem.appendChild(productTitle);
        cartItem.appendChild(infoLine);
        cartItem.appendChild(buttonRemove);
        cartItem.appendChild(divider);

    });

    totalContainer.querySelector(".price_to").textContent = `$ ${totalPrice.toFixed(2)}`;

    cartContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove_item")) { 
            const index = event.target.closest(".cart_item").dataset.index;
            removeItem(index);
        }
    });
}
}

displayCart();




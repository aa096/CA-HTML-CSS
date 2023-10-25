import { getExistingCart } from "./cartFunctions.js";

const products = getExistingCart ();

export function addToCart (result, selectSize) {
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

function saveCart(cart) {
    localStorage.setItem("products", JSON.stringify(cart));
}
import { getExistingCart } from "./cartFunctions.js";

const products = getExistingCart ();

export function addToCart (result, selectSize) {
    const id = result.id;
    const title = result.name;
    const img = result.images[0].src;
    const price = (Number(result.prices.price) / 100). toFixed(2);
    const currency = result.prices.currency_prefix
    const desc = result.description;
    const colorAttribute = result.attributes.find(attribute => attribute.name === "Color");
    const color =  colorAttribute ? colorAttribute.terms[0].name : "";
    const sizeAttribute = result.attributes.find(attribute => attribute.name === "Sizes");
    const size = sizeAttribute ? sizeAttribute.terms[0].name : "";

    const currentCart = getExistingCart();

    const productExsists = currentCart.find (bag =>bag.id === id);

    if (productExsists === undefined) {
        const cartItem = { id, title, img, price, currency, desc, color, quantity: 1, size };
        currentCart.push(cartItem);
        saveCart(currentCart);
    }
    else {
        productExsists.quantity += 1;
        saveCart (currentCart, selectSize);
    }
}

function saveCart(cart) {
    localStorage.setItem("products", JSON.stringify(cart));
}
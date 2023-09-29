export function getExistingCart() {
    const cart = localStorage.getItem("products");

    if (cart === null) {
        return [];
    }
    else {
        return JSON.parse(cart);
    }
}
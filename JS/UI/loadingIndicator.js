export function showLoadingIndicator(target) {
    const itemsList = document.querySelector(target);
    itemsList.innerHTML = `<div class="loader"> </div>`;
}
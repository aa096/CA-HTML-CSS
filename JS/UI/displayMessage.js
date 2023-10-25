export function showError(message, target) {
    const errorContainer = document.querySelector(target);
    errorContainer.innerHTML = `<h3 class="err">Error: ${message}</h3>`;
}
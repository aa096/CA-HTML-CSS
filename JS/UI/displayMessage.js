export function showError(message) {
    const errorContainer = document.getElementById("jacket_container");
    errorContainer.innerHTML = `<h3 class="err">Error: ${message}</h3>`;
}
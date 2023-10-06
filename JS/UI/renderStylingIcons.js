export function addStylingIcons () {
    const PropertiesContainer = document.querySelector(".properties");
    PropertiesContainer.innerHTML = `<h2> Properties </h2>
                                    <div class="prop">
                                        <img src="Images/Waterproof.png" alt="icon demostrating that jacket is waterproof" class="properties_icons">
                                        <img src="Images/Feather.png" alt="Icon demostrating that jacket is lightweight" class="properties_icons">
                                        <img src="Images/Windproof.png" alt="icon demostrating that jacket is windproof" class="properties_icons">
                                        <img src="Images/Breath.png" alt="Icon demostrating that jacket is breathable" class="properties_icons">
                                    </div>`
}

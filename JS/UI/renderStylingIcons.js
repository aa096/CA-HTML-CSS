export function addStylingIcons () {
    const PropertiesContainer = document.querySelector(".properties");

    const h2Prop = document.createElement("h2");
    h2Prop.textContent = "Properties";

    const propDiv = document.createElement("div");
    propDiv.classList.add("prop");

    const iconImg1 = new Image();
    iconImg1.classList.add("properties_icons");
    iconImg1.src = "Images/Waterproof.png";
    iconImg1.alt = "icon demostrating that jacket is waterproof";

    const iconImg2 = new Image();
    iconImg2.classList.add("properties_icons");
    iconImg2.src = "Images/Feather.png";
    iconImg2.alt = "icon demostrating that jacket is lightweight";

    const iconImg3 = new Image();
    iconImg3.classList.add("properties_icons");
    iconImg3.src = "Images/Windproof.png";
    iconImg3.alt = "icon demostrating that jacket is windproof";

    const iconImg4 = new Image();
    iconImg4.classList.add("properties_icons");
    iconImg4.src = "Images/Breath.png";
    iconImg4.alt = "icon demostrating that jacket is breathable";

    propDiv.appendChild(iconImg1);
    propDiv.appendChild(iconImg2);
    propDiv.appendChild(iconImg3);
    propDiv.appendChild(iconImg4);

    PropertiesContainer.appendChild(h2Prop);
    PropertiesContainer.appendChild(propDiv);
}


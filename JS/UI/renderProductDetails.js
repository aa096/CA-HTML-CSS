import { sizeMessage } from "./sizeMessage.js";

export function renderProductDetails (result) {
    const detailContainer = document.querySelector(".main_section");
    const PropertiesContainer = document.querySelector(".properties");

    const productImg = new Image();
    productImg.src = result.images[0].src;
    productImg.alt = result.name; 
    productImg.classList.add("product_img");

    const productDiv = document.createElement("div");
    productDiv.classList.add("product_name");

    const flexDiv = document.createElement("div");
    flexDiv.classList.add("flex");

    const nameHolder = document.createElement("h1");
    nameHolder.textContent = result.name; 

    const priceHolder = document.createElement("p");
    const formattedPrice = (Number(result.prices.price) / 100). toFixed(2);
    priceHolder.classList.add("price");
    priceHolder.textContent = `${result.prices.currency_prefix} ${formattedPrice}`;

    flexDiv.appendChild(nameHolder);
    flexDiv.appendChild(priceHolder);

    const productDesc = document.createElement("p");
    productDesc.classList.add("description");
    productDesc.innerHTML = `${result.short_description}`;

    const tagHolder = document.createElement("div");
    tagHolder.classList.add("line");

    const boldColor = document.createElement("p");
    boldColor.classList.add("bold");
    boldColor.textContent = `Color`

    const regularColor = document.createElement("p");
    const colorAttribute = result.attributes.find(attribute => attribute.name === "Color");
    regularColor.classList.add("regular");
    regularColor.textContent = `${colorAttribute.terms[0].name}`;

    tagHolder.appendChild(boldColor);
    tagHolder.appendChild(regularColor);

    const sizeLine = document.createElement("div");
    sizeLine.classList.add("size_line");

    const boldSize = document.createElement("p");
    boldSize.classList.add("bold");
    boldSize.textContent = `Size`

    const regularSize = document.createElement("p");
    regularSize.classList.add("regular_size");

    const sizeImage = new Image();
    sizeImage.src = "Images/size.png";
    sizeImage.alt = "Find your size logo";
    sizeImage.classList.add("size_logo");

    sizeLine.appendChild(boldSize);
    sizeLine.appendChild(regularSize);
    sizeLine.appendChild(sizeImage);

    const errorAppear = document.createElement("div");
    errorAppear.classList.add("error_here");

    const sizePDiv = document.createElement("div");
    sizePDiv.classList.add("size_p");

    const button = document.createElement("button");
    button.classList.add("cta_bag");
    button.textContent = `add to cart`;

    productDiv.appendChild(flexDiv);    
    productDiv.appendChild(productDesc);
    productDiv.appendChild(tagHolder);
    productDiv.appendChild(sizeLine);
    productDiv.appendChild(errorAppear);
    productDiv.appendChild(sizePDiv);
    productDiv.appendChild(button);

    detailContainer.appendChild(productImg);
    detailContainer.appendChild(productDiv);

    const longDesc = document.createElement("p");
    longDesc.classList.add("properties");
    longDesc.innerHTML = `${result.description}`;

    PropertiesContainer.appendChild(longDesc);
}
import setToFeatured from "../buttons/setToFeatured.js";

export function populateEditPage(product) {
    let productImage = product.attributes.Image.data.attributes.url;
    const productImageAlt = product.attributes.Image_alt_text;
    const productTitle = product.attributes.Title;
    const productPrice = product.attributes.Price;
    const featured = product.attributes.Featured;
    const productDescription = product.attributes.Description;

    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const price = document.querySelector("#price");
    const previewImgContainer = document.querySelector(".preview__img__container")
    const imageAlt = document.querySelector("#image__alt");
    const featuredInput = document.querySelector(".featured__checkbox");
    const productId = document.querySelector("#product__id");

    title.value = productTitle;
    description.value = productDescription;
    price.value = parseFloat(productPrice);
    imageAlt.value = productImageAlt;
    featuredInput.checked = featured;

    previewImgContainer.innerHTML = `
    <label for="preview__img">Current image</label>
    <img src="${productImage}" alt="${productImageAlt}" class="preview__img" id="preview__img">`;
    productId.value = product.id;

    setToFeatured();
};

export function populateWithNewImage(image) {
    const imageName = document.querySelector("#image__name");
    console.log(image)
    imageName.value = image.name;
    console.log(imageName.value)


    const previewNewImgContainer = document.querySelector(".preview__new__img__container")
    if (image) {
        previewNewImgContainer.innerHTML = `
        <label for="preview__new__img">New image</label>
        <img src="${image.url}" alt="new image, please write alt text in input field below"" class="preview__img" id="preview__img">`;
    }
}
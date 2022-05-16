import { baseUrl } from "../../data/api.js";
import { saveToFavorites, getProductFromFavorites, getProductFromBasket, saveToBasket, getToken } from "../../utils/storage.js";
import displayMessage from "../common/displayMessage.js";
import MESSAGES from "../../constants/messages.js";

export async function editProduct(title, description, price, alt, featured, id) {
    const url = `${baseUrl}products/${id}?populate=*`;
    const token = getToken();
    const imageUploadId = document.querySelector("#image__id");
    const newImageId = imageUploadId.value;
    const editForm = document.querySelector(".edit__product__form");
    console.log(newImageId);
    const formData = new FormData(editForm);
    const body = new FormData();

    const file = formData.get("files.Image");
    body.append("files.Image", file);
    formData.delete("files.Image");
    const data = JSON.stringify({ Title: title, Description: description, Price: price, Image: newImageId, Image_alt_text: alt, Featured: featured });
    body.append("data", data);

    const options = {
        method: "PUT",
        body,
        headers: { "Authorization": `Bearer ${token}` },
        enctype: "multipart/form-data"
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);
        if (json.data.attributes.updatedAt) {
            displayMessage("success", MESSAGES.productEdited, ".message__container");
            window.scrollTo(0, 0)
            const newProductImage = json.data.attributes.Image.data.attributes.url;
            console.log(newProductImage)

            const currentProductsInBasket = getProductFromBasket();
            const productExistInBasket = currentProductsInBasket.find((product) => {
                return product.id === id;
            });

            if (productExistInBasket) {
                const productQuantity = productExistInBasket.quantity;
                const updatedProductsInBasket = currentProductsInBasket.filter(product => product.id !== id);
                saveToBasket(updatedProductsInBasket);

                const updatedProduct = { id: id, title: title, image: newProductImage, alt: alt, price: price, quantity: productQuantity }
                const updatedBasket = getProductFromBasket();
                updatedBasket.push(updatedProduct);
                saveToBasket(updatedBasket);
            }

            const currentFavorites = getProductFromFavorites();
            const productExistsInFavorites = currentFavorites.find((fav) => {
                return fav.id === id;
            })

            if (productExistsInFavorites) {
                const updatedProductsInFavorite = currentFavorites.filter((fav) => fav.id !== id);
                saveToFavorites(updatedProductsInFavorite);

                const updatedProduct = { id: id, title: title, image: newProductImage, alt: alt, price: price };
                const updatedFavorites = getProductFromFavorites();
                updatedFavorites.push(updatedProduct);
                saveToFavorites(updatedFavorites);
            }
        }
        if (json.data.attributes.error) {
            console.log(json.data.attributes.message)
            displayMessage("error", MESSAGES.error, ".message__container")
        }
    } catch (error) {
        console.log(error);
        displayMessage("error", MESSAGES.error, ".message__container");
    }
}
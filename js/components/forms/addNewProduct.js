import { baseUrl } from "../../data/api.js";
import { getToken } from "../../utils/storage.js";
import displayMessage from "../common/displayMessage.js";
import MESSAGES from "../../constants/messages.js";

export default async function addNewProduct(title, description, price, image, alt, featured) {
    const url = baseUrl + "products?populate=*";
    const data = JSON.stringify({ Title: title, Description: description, Price: price, Image_alt_text: alt, Featured: featured })
    const token = getToken();
    console.log(token)
    const addProductForm = document.querySelector(".add__product__form");
    console.log(image)

    const formData = new FormData();
    formData.append("files.Image", image, image.name);
    formData.append("data", data)

    const options = {
        method: "POST",
        body: formData,
        headers: { Authorization: `bearer ${token}` },
        enctype: "multipart/form-data"
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json)
        if (json.data.attributes.createdAt) {
            displayMessage("success", MESSAGES.productCreated, ".message__container");
            addProductForm.reset();
            window.scrollTo(0, 0)
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
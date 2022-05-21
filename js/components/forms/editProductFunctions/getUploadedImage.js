import { baseUrl } from "../../../data/api.js";
import { getToken } from "../../../utils/storage.js";
import { populateWithNewImage } from "./populateEditPage.js";

export default async function getUploadedImage(imageId) {
    const uploadedImageUrl = baseUrl + "upload/files/" + imageId;
    const token = getToken();
    const headers = { "Authorization": `Bearer ${token}` };
    try {
        const response = await fetch(uploadedImageUrl, { headers });
        const image = await response.json();
        populateWithNewImage(image)
    } catch (error) {
        console.log(error)
    }
}
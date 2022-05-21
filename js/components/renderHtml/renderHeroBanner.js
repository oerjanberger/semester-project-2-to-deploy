export default function renderHeroBanner(heroBanner) {
    const homeBannerImg = document.querySelector(".herobanner__container")
    const imgUrl = heroBanner.data.attributes.Hero_banner.data.attributes.url;
    const imgAlt = heroBanner.data.Hero_banner_alt_text
    homeBannerImg.innerHTML = `<div class="herobanner__img" style="background-image: url('${imgUrl}');" alt="${imgAlt}"></div>`
}
import { getProductCard } from "./module/productCard.js";
import { getProductList } from "./module/productList.js";
import { fetchSectionListData } from "./module/fetch.js";
import { setButtonEvent, setFilterEvent } from "./module/productFilter.js";

const sectionInfoList = await fetchSectionListData();

const productList = sectionInfoList.reduce((prev, curr) => [...prev, ...curr.productList], []);

const section = document.getElementsByTagName('section')[0];
const ProductListDOM = getProductList(productList);
section.appendChild(ProductListDOM);

setFilterEvent();
setButtonEvent(productList);


// //수정 전 버전
// const sectionDOM = document.getElementsByTagName('section')[0];
// const productCard = makeDOMwithProperties('div', {
//   className: 'product-card',
// });

// // --- product-image-con ---
// const productImageCon = makeDOMwithProperties('div', {
//   className: 'product-image-con',
// });
// const productImage = makeDOMwithProperties('img', {
//   src: "./public/assets/파프리카.jpg",
//   alt: "파프리카",
// });
// const cartToggleBtn = makeDOMwithProperties('button', {
//   className: 'cart-toggle-btn',
//   type: 'button',
// });
// const cartImage = makeDOMwithProperties('img', {
//   src: './public/assets/cart.png',
//   className: 'cart-image',
// });
// cartToggleBtn.appendChild(cartImage);
// appendChildrenList(productImageCon, [productImage, cartToggleBtn]);
// // --- product-image-con ---

// // --- product-description ---
// const productDescription = makeDOMwithProperties('div', {
//   className: 'product-description',
// });
// const productName = makeDOMwithProperties('div', {
//   className: 'product-name',
//   innerHTML: "파프리카 2입",
// });
// const productPriceCon = makeDOMwithProperties('div', {
//   className: 'product-price-con',
// });
// const productDiscountPercent = makeDOMwithProperties('div', {
//   className: 'product-discount-percent',
//   innerHTML: "20%"
// });
// const productPrice = makeDOMwithProperties('div', {
//   className: 'product-price',
//   innerHTML: "2,000원",
// });
// const productOriginalPrice = makeDOMwithProperties('div', {
//   className: 'product-original-price',
//   innerHTML: "2,500원",
// });
// appendChildrenList(productPriceCon, [productDiscountPercent, productPrice]);
// appendChildrenList(productDescription, [productName, productPriceCon, productOriginalPrice]);
// // --- product-description ---

// appendChildrenList(productCard, [productImageCon, productDescription]);

// // 수정 전 버전
// const productCard = getProductCard({
//   "id": 1,
//   "imgSrc": "/js_basic_market/public/assets/파프리카.jpg",
//   "name": "파프리카 2입",
//   "discountPercent": 20,
//   "price": 2000,
//   "originalPrice": 2500
// });

// const productCard2 = getProductCard({
//   "id": 2,
//   "imgSrc": "/js_basic_market/public/assets/당근.jpg",
//   "name": "친환경 당근 400g",
//   "discountPercent": 33,
//   "price": 2000,
//   "originalPrice": 3000
// });

// sectionDOM.appendChild(productCard);
// sectionDOM.appendChild(productCard2);
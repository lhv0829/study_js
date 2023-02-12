import { makeDOMwithProperties } from "../utils/dom.js";
import { getProductCard } from "./productCard.js";

export const getProductList = (productInfoList) => {
  if(productInfoList == null || !Array.isArray(productInfoList)) return;
  const productListContainer = makeDOMwithProperties('div', {
    className: 'product-list-con',
  });

  productInfoList.forEach((productInfo) => {
    // const { id, imgSrc, name, discountPercent, price, originalPrice} = productInfo;
    // productListContainer.appendChild(
    //   getProductCard({
    //     id,
    //     imgSrc,
    //     name,
    //     discountPercent,
    //     price,
    //     originalPrice,
    //   })
    // );
    productListContainer.appendChild(
      getProductCard({
        ...productInfo,
      })
    );
  });
  return productListContainer;
};
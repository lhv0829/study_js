import { appendChildrenList, makeDOMwithProperties } from "../utils/dom.js";
import { getProductList } from "./productList.js";

export const getProductSection = (sectionName, productInfoList) => {
  const productListSection = makeDOMwithProperties('div', {
    className: 'product-list-section',
  });

  const sectionTitle = makeDOMwithProperties('div', {
    className: 'section-title',
  });
  const titleHightlight = makeDOMwithProperties('span', {
    className: 'section-title-hightlight',
  });
  const title = makeDOMwithProperties('span', {
    innerHTML: sectionName,
  });

appendChildrenList(sectionTitle, [titleHightlight, title]);

const productListContainer = getProductList(productInfoList);

appendChildrenList(productListSection, [sectionTitle, productListContainer]);

return productListSection;
};
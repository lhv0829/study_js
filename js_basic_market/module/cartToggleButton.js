import { CART_COOKIE_KEY } from "../constants/cart.js";
import { makeDOMwithProperties } from "../utils/dom.js";

export const getCartInfo = () => JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || []; // null undefined || []

const isInCart = ({ id }) => { // 구조분해할당으로 id만 추출
  // 현재 해당 상품이 장바구니 안에 있는지 판단하여 결과를 반환
  const originalCartInfo = getCartInfo();

  return !!originalCartInfo.find((cartInfo) => { // !!을 두개 붙인다는 것은 Boolean()을 사용하지 않고도 해당 값을 boolean값으로 변환하겠다는 뜻의 명시적 형변환
    return cartInfo.id === id; // 중괄호를 지우고 소괄호만 나타내고 return을 지워도 바로 return을 하겠다는 같은 의미. 아니면 아예 중괄호와 소괄호를 다 지우고 화살표 바로 뒤에 구문을 쓰면 바로 해당 값을 리턴하는 함수로 받아들여진다
  }); // find
};

const addCartInfo = (productInfo) => {
  console.log('addCartInfo');
  // 장바구니에 해당 물품의 정보를 저장. 로컬스토리지 사용
  
  const originalCartInfo = getCartInfo(); 
  // null이나 undefined가 앞에 나왔을 대 뒤에 있는 값을 할당해 주는 문법
  
  if(originalCartInfo.findIndex((cartInfo) => cartInfo.id === productInfo.id) !== -1) return; // findIndex
  // 장바구니에 이미 해당 상품이 담겨있는지를 판단
  
  localStorage.setItem(CART_COOKIE_KEY,JSON.stringify([
    ...originalCartInfo,
    productInfo,
  ]));
};

const removeCartInfo = ({ id }) => {
  //장바구니에서 해당 물품 정보 삭제
  const originalCartInfo = getCartInfo(); 
  const newCartInfo = originalCartInfo.filter((cartInfo) => cartInfo.id !== id); // filter

  localStorage.setItem(CART_COOKIE_KEY, JSON.stringify(newCartInfo));
};

export const getCartToggleButton = (productInfo, removeCartCallback) => {
  let inCart = isInCart(productInfo);
  const cartToggleBtn = makeDOMwithProperties('button', {
    className: 'cart-toggle-btn',
    type: 'button',
    onclick: () => {
      if(inCart){
        if(!confirm(`${productInfo.name}을 장바구니에서 삭제할까요?`)) return;       
        removeCartInfo(productInfo);
        cartImage.src = './public/assets/cart.png';
        removeCartCallback?.(); // optional chaining
      } else {
        addCartInfo(productInfo); // 장바구니에 넣기
        cartImage.src = './public/assets/cartDisabled.png';
        const result = confirm("장바구니에 담았습니다. 장바구니 페이지로 이동할까요?");
        if(result) location = "/js_basic_market/cart.html";
      }
      inCart = !inCart;
    }
  });
  const cartImage = makeDOMwithProperties('img', {
    src: inCart ? './public/assets/cartDisabled.png' : './public/assets/cart.png',
    className: 'cart-image',
  });
  cartToggleBtn.appendChild(cartImage);

  return cartToggleBtn;
};
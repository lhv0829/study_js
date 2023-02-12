export const makeDOMwithProperties = (domType, propertyMap) => {
  // domType : div, a, li...
  // propertyMap : {"className" : "product-card", "alt" : ...}
  // Object.keys(propertyMap) -> ["className", "alt"]
  const dom = document.createElement(domType);
  Object.keys(propertyMap).forEach((key) => {
    dom[key] = propertyMap[key];
  });
  return dom;
};

export const appendChildrenList = (target, childrenList) => {
  if (!Array.isArray(childrenList)) return; // early return. Array가 아닐 경우 false가 나올테고 부정연산자를 사용하면 true가 나올테니 그렇게 되는 경우에 그냥 return

  childrenList.forEach((children) => {
    target.appendChild(children);
  })
};
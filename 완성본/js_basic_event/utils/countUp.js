
//dom.innerHTML을 갱신 -> 매개변수 dom
//innerHTML이 n초를 간격으로 갱신 -> second : 몇 초가 걸릴지(n)
// valuw += k(특정 수) -> term : 몇 씩 증가할 지(k)
//target number에 도착했을 경우 더 이상 애니메이션 진행 X -> 매개변수 target(목표 숫자)
export const countUp = (dom, target, second, term = 15) => {
  if (!dom || isNaN(Number(target)) || isNaN(Number(second))) return;
  const countTerm = Math.floor((target / second) / (1000 / term));

  // target / second -> 1초에 몇씩 증가할 지
  // term초에 몇씩 증가할까요?
  // second -> 초, term -> 밀리 초
  
  let nowNum = 0;

  const timerId = setInterval(() => {
    if (nowNum > target) {
      nowNum = target;
      clearInterval(timerId);
    }

    dom.innerHTML = `${nowNum.toLocaleString()}`;
    nowNum += countTerm;
  }, term);
};

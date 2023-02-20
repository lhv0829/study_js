import { handleModalClose } from "./utils/modal.js";
import { initBoxState, setBoxDom } from "./module/mouseControlModule.js";
import { stopTimer, setTimer } from "./utils/timer.js";

const onMouseControlGameEnd = () => {
  stopTimer(); // 타이머가 멈추고
  setTimer(0);
  initBoxState();
};

const initializeMouseControlGame = () => {
  // retry 버튼이 없음 
  const modalButtonContainer = document.getElementsByClassName('modal-button-container')[0];
  const [, retryButton] = modalButtonContainer.children;
  retryButton.onclick = () => handleModalClose(onMouseControlGameEnd);
};

/* const initialize = () => {
  // modal의 버튼을 세팅
  // retryButton에 게임 상태를 원복하는 함수를 실행
  const retryButton = document.getElementsByClassName('retry-button')[0];
  retryButton.onclick = () => handleModalClose(onMouseControlGameEnd);
}; */

export const gameField = document.getElementById('game-field');
setBoxDom({
  row: 5,
  col: 5,
  start: [0, 0],
  end: [4, 4],
  walls: [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
  ]
});
initializeMouseControlGame();

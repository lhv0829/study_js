import { handleModalOpen, handleModalClose } from './module/modal.js';
import { getResultTimeString, startTimer, setTimer, stopTimer, getNowTime } from './utils/timer.js';
import { TOUCH_NUMBER_SCORE_KEY } from './constants/localstorage.js';

const numberButtonList = document.getElementsByClassName('number-button');
const maxId = numberButtonList.length; 
let currentNumber = 0;

export const initNumberButtonGame = () => {
  for(let numberButton of numberButtonList) {
    numberButton.style.display = 'block';
  }
  currentNumber = 0;
};

const handleSuccessGame = () => {
  handleModalOpen({
    isSuccess: true,
    timeString: getResultTimeString(),
  });
  stopTimer();
  const nowScore = getNowTime();
  const currentScore = localStorage.getItem(TOUCH_NUMBER_SCORE_KEY);
  if (!currentScore || currentScore > nowScore) {
    localStorage.setItem(TOUCH_NUMBER_SCORE_KEY, nowScore);
  }
  setTimer(0);
};

const handleFailedGame = () => {
  stopTimer();
  handleModalClose(setButtonDOM);
  setTimer(0);
};

const setButtonDOM = () => {  
  // 1. HTML 상에서 domList를 받아옴
  // 2. 순회하면서 dom의 위치를 조정(랜덤으로)
  // 3. dom 클릭 시 핸들러 등록
  for(let numberButton of numberButtonList) {
    const top = Math.floor(Math.random() * 100 * 0.9);
    const left = Math.floor(Math.random() * 100 * 0.9);
    numberButton.style.top = `${top}%`;
    numberButton.style.left = `${left}%`;
    numberButton.onclick = (event) => {
      // 1. 클릭한 수를 찾아오기
      // 2. 수가 현재 클릭되어야 하는 순서가 맞는 지 판단 -> 아니라면 무시, 맞다면 해당 numberButton을 없앰
      // 3. 1을 클릭했을 때는 타이머 시작
      // 4. 10을 클릭했을 때는 타이머 멈춤 -> 성공 모달
      const numId = Number(event.target.innerHTML);
      if (isNaN(numId)) return;
      if (numId === 1) {
        startTimer(handleFailedGame);
      }
      if (numId !== currentNumber + 1) {
        return;
      }
      event.target.style.display = 'none';
      if (numId === maxId) {
        handleSuccessGame();
        return;
      }
      currentNumber++;
    }
  }
};

const onTouchNumberGameEnd = () => {
  stopTimer();
  setTimer(0);
  initNumberButtonGame();
  setButtonDOM();
};

const initializeTouchNumberGame = () => {
  // modal - retry, header - retry 세팅
  // 클릭 시 모달 닫기, 상태를 원복
  const headerRetryButton = document.getElementsByClassName('retry-button')[0];
  const modalButtonContainer = document.getElementsByClassName('modal-button-container')[0];
  const [, retryButton] = modalButtonContainer.children;
  retryButton.onclick = () => {
    handleModalClose(onTouchNumberGameEnd);
  };
  headerRetryButton.onclick = () => {
    handleModalClose(onTouchNumberGameEnd);
  }
};

setButtonDOM();
initializeTouchNumberGame();


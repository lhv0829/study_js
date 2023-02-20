import { ARROW_SPEED_SCORE_KEY } from "./constants/localstorage.js";
import { handleModalClose, handleModalOpen } from "./module/modal.js";
import { makeDOMwithProperties } from "./utils/dom.js";
import { getNowTime, getResultTimeString, setTimer, startTimer, stopTimer } from "./utils/timer.js";

const MAX_ARROW = 8;
const MAX_ROUND = 3;

let round = 1;
let arrowDOMList = [];
let currentIndex = 0;

const handleSuccessGame = () => {
  handleModalOpen({
    isSuccess: true,
    timeString: getResultTimeString(),
  })
  stopTimer();
  const nowScore = getNowTime();
  const currentScore = localStorage.getItem(ARROW_SPEED_SCORE_KEY);
  if (!currentScore || currentScore > nowScore) {
    localStorage.setItem(ARROW_SPEED_SCORE_KEY, nowScore);
  }
  setTimer(0);
};

const arrowFieldDOM = document.getElementById('arrow-field');

const clearArrowDOM = () => {
  arrowDOMList.forEach((arrowDOM) => {
    arrowDOM.remove();
  });
  arrowDOMList = [];
};

const setArrowDOM = () => {
  // 1. 기존에 존재하고 있던 arrowDOM이 있으면 삭제
  // 2. 새로 DOM을 만들어서 세팅
  // 3. 랜덤으로 왼쪽, 오른쪽을 결정
  clearArrowDOM();
  for(let i=0; i<MAX_ARROW; i++) {
    const direction = Math.random() > 0.5 ? 'left': 'right';
    const arrowDOM = makeDOMwithProperties('span', {
      className: `arrow arrow-${direction}`,
      innerHTML: direction === 'left' ? '&lt;': '&gt',
    });
    arrowDOMList.push(arrowDOM);
    arrowFieldDOM.appendChild(arrowDOM);
  }
};

const setKeyboardEvent = () => {
  // 이벤트 핸들러 등록 -> keydown
  // 왼쪽 방향키 || 오른쪽 방향키가 클릭되면
  // 현재 눌러져야 할 방향키 방향과 같다면 실행
  const handleCorrect = () => {
    // 방향키 DOM을 안보이게 만들어야 함
    // currentIndex++;
    // 모든 방향키가 다 눌렀다면 다음 라운드로 진행
    arrowDOMList[currentIndex].style.display = 'none';
    currentIndex++;
    if (currentIndex === MAX_ARROW) {
      if (round === MAX_ROUND) {
        handleSuccessGame(); // 게임 종료
      }
      currentIndex = 0;
      setArrowDOM();
      round += 1;
    }
  };

  window.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    const isFirst = currentIndex === 0 && round === 1;
    if (isFirst) startTimer();
    const isLeft = arrowDOMList[currentIndex].innerHTML === '&lt;';
    if (isLeft && event.key === 'ArrowLeft') {
      handleCorrect();
    }
    if (!isLeft && event.key === 'ArrowRight') {
      handleCorrect();
    }
    // 실패
  });
};

const onArrowSpeedGameEnd = () => {
  stopTimer();
  setTimer(0);
  currentIndex = 0;
  round = 1;
  setArrowDOM();
};

const initializeArrowSpeedGame = () => {
  // retryButton에 timer 세팅과 상태 원복 코드를 삽입
  const headerRetryButton = document.getElementsByClassName('retry-button')[0];
  const modalButtonContainer = document.getElementsByClassName('modal-button-container')[0];
  const [homeAnchorButton, retryButton] = modalButtonContainer.children;
  homeAnchorButton.onclick = () => handleModalClose(onArrowSpeedGameEnd);
  retryButton.onclick = () => handleModalClose(onArrowSpeedGameEnd);
  headerRetryButton.onclick = () => handleModalClose(onArrowSpeedGameEnd);
};


setArrowDOM();
setKeyboardEvent();
initializeArrowSpeedGame();

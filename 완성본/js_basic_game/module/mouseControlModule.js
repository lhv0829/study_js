import { gameField } from "../mouseControl.js";
import { MOUSE_CONTROL_SCORE_KEY } from "../constants/localstorage.js";
import { makeDOMwithProperties } from "../utils/dom.js";
import { isGameStart, getResultTimeString, startTimer, stopTimer, getNowTime, setTimer } from '../utils/timer.js';
import { handleModalOpen } from "../utils/modal.js";

let boxDOMList = []; // normal한 boxDOM
let wallBoxDOMList = []; // 벽에 해당하는 boxDOM
let startBoxDOM = null; // 시작 위치에 해당하는 boxDOM
let endBoxDOM = null; //  종료 위치에 해당하는 boxDOM

export const initBoxState = () => {
  startBoxDOM.innerHTML = '시작';
  boxDOMList.forEach((boxDOM) => {
    boxDOM.style.backgroundColor = 'transparent';
  })
  endBoxDOM.innerHTML = '끝';
};

const handleSuccessGame = () => { // 성공 modal
  stopTimer();
  
  handleModalOpen({
    isSuccess: true,
    timeString: getResultTimeString(),
  });

  const nowScore = getNowTime();
  const currentScore = localStorage.getItem(MOUSE_CONTROL_SCORE_KEY);
  if (!currentScore || currentScore > nowScore) {
    localStorage.setItem(MOUSE_CONTROL_SCORE_KEY, nowScore);
  }
  setTimer(0);
};

const handleFailedGame = () => { // 실패 modal
  stopTimer();
  handleModalOpen({
    isSuccess: false,
  });
  setTimer(0);
};

export const setBoxDom = ({ // control-box-container를 만들고, 그 내부에 box들을 채우기
  row,
  col,
  start,
  end,
  walls,
}) => {
  const controlBoxContainer = makeDOMwithProperties('div', {
    id: 'control-box-container',
    onmouseleave: () => { // 게임 필드를 벗어났을 때 실패
      if (!isGameStart) return;
      handleFailedGame();
    }
  });
  controlBoxContainer.style.gridTemplateRows = `repeat(${row}, 1fr)`;
  controlBoxContainer.style.gridTemplateColumns = `repeat(${col}, 1fr)`;

  for(let i=0; i<row; i++) {
    for(let j=0; j<col; j++) {
      const { type, className, onmouseover, innerHTML = '' } = (function(){ // 익명함수를 바로 실행하는 식으로 하면 익명함수를 실행해서 나온 return문 결과가 바로 변수로 할당
        if (i === start[0] && j === start[1]) return { // 시작 위치
          type: 'start', // !! 시작 위치면 타입이 start
          className: 'control-box start',
          onmouseover: (event) => { // 게임 시작 -> 타이머가 시작되고 innerHTML없애기. 게임 시작 변수 변경
            startTimer(() => {
              handleFailedGame();
            });
            event.target.innerHTML = ''; 
          },
          innerHTML: '시작',
        };
        if (i === end[0] && j === end[1]) return { // 종료 위치
          type: 'end', // !! 종료 위치면 타입이 end
          className: 'control-box end',
          onmouseover: (event) => { // 게임 끝 -> 타이머가 종료. 성공 모달이 뜨고 innerHTML없애기.  게임 시작 변수가 세팅되었을 때 작동
            if (!isGameStart) return;
            event.target.innerHTML = '';
            handleSuccessGame();
          },
          innerHTML: '끝',
        };
        for(let wall of walls) {
          if (i === wall[0] && j === wall[1]) return { // 벽의 위치
            type: 'wall',
            className: 'control-box wall',
            onmouseover: () => { // 게임 끝 -> 타이머가 종료되고 실패 모달이 뜸. 게임 시작 변수가 세팅되었을 때 작동
              if (!isGameStart) return;
              handleFailedGame();
            },
          };
        }
        return { // 전부 아닐 경우 길
          type: 'normal',
          className:'control-box',
          onmouseover: (event) => { // 길에 도착하면 길의 색상이 변경. 게임 시작 변수가 세팅되었을 때 작동
            if (!isGameStart) return;
            event.target.style.backgroundColor = 'linen';
          }
        };
      }());
      const boxDOM = makeDOMwithProperties('div', {
        className,
        onmouseover,
        innerHTML,
        id: `box-${i}-${j}`,
      });
      
      switch(type) {
        case 'start': 
          startBoxDOM = boxDOM;
          break;
        case 'end':
          endBoxDOM = boxDOM;
          break;
        case 'wall':
          wallBoxDOMList.push(boxDOM);
          break;
        default:
          boxDOMList.push(boxDOM);
      }

      controlBoxContainer.appendChild(boxDOM);
    }
  }
  gameField.appendChild(controlBoxContainer);
};

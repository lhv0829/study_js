const MAX_TIMER = 3600*24;
const timerDOM = document.getElementsByClassName('game-time')[0];

export let isGameStart = false;
let time = 0;
let timerId = null; // 초기화

const convertToTwoNumber = (num) => {
  const stringNum = `${num}`;
  if (stringNum.length === 1) return `0${stringNum}`;
  else return stringNum;
}

export const getTimeString = (time) => { // e.g. time = 0, return "00:00:00"
  // 60s -> 00:01:00
  // 3600s -> 01:00:00
  // 1시간 1분 1초 -> 3661초
  const hours = Math.floor(time / 3600); // 초단위의 총 시간을 3600으로 나눈 값을 hour에 할당
  time = time - hours * 3600; // hour를 뺀 나머지
  const minutes = Math.floor(time / 60); // hour를 뺀 나머지의 시간에서 60으로 나눈 값을 minute에 할당
  time = time - minutes * 60; // hour과 minute을 뺀 나머지
  const seconds = time;

  return `${convertToTwoNumber(hours)}:${convertToTwoNumber(minutes)}:${convertToTwoNumber(seconds)}`;
};

export const startTimer = (onTimeOver) => {
  isGameStart = true;
  timerId = setInterval(() => {
    time++;
    timerDOM.innerHTML = getTimeString(time);
    if (MAX_TIMER < time) { // 시간 초과
      onTimeOver?.();
      clearInterval(timerId);
    }
  }, 1000);
};

export const stopTimer = () => {
  isGameStart = false;
  if (timerId == null) return;
  clearInterval(timerId);
}

export const getResultTimeString = () => {
  return getTimeString(time);
}

export const getNowTime = () => {
  return time;
}

export const setTimer = (initTime) => {
  time = initTime;
  timerDOM.innerHTML = getTimeString(time);
};

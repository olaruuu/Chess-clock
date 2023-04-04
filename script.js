'use strict';

const timeSelector = document.querySelector('.time-selector');
const timeOptions = document.querySelector('.time-selection');
const timeList = document.querySelectorAll('.time--list');
const backButton = document.querySelector('.back');
const players = document.querySelectorAll('.player');
const player1 = document.querySelector('.player--1');
const player2 = document.querySelector('.player--2');
const moves1 = document.querySelector('.moves--1');
const moves2 = document.querySelector('.moves--2');
const clock1 = document.querySelector('.clock--1');
const clock2 = document.querySelector('.clock--2');
const clocks = document.querySelectorAll('.clock');
const movess = document.querySelectorAll('.moves');
const clockType = document.querySelectorAll('.clock-type');
const restartTimer = document.querySelector('.restart');
const pauseTimer = document.querySelector('.pause');

let player1Time,
  player2Time,
  player1Moves,
  player2Moves,
  player1Interval,
  player2Interval,
  player1active,
  player2active,
  activeTime;

// For formatting the time to display the time remaining
const formatTime = function (time) {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

// For formatting the time for time type '1 min'
const formatClockTime = function (time) {
  const minutes = Math.floor(time / 60).toString();
  return minutes;
};
// The start conditions
const restart = function (time = 600) {
  player1Time = time;
  player2Time = time;
  player1Moves = 1;
  player2Moves = 1;
  player1Interval;
  player2Interval;
  player1active = true;
  player2active = true;
  player1.classList.remove('active');
  player2.classList.remove('active');
  player1.classList.remove('time-out');
  player2.classList.remove('time-out');
  clock1.textContent = formatTime(player1Time);
  clock2.textContent = formatTime(player2Time);
  moves1.textContent = moves2.textContent = `Moves: 0`;
  clearInterval(player1Interval);
  clearInterval(player2Interval);
  clockType.forEach(
    e => (e.textContent = `${formatClockTime(player1Time)} min`)
  );
};
restart();
// Player 1, adding the active class and starting the timer
const player1Start = function () {
  player1Interval = setInterval(() => {
    // If the time runs out
    if (player1Time <= 1) {
      player1.classList.remove('active');
      player1.classList.add('time-out');
      clearInterval(player1Interval);
      player1active = false;
    }
    // Decreasing the time and displaying it
    player1Time--;
    clock1.textContent = formatTime(player1Time);
  }, 1000);
};
// Player 2, same as above
const player2Start = function () {
  player2Interval = setInterval(() => {
    if (player2Time <= 1) {
      player2.classList.remove('active');
      player2.classList.add('time-out');
      clearInterval(player2Interval);
      player2active = false;
    }
    player2Time--;
    clock2.textContent = formatTime(player2Time);
  }, 1000);
};
// For getting the id from the time list, in order to start the timer based on that id
const getMinuteId = function () {
  timeList.forEach(e =>
    e.addEventListener('click', function () {
      const timeSelected = +e.id;
      // Active time needed because if it is active, we restart the clock with the activeTime
      activeTime = timeSelected;
      // Removing the list, after selecting the time
      timeOptions.classList.add('section-hidden');
      if (!timeSelected) return;
      // Restarting the whole clock with the time selected based on the id
      restart(timeSelected);
    })
  );
};
getMinuteId();

// Player 1, adding the click event and the login to switch between players
player1.addEventListener('click', function () {
  // This prevents extra clicks on the inactive player
  if (!player1active) return;
  if (player1active) {
    player2Start();
    clearInterval(player1Interval);
    player2.classList.add('active');
    player1.classList.remove('active');
    moves1.textContent = `Moves: ${player1Moves++}`;
    player1active = false;
    player2active = true;
  }
});
// Player2, same as above
player2.addEventListener('click', function () {
  if (!player2active) return;
  if (player2active) {
    player1Start();
    clearInterval(player2Interval);
    player1.classList.add('active');
    player2.classList.remove('active');
    moves2.textContent = `Moves: ${player2Moves++}`;
    player2active = false;
    player1active = true;
  }
});
// Restarting the timer
restartTimer.addEventListener('click', function () {
  if (activeTime) restart(activeTime);
  if (!activeTime) restart();
});
// Listing the time options
timeSelector.addEventListener('click', function () {
  timeOptions.classList.remove('section-hidden');
});
// The back button in the list
backButton.addEventListener('click', function () {
  timeOptions.classList.add('section-hidden');
});
// Pausing the timer
pauseTimer.addEventListener('click', function () {
  player1.classList.remove('active');
  player2.classList.remove('active');
  clearInterval(player1Interval);
  clearInterval(player2Interval);
});

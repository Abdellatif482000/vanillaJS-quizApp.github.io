const container = document.querySelector('.container');

const startBtn = document.querySelector('#start');
const historyBtn = document.querySelector('#history');
const openingPage = document.querySelector('.opening');


startBtn.addEventListener('click', () => {
    location.replace('./quiz.html')
})

historyBtn.addEventListener('click', () => {
    location.replace('./history.html')
})
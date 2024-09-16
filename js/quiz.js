const container = document.querySelector('.container');

// ------------*starting Details*----------
function userInfo(userName, userScore, userAnswers) {
    this.userName = userName,
        this.userScore = userScore,
        this.userAnswers = userAnswers
}
let usersArr = Array();
// ------------*starting Details*----------

// --------*User Answers*----------
function QObj(q, qScore, userAnswer) {
    this.q = q,
        this.qScore = qScore,
        this.userAnswer = userAnswer
}
let QArr = Array();
// --------*User Answers*----------

// -------------*localStorge*------------
function saveUsers(storageUsers) {
    let users;
    if (localStorage.getItem('users') === null) {
        users = [];
    } else {
        users = JSON.parse(localStorage.getItem('users'));
    }

    users.push(storageUsers);
    localStorage.setItem('users', JSON.stringify(users));
}
// -------------*localStorge*------------

// ------------*SCORE*------------
let score = 0;
const SCORE_POINTS = 100;

function incrementScore(num) {
    score += num
}
// ------------*SCORE*------------

window.addEventListener('DOMContentLoaded', () => {
    insertName();
})

function insertName() {

    const info = document.createElement('div');
    info.setAttribute('class', 'info');

    container.appendChild(info)

    info.innerHTML = `
    <input type="text" class="userName my-2" placeholder='Name'>
    <button class="submitName btn my-2">Start</button>
    <button class="back btn my-3">Back</button>
    `;
    const submit = document.querySelector('.submitName');
    submit.addEventListener('click', submitName);

    const userNameInput = document.querySelector('.userName')

    function submitName() {

        if (userNameInput.value === "" || userNameInput.value === " ") {
            const emptyInputMassage = document.createElement('div');
            container.appendChild(emptyInputMassage);
            emptyInputMassage.innerHTML = `<p class='emptyInputMassage'>Fill it</p>`

            setTimeout(() => {
                emptyInputMassage.remove();
            }, 2000)


        } else {
            saveUsers(new userInfo(userNameInput.value, 000, []));
            usersArr.push(new userInfo(userNameInput.value, 000, []));

            startQuiz()
            info.remove()
        }
    }

    const restart = document.querySelector('.back');
    restart.addEventListener('click', () => {
        location.replace('./index.html')
    })
}

function startQuiz() {

    const upperBar = document.createElement('div');
    upperBar.setAttribute('class', 'upperBar');
    container.appendChild(upperBar);

    upperBar.innerHTML = `
        <div class="time">00:00</div>
    `
    questionShowcase();

    // -------------*TIMER*------------
    const startingMIN = 2;
    let time = startingMIN * 60;

    const cD = document.querySelector('.time');
    setInterval(updateCD, 1000);

    function updateCD() {
        const mins = Math.floor(time / 60);
        let secs = time % 60
        secs = secs < 10 ? '0' + secs : secs;
        cD.innerHTML = `${mins}:${secs}`;
        time--;
        if (time === 0) {
            endQuiz()
        }
    }
    // -------------*TIMER*------------

}

function endQuiz() {
    const cD = document.querySelector('.time');
    cD.remove();

    container.innerHTML = `
                <p>Finished</p>
                <div>Score: <span class="score">${score}</span> </div>
                <button class="restart">Restart</button>
                `
    const storeArr = JSON.parse(localStorage.getItem('users'))
    const lastItem = storeArr[storeArr.length - 1]

    lastItem.userScore += score

    const newArr = QArr.values();
    for (const value of newArr) {
        lastItem.userAnswers.push(value)
            // console.log(value);
    }

    localStorage.setItem('users', JSON.stringify(storeArr));


    const restart = document.querySelector('.restart');
    restart.addEventListener('click', () => {
        location.replace('./index.html')
    })
}


function questionShowcase() {
    console.log(QArr)
    const quizShowcase = document.createElement('div');
    quizShowcase.setAttribute('class', 'quizShowcase')
    container.appendChild(quizShowcase)

    const random = Math.floor(Math.random() * questions.length);
    const questionHead = questions[random].question;
    const questionNumb = questions[random].numb;
    const answer = questions[random].answer;
    const optionA = questions[random].options[0];
    const optionB = questions[random].options[1];
    const optionC = questions[random].options[2];
    const optionD = questions[random].options[3];
    // console.log(i)
    // console.log(questionHead + " / " + questionNumb + " / answer is " + answer + " / " + optionA + " / " + optionB + " / " + optionC + " / " + optionD);
    // }

    quizShowcase.innerHTML = `
    <h2>Question #${QArr.length + 1}</h2>

    <h4>${questionHead}</h4>

    <div class="mcq">
     <button class="btn choice choice1">${optionA}</button>
     <button class="btn choice choice2">${optionB}</button>
     <button class="btn choice choice3">${optionC}</button>
     <button class="btn choice choice4">${optionD}</button>
    </div>

    `
    const mcq = document.querySelector('.mcq');
    const choices = document.querySelectorAll('.choice');

    choices.forEach(choice => {
        choice.addEventListener('click', () => {

            const confirmationMassage = document.createElement('div');
            quizShowcase.appendChild(confirmationMassage);

            confirmationMassage.innerHTML = `

            <p class='confirmMassage'>Are You Sure ? </p>
            <p>Your Answer Is ${choice.textContent}</p>

            <input type="button" value="Next Question" class='confirmAnswer'>
            <input type="button" value="Not Sure" class='notSure'>
            `;

            mcq.style.display = "none";
            const notSureBtn = document.querySelector('.notSure');
            const confirmAnswerBtn = document.querySelector('.confirmAnswer');

            confirmAnswerBtn.addEventListener('click', () => {

                quizShowcase.remove();

                // console.log(QArr)

                if (QArr.length <= questions.length - 1) {
                    questionShowcase()
                } else {
                    endQuiz()
                }

                if (choice.textContent === answer) {
                    incrementScore(SCORE_POINTS)
                    QArr.push(new QObj(questionHead, 100, choice.textContent))
                } else {
                    QArr.push(new QObj(questionHead, 000, choice.textContent))
                }
            })

            notSureBtn.addEventListener('click', () => {
                confirmationMassage.remove();
                mcq.style.display = "block";

            })

        })
    })

}
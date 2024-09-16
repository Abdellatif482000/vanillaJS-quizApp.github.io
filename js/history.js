const container = document.querySelector('.container');
const storeArr = JSON.parse(localStorage.getItem('users'))
const usersList = document.querySelector('.usersList');

document.querySelector('.back').addEventListener('click', () => {
    location.replace('./index.html')
})


const newArr = storeArr.values();

for (let value of newArr) {
    const newUser = document.createElement('li');
    usersList.appendChild(newUser);

    newUser.innerHTML = `
        <li>
            <p>User Name: ${value.userName}</p>
            <p>Score: ${value.userScore}</p>
            <button class="btn answersBtn">Answers</button>
        </li>
        `
    const answersBtns = document.querySelectorAll('.answersBtn')
    answersBtns.forEach(answersBtn => {
        answersBtn.addEventListener('click', () => {

        })
    })
}


// let i;
// for (i = 0; i <= storeArr.length; i++) {
//     const ansArr = storeArr[i].userAnswers.values()


//     for (let ansValue of ansArr) {
//         const ansShow = document.createElement('li');
//         usersList.appendChild(ansShow);

//         ansShow.innerHTML = `
//         <li>
//         <p>${ansValue.q}</p>
//         <p>${ansValue.qScore}</p>
//         <p>${ansValue.userAnswer}</p>
//         </li>
//         `
//         console.log(i)
//     }
// }
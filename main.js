

let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions = questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const result = document.querySelector('.result');

// Function to generate question
function generateQuestions(index) {
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;

    questionEl.innerHTML = `${index + 1}. ${question.question}`;
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option1.innerHTML = `${question.answer1}`;
    option2.innerHTML = `${question.answer2}`;
    option3.innerHTML = `${question.answer3}`;
}

// Function to load next question
function loadNextQuestion() {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    if (!selectedOption) {
        alert('Please select your answer!');
        return;
    }

    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));
    score.push(answerScore);

    const totalScore = score.reduce((total, currentNum) => total + currentNum, 0);

    currentQuestion++;

    selectedOption.checked = false;

    if (currentQuestion === totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }

    if (currentQuestion === totalQuestions) {
        console.log('Quiz finished. Displaying results...');
        container.style.display = 'none';
        result.innerHTML = `
            <h1 class="final-score">Your score: ${totalScore}</h1>
            <div class="summary">
                <h1>Summary</h1>
                <p>Possible Personality Traits:</p>
                <p>15 - 21: You Need Help</p>
                <p>10 - 15: Good Soul</p>
                <p>5 - 10: Meh</p>
                <p>5: Are You Even Real?</p>
            </div>
            <button class="restart">Restart Quiz</button>
        `;
        result.style.display = 'block';
        return;
    }

    generateQuestions(currentQuestion);
}

// Function to load previous question
function loadPreviousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        score.pop();
        generateQuestions(currentQuestion);
    }
}

// Function to reset and restart the quiz
function restartQuiz(e) {
    if (e.target.matches('.restart')) {
        currentQuestion = 0;
        score = [];
        container.style.display = 'block';
        result.innerHTML = '';
        nextButton.textContent = 'Next';
        generateQuestions(currentQuestion);
    }
}

generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click', loadPreviousQuestion);
result.addEventListener('click', restartQuiz);

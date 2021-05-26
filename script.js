const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');
const resultButton = document.getElementById('result-btn');
const resultText = document.getElementById('result');
let shuffledQuestion, currentQuestionIndex;
let number;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', ()=>{
    currentQuestionIndex++;
    setNextQuestion();
})
resultButton.addEventListener('click', viewResult);

function startGame()
{
    resultText.classList.add('hide');
    resultButton.classList.add('hide');
    document.body.classList.remove('wrong');
    document.body.classList.remove('correct');
    startButton.classList.add('hide');
    shuffledQuestion=question;
    currentQuestionIndex=0;
    number=0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion()
{
    resetState();
    showQuestion(shuffledQuestion[currentQuestionIndex]);
}

function showQuestion(question)
{
    questionElement.innerText=question.question;
    question.answer.forEach(answer=>{
        const button=document.createElement('button');
        button.innerText=answer.text;
        button.classList.add('btn');
        if (answer.correct)
            button.dataset.correct=answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtonElement.appendChild(button);
    })
}

function resetState()
{
    nextButton.classList.add('hide');
    while(answerButtonElement.firstChild)
    {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct);
        button.classList.remove('btn');
        button.classList.add('hover-effect');
    })

    if (shuffledQuestion.length > currentQuestionIndex+1)
        nextButton.classList.remove('hide');
    else
    {
        startButton.innerText="Restart";
        startButton.classList.remove('hide');
        resultButton.classList.remove('hide');
    }
}


function viewResult()
{
    resetState();
    questionContainerElement.classList.add('hide');
    startButton.classList.add('hide');
    resultButton.classList.add('hide');
    document.body.classList.remove('wrong');
    document.body.classList.remove('correct');
    resultText.classList.remove('hide');
    resultText.innerHTML= "Result: " + (number-3) + "/" +question.length;
    startButton.classList.remove('hide');
}

function setStatusClass(element, correct)
{
    clearStatusClass(element);
    if (correct)
    {
        number++;
        element.classList.add('correct');
    }
    else
    {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element)
{
    element.classList.remove('wrong');
    element.classList.remove('correct');
}











const question=[
    {
        question:'Which team is the champion of La Liga 2020/2021?',
        answer:[
            {text: 'Aletico Madrid', correct: true},
            {text: 'Real Madrid', correct: false},
            {text: 'Barcelona', correct: false},
            {text: 'Sevilla', correct: false}
        ]
    },


    {
        question:'Which team is the champion of Serie A 2020/2021? ',
        answer:[
            {text: 'Juventus', correct: false},
            {text: 'AC Milan', correct: false},
            {text: 'Inter Milan', correct: true},
            {text: 'Atalanta', correct: false}
        ]
    },


    {
        question:'Which team is the champion of EPL 2020/2021? ?',
        answer:[
            {text: 'Manchester United', correct: false},
            {text: 'Chelsea', correct: false},
            {text: 'Manchester City', correct: true},
            {text: 'Arsenal', correct: false}
        ]
    },

]

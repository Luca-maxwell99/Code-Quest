const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questionsHTML = [
    {
        question: 'Which of the following HTML elements is used to define the navigation links in a webpage?',
        choice1: '<nav></nav>',
        choice2: '<links>',
        choice3: '<header>',
        choice4: '<section>',
        answer: 1,
    },
    {
        question: 'Which HTML tag is used to define a form for user input?',
        choice1: '<form>',
        choice2: '<inpuit>',
        choice3: '<fieldset>',
        choice4: '<label>',
        answer: 1,
    },
    {
        question: 'Which attribute must be added to an HTML <iframe> tag to make it responsive (resize based on screen size)?',
        choice1: 'src',
        choice2: 'width and height',
        choice3: 'frameborder',
        choice4: 'allowfullscreen',
        answer: 2,
    },
    {
        question: 'What is the purpose of the alt attribute in an <img> tag?',
        choice1: 'It provides a title for the image.',
        choice2: 'It defines the image's width and height.',
        choice3: 'It provides an alternative text description for the image if it cannot be displayed.',
        choice4: 'It links to a different image if the current image is unavailable.',
        answer: 3,
    },
    {
        question: 'Which HTML element is used to define the header of a section or page?',
        choice1: '<head>',
        choice2: '<header>',
        choice3: '<section>',
        choice4: '<h1>',
        answer: 2,
    },
    {
        question: 'How can you make a list of links that are displayed horizontally (side by side) instead of vertically?',
        choice1: 'By using the <ul> tag.',
        choice2: 'By using the <ol> tag.',
        choice3: 'By setting display: inline or display: inline-block on the list items (<li>).',
        choice4: 'By using the <link> tag.',
        answer: 3,
    },
    {
        question: 'Which of the following tags is used to embed an external JavaScript file in an HTML document?',
        choice1: '<js>',
        choice2: '<script src="filename.js"></script>',
        choice3: '<javascript src="filename.js"></javascript>',
        choice4: '<link rel="script" href="filename.js">',
        answer: 2,
    },
    {
        question: 'In HTML5, which of the following elements is used to define a section of navigation links?',
        choice1: '<navigation>',
        choice2: '<nav>',
        choice3: '<links>',
        choice4: '<section>',
        answer: 2,
    },
    {
        question: 'What is the correct HTML5 element to use for defining a footer for a webpage?',
        choice1: '<footer>',
        choice2: '<bottom>',
        choice3: '<end>',
        choice4: '<section>',
        answer: 1,
    },
    {
        question: 'What is the default value of the display property for a <div> element in HTML?',
        choice1: 'inline',
        choice2: 'block',
        choice3: 'inline-block',
        choice4: 'none',
        answer: 2,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questionsHTML]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
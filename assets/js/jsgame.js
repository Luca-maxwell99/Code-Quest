document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("progress-bar");
    const questionElement = document.getElementById("question");
    const answerContainers = document.querySelectorAll(".answer-container");
    const nextButton = document.querySelector(".next-button");
    const backButton = document.querySelector(".back-button");

    const questions = [
        {
            question: "Which of the following is the correct way to declare a constant in JavaScript?",
            options: [
                "const x = 10;",
                "let x = 10;",
                "var x = 10;",
                "constant x = 10;"
            ],
            correctAnswer: 0,
        },
        {
            question: "What is the output of the following code? console.log(2 + '2');",
            options: ["22", "4", "NaN", "undefined"],
            correctAnswer: 0,
        },
        {
            question: "Which of the following methods can be used to add an item to the end of an array in JavaScript?",
            options: ["push()", "pop()", "shift()", "unshift()"],
            correctAnswer: 0,
        },
        {
            question: "What is the purpose of the JSON.stringify() method in JavaScript?",
            options: [
                "It converts a JavaScript object into a JSON string.",
                "It converts a JSON string into a JavaScript object.",
                "It parses a string into a number.",
                "It adds properties to a JSON object.",
            ],
            correctAnswer: 0,
        },
        {
            question: "Which of the following is a correct way to create a function in JavaScript?",
            options: [
                "function myFunc() {}",
                "func myFunc() {}",
                "create function myFunc() {}",
                "def myFunc() {}",                
            ],
            correctAnswer: 0,
        },
        {
            question: "What is the output of the following code? console.log(5 == '5');",
            options: [
                "true",
                "false",
                "undefined",
                "NaN",
            ],
            correctAnswer: 0,
        },
        {
            question: "Which operator is used to compare both value and type in JavaScrip?",
            options: [
                "==",
                "=",
                "===",
                "!=",
            ],
            correctAnswer: 2,
        },
        {
            question: "Which of the following methods is used to parse a string and convert it into an integer in JavaScript",
            options: ["parseInteger()", "parseFloat()", "parseInt()", "toInteger()"],
            correctAnswer: 2,
        },
        {
            question: "What does the this keyword refer to in JavaScript?",
            options: [
                "The function itself.",
                "The global object.",
                "The current object or context in which the function is called.",
                "A reference to the parent element."
            ],
            correctAnswer: 2,
        },
        {
            question: "Which of the following is a correct way to handle errors in JavaScript?",
            options: ["catch(error)", "try-catch", "throw", "error-handling"],
            correctAnswer: 1,
        },
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;

        answerContainers.forEach((container, index) => {
            const option = container.querySelector(".answer-option");
            container.classList.remove("correct", "incorrect");
            container.style.pointerEvents = "auto";
            option.textContent = currentQuestion.options[index];

            container.removeEventListener("click", handleContainerClick);
            container.addEventListener("click", () => handleContainerClick(index));
        });

        updateProgressBar();
    }

    function handleContainerClick(selectedIndex) {
        const currentQuestion = questions[currentQuestionIndex];
        const correctIndex = currentQuestion.correctAnswer;

        answerContainers.forEach((container, index) => {
            if (index === correctIndex) {
                container.classList.add("correct");
            } else if (index === selectedIndex) {
                container.classList.add("incorrect");
            }
        });

        if (selectedIndex === correctIndex) {
            score++;
        }

        answerContainers.forEach(container => (container.style.pointerEvents = "none"));
    }

    nextButton.addEventListener("click", () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            localStorage.setItem("quizScore", score);
            localStorage.setItem("totalQuestions", questions.length);
            window.location.href = "results.html"; // Redirect to results page
        }
    });

    backButton.addEventListener("click", () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    });

    // Initialize quiz with the first question and progress bar
    loadQuestion();
});

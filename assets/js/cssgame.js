document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("progress-bar");
    const questionElement = document.getElementById("question");
    const answerContainers = document.querySelectorAll(".answer-container");
    const nextButton = document.querySelector(".next-button");
    const backButton = document.querySelector(".back-button");

    const questions = [
        {
            question: "Which CSS property is used to change the text color of an element?",
            options: ["color", "font-color", "text-color", "background-color"],
            correctAnswer: 0,
        },
        {
            question: "Which CSS property is used to change the font size of an element?",
            options: ["text-size", "font-size", "size", "text-style"],
            correctAnswer: 1,
        },
        {
            question: "Which of the following CSS selectors is used to select all elements of a particular class?",
            options: ["#class", ".class", "*class", "class"],
            correctAnswer: 1,
        },
        {
            question: "How do you add a border to an element in CSS",
            options: [
                "border: 1px solid black;",
                "border-style: solid;",
                "border-width: 1px;",
                "border-color: black;",
            ],
            correctAnswer: 0,
        },
        {
            question: "Which property is used to change the background color of an element?",
            options: ["bg-color", "background-color", "color", "background"],
            correctAnswer: 1,
        },
        {
            question: "What does the z-index property in CSS control?",
            options: [
                "The order of elements in the DOM",
                "The transparency of an element",
                "The stacking order of elements",
                "The padding of an element",
            ],
            correctAnswer: 2,
        },
        {
            question: "What is the default value of the position property in CSS?",
            options: [
                "absolute",
                "relative",
                "static",
                "fixed",
            ],
            correctAnswer: 2,
        },
        {
            question: "How do you make a webpage responsive using CSS?",
            options: [
                "By using @media queries",
                "By using fixed pixel values",
                "By using position: relative",
                "By setting a specific width for each element",
            ],
            correctAnswer: 0,
        },
        {
            question: "Which property is used to create space between an element's content and its border?",
            options: ["margin", "padding", "border-spacing", "space"],
            correctAnswer: 1,
        },
        {
            question: "Which of the following properties can be used to change the alignment of text in CSS?",
            options: ["text-align", "align-text", "text-align-center", "vertical-align"],
            correctAnswer: 0,
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

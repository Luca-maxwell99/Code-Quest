document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("progress-bar");
    const questionElement = document.getElementById("question");
    const answerContainers = document.querySelectorAll(".answer-container");
    const nextButton = document.querySelector(".next-button");
    const backButton = document.querySelector(".back-button");

    const questions = [
        {
            question: "Which of the following HTML elements is used to define the navigation links in a webpage?",
            options: ["<nav>", "<links>", "<header>", "<section>"],
            correctAnswer: 0,
        },
        {
            question: "Which HTML tag is used to define a form for user input?",
            options: ["<form>", "<input>", "<fieldset>", "<label>"],
            correctAnswer: 0,
        },
        {
            question: "Which attribute must be added to an HTML <iframe> tag to make it responsive (resize based on screen size)?",
            options: ["src", "width and height", "frameborder", "allowfullscreen"],
            correctAnswer: 1,
        },
        {
            question: "What is the purpose of the alt attribute in an <img> tag?",
            options: [
                "It provides a title for the image.",
                "It defines the image's width and height.",
                "It provides an alternative text description for the image if it cannot be displayed.",
                "It links to a different image if the current image is unavailable.",
            ],
            correctAnswer: 2,
        },
        {
            question: "Which HTML element is used to define the header of a section or page?",
            options: ["<head>", "<header>", "<section>", "<h1>"],
            correctAnswer: 1,
        },
        {
            question: "How can you make a list of links that are displayed horizontally (side by side) instead of vertically?",
            options: [
                "By using the <ul> tag.",
                "By using the <ol> tag.",
                "By setting display: inline or display: inline-block on the list items (<li>).",
                "By using the <link> tag.",
            ],
            correctAnswer: 2,
        },
        {
            question: "Which of the following tags is used to embed an external JavaScript file in an HTML document?",
            options: [
                "<js>",
                "<script src='filename.js'></script>",
                "<javascript src='filename.js'></javascript>",
                "<link rel='script' href='filename.js'>",
            ],
            correctAnswer: 1,
        },
        {
            question: "In HTML5, which of the following elements is used to define a section of navigation links?",
            options: ["<navigation>", "<nav>", "<links>", "<section>"],
            correctAnswer: 1,
        },
        {
            question: "What is the correct HTML5 element to use for defining a footer for a webpage?",
            options: ["<footer>", "<bottom>", "<end>", "<section>"],
            correctAnswer: 0,
        },
        {
            question: "What is the default value of the display property for a <div> element in HTML?",
            options: ["inline", "block", "inline-block", "none"],
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

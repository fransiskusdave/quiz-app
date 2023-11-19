const questions = [
  {
    question: "Siapa presiden pertama Indonesia ?",
    answers: [
      { text: "Joko Widodo", correct: false },
      { text: "Soekarno", correct: true },
      { text: "Soeharto", correct: false },
      { text: "Susilo Bambang Yudhoyono", correct: false },
    ],
  },
  {
    question: "Sungai terpanjang di Indonesia ?",
    answers: [
      { text: "Sungai Kapuas", correct: true },
      { text: "Sungai Musi", correct: false },
      { text: "Sungai Barito", correct: false },
      { text: "Sungai Digul", correct: false },
    ],
  },
  {
    question: "Siapa bapak pendidikan Indonesia ?",
    answers: [
      { text: "Jendral Sudirman", correct: false },
      { text: "Bung Tomo", correct: false },
      { text: "Ki Hajar Dewantara", correct: true },
      { text: "R.A. Kartini", correct: false },
    ],
  },
  {
    question: "Benua terluas adalah ?",
    answers: [
      { text: "Afrika", correct: false },
      { text: "Eropa", correct: false },
      { text: "Australia", correct: false },
      { text: "Asia", correct: true },
    ],
  },
  {
    question: "Siapa penjahit bendera merah Indonesia ?",
    answers: [
      { text: "Muhammad Hatta", correct: false },
      { text: "Soekarno", correct: false },
      { text: "Fatmawati", correct: true },
      { text: "Sayuti Malik", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.querySelector(".answer-button");
const nextButton = document.querySelector(".next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerText = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("button");
    answerButtons.append(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", function (e) {
      const selectedButton = e.target;
      const isCorrect = selectedButton.dataset.correct === "true";
      if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
      } else {
        selectedButton.classList.add("incorrect");
      }

      Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }
        button.disabled = true;
      });
      nextButton.style.display = "block";
    });
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function showScore() {
  resetState();
  questionElement.innerText = `Kamu mendapatkan score ${score} dari ${questions.length} pertanyaan!`;
  nextButton.innerText = "Bermain Lagi";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();

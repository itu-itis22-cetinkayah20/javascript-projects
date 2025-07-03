// Question Constructor
function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.checkAnswer = function (answer) {
  return this.answer === answer;
};

// Quiz Constructor
function Quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.questionIndex = 0;
  this.userAnswers = [];
}

Quiz.prototype.getQuestion = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.isFinish = function () {
  return this.questions.length === this.questionIndex;
};

Quiz.prototype.guess = function (answer) {
  var question = this.getQuestion();
  this.userAnswers.push({
    question: question.text,
    userAnswer: answer,
    correctAnswer: question.answer,
    isCorrect: question.checkAnswer(answer),
  });

  if (question.checkAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
};

// Quiz Questions
var q1 = new Question(
  "JavaScript hangi yılda oluşturuldu?",
  ["1994", "1995", "1996", "1997"],
  "1995"
);

var q2 = new Question(
  "Hangisi JavaScript'te bir veri tipi değildir?",
  ["String", "Boolean", "Integer", "Number"],
  "Integer"
);

var q3 = new Question(
  "JavaScript'te fonksiyon tanımlamak için hangi anahtar kelime kullanılır?",
  ["function", "def", "func", "method"],
  "function"
);

var questions = [q1, q2, q3];

// Quiz App Class
class QuizApp {
  constructor() {
    this.quiz = new Quiz(questions);
    this.currentQuestionElement = document.getElementById("current-question");
    this.totalQuestionsElement = document.getElementById("total-questions");
    this.questionTextElement = document.getElementById("question-text");
    this.choicesElement = document.getElementById("choices");
    this.nextButton = document.getElementById("next-btn");
    this.progressBar = document.getElementById("progress-bar");
    this.quizQuestion = document.getElementById("quiz-question");
    this.quizResults = document.getElementById("quiz-results");
    this.finalScoreElement = document.getElementById("final-score");
    this.answersReviewElement = document.getElementById("answers-review");
    this.restartButton = document.getElementById("restart-btn");

    this.selectedAnswer = null;
    this.init();
  }

  init() {
    this.totalQuestionsElement.textContent = this.quiz.questions.length;
    this.setupEventListeners();
    this.loadQuestion();
  }

  setupEventListeners() {
    this.nextButton.addEventListener("click", () => {
      this.handleNextQuestion();
    });

    this.restartButton.addEventListener("click", () => {
      this.restartQuiz();
    });
  }

  loadQuestion() {
    if (this.quiz.isFinish()) {
      this.showResults();
      return;
    }

    const question = this.quiz.getQuestion();
    this.currentQuestionElement.textContent = this.quiz.questionIndex + 1;
    this.questionTextElement.textContent = question.text;

    // Update progress bar
    const progress =
      (this.quiz.questionIndex / this.quiz.questions.length) * 100;
    this.progressBar.style.width = progress + "%";

    // Clear previous choices
    this.choicesElement.innerHTML = "";
    this.selectedAnswer = null;
    this.nextButton.style.display = "none";

    // Create choice buttons
    question.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.className = "btn choice-btn";
      button.textContent = choice;
      button.addEventListener("click", () => {
        this.selectAnswer(choice, button);
      });
      this.choicesElement.appendChild(button);
    });
  }

  selectAnswer(answer, buttonElement) {
    // Remove previous selections
    document.querySelectorAll(".choice-btn").forEach((btn) => {
      btn.classList.remove("selected");
      btn.disabled = false;
    });

    // Mark selected answer
    buttonElement.classList.add("selected");
    this.selectedAnswer = answer;

    // Show correct/wrong answers
    this.showAnswerResults();

    // Show next button
    this.nextButton.style.display = "block";
  }

  showAnswerResults() {
    const correctAnswer = this.quiz.getQuestion().answer;

    document.querySelectorAll(".choice-btn").forEach((btn) => {
      btn.disabled = true;

      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      } else if (
        btn.textContent === this.selectedAnswer &&
        btn.textContent !== correctAnswer
      ) {
        btn.classList.add("wrong");
      }
    });
  }

  handleNextQuestion() {
    if (this.selectedAnswer) {
      this.quiz.guess(this.selectedAnswer);
      this.loadQuestion();
    }
  }

  showResults() {
    this.quizQuestion.style.display = "none";
    this.quizResults.style.display = "block";

    // Update progress bar to 100%
    this.progressBar.style.width = "100%";

    // Show final score
    this.finalScoreElement.textContent = `${this.quiz.score}/${this.quiz.questions.length}`;

    // Show detailed results
    this.showDetailedResults();
  }

  showDetailedResults() {
    this.answersReviewElement.innerHTML = "";

    this.quiz.userAnswers.forEach((answer, index) => {
      const reviewItem = document.createElement("div");
      reviewItem.className = "answer-review-item";

      const userAnswerClass = answer.isCorrect
        ? "correct-answer"
        : "wrong-answer";

      reviewItem.innerHTML = `
        <h6>Soru ${index + 1}: ${answer.question}</h6>
        <p class="user-answer">Sizin Cevabınız: <span class="${userAnswerClass}">${
        answer.userAnswer
      }</span></p>
        <p class="correct-answer">Doğru Cevap: <span>${
          answer.correctAnswer
        }</span></p>
      `;

      this.answersReviewElement.appendChild(reviewItem);
    });
  }

  restartQuiz() {
    this.quiz = new Quiz(questions);
    this.quizQuestion.style.display = "block";
    this.quizResults.style.display = "none";
    this.loadQuestion();
  }
}

// Start the quiz when page loads
document.addEventListener("DOMContentLoaded", () => {
  new QuizApp();
});

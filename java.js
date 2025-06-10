
const quizData = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Rome"],
      answer: "Paris"
    },
    {
      question: "Who wrote 'Harry Potter'?",
      options: ["J.R.R. Tolkien", "J.K. Rowling", "Stephen King", "George R.R. Martin"],
      answer: "J.K. Rowling"
    },
    {
        question: "what is the biggest animal in the world?",
        options: ["Lion" , "Elephant" , "Blue whale" , "Tiger"],
        answer: "Blue whale"
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let timerSeconds = 60; 
  

  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const nextButton = document.getElementById('next-btn');
  const timerElement = document.getElementById('time');
  const scoreElement = document.getElementById('score-value');
  

  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    
    optionsElement.innerHTML = '';
  
    // Create new options
    currentQuestion.options.forEach(option => {
      const optionButton = document.createElement('button');
      optionButton.textContent = option;
      optionButton.classList.add('option');
      optionButton.addEventListener('click', () => selectAnswer(option));
      optionsElement.appendChild(optionButton);
    });
  }
  
  // Function to handle answer selection
  function selectAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
  
    if (selectedOption === currentQuestion.answer) {
      score++;
      scoreElement.textContent = score;
    }
  
    // Disable all options after selection
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => {
      button.disabled = true;
      if (button.textContent === currentQuestion.answer) {
        button.style.backgroundColor = '#4CAF50'; // Highlight correct answer
      } else {
        button.style.backgroundColor = '#f44336'; // Highlight wrong answers
      }
    });
  
    // Enable Next button
    nextButton.disabled = false;
  }
  
  // Function to handle next question
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
      resetOptions();
      nextButton.disabled = true;
    } else {
      // Quiz ended
      endQuiz();
    }
  }
  
  // Function to reset options style
  function resetOptions() {
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => {
      button.disabled = false;
      button.style.backgroundColor = ''; // Reset background color
    });
  }
  
  // Function to end the quiz
  function endQuiz() {
    clearInterval(timerInterval);
    alert(`Quiz Ended!\nYour Score: ${score}`);
    // Optionally, save high score using localStorage or send to server
  }
  
  // Function to update timer display
  function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerElement.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  
  // Initialize quiz
  loadQuestion();
  
  // Timer functionality
  updateTimerDisplay(timerSeconds);
  const timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerDisplay(timerSeconds);
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
  
  // Event listeners
  nextButton.addEventListener('click', nextQuestion);
  
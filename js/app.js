const inputField = document.querySelector(".input-field");
const typingInput = document.querySelector(".typing-input");
const hint = document.querySelector(".hints span");
const remainingAttempts = document.querySelector(".attempts span");
const wrongLetter = document.querySelector(".wrong span");
const btnNext = document.querySelector(".btn-next");

let word;
let incorrectWord = [];
let correctWord = [];
let totalAttempts;

function randomWord() {
  let randObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = randObj.word;
  totalAttempts = 6;
  incorrectWord = [];
  correctWord = [];
  hint.innerText = randObj.hint;
  remainingAttempts.innerText = totalAttempts;
  wrongLetter.innerText = incorrectWord;

  let quiz = "";
  for (let i = 0; i < word.length; i++) {
    quiz += `<input type="text" disabled>`;
  }
  inputField.innerHTML = quiz;
}
randomWord();

function startGame(evt) {
  let key = evt.target.value;
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrectWord.includes(` ${key}`) &&
    !correctWord.includes(key)
  ) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          correctWord.push(key);
          inputField.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      totalAttempts--;
      incorrectWord.push(` ${key}`);
    }
    remainingAttempts.innerText = totalAttempts;
    wrongLetter.innerText = incorrectWord;
  }
  typingInput.value = "";

  setTimeout(() => {
    if (correctWord.length === word.length) {
      alert("Well done, you have found the correct word!");
      randomWord();
    } else if (totalAttempts < 1) {
      alert("Game Over! You do not have any remaining attempts");
      for (let i = 0; i < word.length; i++) {
        inputField.querySelectorAll("input")[i].value = word[i];
      }
    }
  }, 500);
}

btnNext.addEventListener("click", randomWord);
typingInput.addEventListener("input", startGame);
inputField.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());


var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
];

// Get DOM elements
const wordToGuessElem = document.getElementById("word-to-guess");
const previousWordElem = document.getElementById("previous-word");
const incorrectLettersElem = document.getElementById("incorrect-letters");
const remainingGuessesElem = document.getElementById("remaining-guesses");
const winsElem = document.getElementById("wins");
const lossesElem = document.getElementById("losses");

// Initial game state
let currentWord = '';
let displayedWord = '';
let incorrectGuesses = [];
let remainingGuesses = 10;
let wins = 0;
let losses = 0;

// Function to start a new round
function startNewRound() {
  // Choose a random word from the array
  currentWord = words[Math.floor(Math.random() * words.length)];
  
  // Set the displayed word with underscores
  displayedWord = '_'.repeat(currentWord.length);
  
  // Reset incorrect guesses and remaining guesses
  incorrectGuesses = [];
  remainingGuesses = 10;
  
  // Update the display elements
  wordToGuessElem.textContent = displayedWord;
  incorrectLettersElem.textContent = '';
  remainingGuessesElem.textContent = remainingGuesses;
  
  // Update wins and losses display
  winsElem.textContent = wins;
  lossesElem.textContent = losses;
  previousWordElem.textContent = '';  // Clear previous word
}

// Function to handle a guess
function handleGuess(letter) {
  if (remainingGuesses <= 0 || displayedWord === currentWord) return; // No more guesses or game won
  
  // Check if the letter is already guessed (either correct or incorrect)
  if (incorrectGuesses.includes(letter) || displayedWord.includes(letter)) return;
  
  // Check if the letter is in the word
  let correctGuess = false;
  let newDisplayedWord = '';
  
  // Update displayed word based on the guess
  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i] === letter) {
      newDisplayedWord += letter;
      correctGuess = true;
    } else {
      newDisplayedWord += displayedWord[i];
    }
  }
  
  // If correct, update the word, else add the letter to incorrect guesses
  if (correctGuess) {
    displayedWord = newDisplayedWord;
  } else {
    incorrectGuesses.push(letter);
    remainingGuesses--;
  }
  
  // Update the displayed elements
  wordToGuessElem.textContent = displayedWord;
  incorrectLettersElem.textContent = incorrectGuesses.join(', ');
  remainingGuessesElem.textContent = remainingGuesses;
  
  // Check if the player won or lost
  if (displayedWord === currentWord) {
    wins++;
    previousWordElem.textContent = currentWord; // Display the previous word after win
    setTimeout(startNewRound, 1000); // Start a new round after a short delay
  } else if (remainingGuesses <= 0) {
    losses++;
    previousWordElem.textContent = currentWord; // Display the previous word after loss
    setTimeout(startNewRound, 1000); // Start a new round after a short delay
  }
}

// Start the first round when the page loads
startNewRound();

// Listen for key presses
document.addEventListener('keydown', function(event) {
  const letter = event.key.toLowerCase();
  if (/^[a-z]$/.test(letter)) {
    handleGuess(letter);
  }
});

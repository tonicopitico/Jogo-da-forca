/*----------LISTAS DE PALAVRAS E TEMAS----------*/
var animal = [
  "Elefante",
  "Girafa",
  "Tigre",
  "Pinguim",
  "Borboleta",
  "Leão",
  "Cachorro",
  "Gato",
  "Hipopótamo",
  "Crocodilo",
  "Panda",
  "Gorila",
  "Zebra",
  "Cavalo",
  "Cobra",
  "Águia",
  "Orangotango",
  "Papagaio",
  "Tubarão",
  "Aranha",
  "Rinoceronte",
  "Coala",
  "Polvo",
  "Serpente",
  "Vaca",
  "Macaco",
  "Urso Polar",
  "Golfinho",
  "Esquilo",
  "Caranguejo",
];
var city = [
  "Nova York",
  "Londres",
  "Tóquio",
  "Paris",
  "Roma",
  "Sydney",
  "Rio de Janeiro",
  "Istambul",
  "Moscou",
  "Berlim",
  "Toronto",
  "Dubai",
  "Bangkok",
  "Los Angeles",
  "Dubai",
  "Amsterdã",
  "Singapura",
  "San Francisco",
  "Rio de Janeiro",
  "Barcelona",
  "Viena",
  "Atenas",
  "Chicago",
  "Hong Kong",
];
var famous = [
  "Tom Hanks",
  "Beyoncé",
  "Leonardo DiCaprio",
  "Oprah",
  "David Beckham",
  "Taylor Swift",
  "Brad Pitt",
  "Angelina Jolie",
  "Cristiano Ronaldo",
  "Adele",
  "Will Smith",
  "Jennifer Lopez",
  "Dwayne Johnson",
  "Kim Kardashian",
  "Kanye West",
  "Emma Watson",
  "Justin Bieber",
  "Rihanna",
  "Katy Perry",
  "Johnny Depp",
  "Scarlett Johansson",
  "Robert Downey Jr",
  "Lady Gaga",
  "Elon Musk",
  "Bill Gates",
];
var food = [
  "Maçã",
  "Banana",
  "Morango",
  "Abacaxi",
  "Cenoura",
  "Brócolis",
  "Arroz",
  "Macarrão",
  "Sushi",
  "Hambúrguer",
  "Pizza",
  "Chocolate",
  "Sorvete",
  "Queijo",
  "Leite",
  "Café",
  "Mel",
  "Pão",
  "Peixe",
  "Frango",
  "Ovo",
  "Salada",
  "Batata",
  "Tomate",
  "Uva",
  "Nozes",
  "Bacon",
  "Azeite",
  "Alface",
  "Pêssego",
];
var lists = [animal, city, famous, food];

/*-----------ESCOLHER TEMA E PALAVRA-----------*/
var index = Math.floor(Math.random() * 4);
var chosenTheme = lists[index];
var word = chosenTheme[Math.floor(Math.random() * chosenTheme.length)];
var theme = getTheme();

function getTheme() {
  if (index == 0) {
    return "Animal";
  } else if (index == 1) {
    return "Cidade";
  } else if (index == 2) {
    return "Famoso(a)";
  } else if (index == 3) {
    return "Comida";
  }
}

/*-----------ELEMENTOS DO DOCUMENTO-----------*/
const text_theme = document.getElementById("hintText");
const text_word = document.getElementById("word");
const text_triedChars = document.getElementById("userTries");
const text_triesLeft = document.getElementById("triesLeft");
const text_charCount = document.getElementById("charCount");
const text_warning = document.getElementById("warning");
const button_send = document.getElementById("guessButton");
const input_input = document.getElementById("playerInput");
var myInput = input_input.value;

const regex = /^[a-zA-Z]+$/;
const regexCompost = /[áéíóúÁÉÍÓÚãõÃÕâêîôûÂÊÎÔÛàèìòùÀÈÌÒÙçÇ]/;

const initialHealth = 5;

var underlinedWord = [];
var normalizedWord = [];
var triedChars = [];
var charactersCount = 0;
var playerHealth = initialHealth;

/*===========================================FUNCTIONS===========================================*/
start();

console.log(`O tema é: ${theme}`);
console.log(word);

function start() {
  playerHealth = initialHealth;

  wordToUnderline();
  normalizeWord();

  changeTextContent(text_theme, `O tema é: ${theme}`);
  changeTextContent(text_word, underlinedWord.join(""));
  changeTextContent(text_charCount, ` ${charactersCount} letras`);
  changeTextContent(
    text_triesLeft,
    `Você tem ${playerHealth} tentativas restantes`
  );
}

function normalizeWord() {
  normalizedWord = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function enterKeyDown(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getInputValue();
    receiveInput();
  }
}

/*===========================POSSIBLE ANSWERS===========================*/

function answerIs() {
  if (
    normalizedWord.toLowerCase().includes(myInput.toLowerCase()) &&
    regex.test(myInput) == true &&
    myInput.length == 1
  ) {
    return "correct";
  } else if (regex.test(myInput) != true || myInput.length != 1) {
    return "invalid";
  } else {
    return "wrong";
  }
}

/*=====================POSSIBLE ANSWERS (FUNCTIONS)=====================*/

function wrongAnswer() {
  console.log("wrongAnswer()");
  changeTextContent(text_warning, "Errou!");
  damagePlayer(1);
  addTriedCharacter();
}

function alreadyTriedThisCharacter() {
  changeTextContent(text_warning, "Você já tentou essa letra...");
}

function invalidAnswer() {
  console.log("invalidAnswer()");
  changeTextContent(text_warning, "Insira uma letra válida!");
}

function correctAnswer(index) {
  console.log("correct answer()");
  underlinedWord[index] = word[index];
  changeTextContent(text_word, underlinedWord.join(""));
  changeTextContent(text_warning, "");
  addTriedCharacter();
  if (underlinedWord.includes("_") != true) {
    playerWon();
  }
}

/*=================================INPUT================================*/

function getInputValue() {
  myInput = input_input.value;
}

function receiveInput() {
  getInputValue();
  if (triedChars.includes(myInput.toUpperCase()) == true) {
    alreadyTriedThisCharacter();
    return;
  }
  if (answerIs() == "correct") {
    for (let i = 0; i < word.length; i++) {
      if (myInput.toLowerCase() == normalizedWord[i].toLowerCase()) {
        correctAnswer(i);
      }
    }
  } else if (answerIs() == "invalid") {
    //myInput is not a single alphabetical character
    invalidAnswer();
  } else {
    //myInput is wrong
    wrongAnswer();
  }
  input_input.value = "";
}

function testCharacters(index) {}

function wordToUnderline() {
  for (let i = 0; i < word.length; i++) {
    if (word[i] !== " ") {
      underlinedWord.push("_");
      normalizedWord.push(word[i]);
      charactersCount++;
    } else {
      underlinedWord.push(" ");
    }
  }
}

function changeTextContent(text_box, content) {
  text_box.textContent = content;
}

function damagePlayer(damage) {
  if (playerHealth == 1) {
    playerHealth -= damage;
    playerLost();
  } else {
    playerHealth -= damage;
    changeTextContent(
      text_triesLeft,
      `Você tem ${playerHealth} tentativas restantes`
    );
  }
}

function addTriedCharacter() {
  if (triedChars.includes(myInput.toUpperCase())) {
    return;
  } else {
    triedChars.push(myInput.toUpperCase());
    changeTextContent(
      text_triedChars,
      `Você já tentou: ${triedChars.join(", ")}`
    );
  }
}

function playerWon() {
  changeTextContent(text_triedChars, "PARABÉNS, VOCÊ VENCEU!!");
  button_send.disabled = true;
  input_input.disabled = true;
}

function playerLost() {
  changeTextContent(text_triedChars, "VOCÊ PERDEU!!");
  changeTextContent(text_warning, `A palavra era ${word}`);
  changeTextContent(
    text_triesLeft,
    `Você tem ${playerHealth} tentativas restantes`
  );
  button_send.disabled = true;
  input_input.disabled = true;
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

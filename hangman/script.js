const word_el = document.getElementById("word");
const popup = document.getElementById("popup-container");
const message_el = document.getElementById("success-message");
const wrongLettersEl = document.getElementById("wrong-letters-span");
const items = document.querySelectorAll(".item");
const playAgainBtn = document.getElementById("play-again");

let selectedWord = "";
const correctLetters = [];
const wrongLetters = [];

function getRandomWord() {
  const words = ["javascript", "java", "python"];
  return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
  word_el.innerHTML = ` 
    ${selectedWord
      .split("")
      .map(
        (letter) => `
        <div class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
        </div>`
      )
      .join("")} `;

  const w = word_el.innerText.replace(/\n/g, "");
  if (w === selectedWord) {
    popup.style.display = "flex";
    popup.querySelector(".popup").className = "popup win";
    message_el.innerText = "Tebrikler kazandınız!";
  }
}

function updateWrongLetters() {
  wrongLettersEl.innerHTML = wrongLetters.join(", ");

  // Yanlış harf sayısına göre adam asmaca parçalarını göster
  items.forEach((item, index) => {
    if (index < wrongLetters.length) {
      item.style.display = "block";
    }
  });

  // 6 yanlış harf = oyun bitti
  if (wrongLetters.length === items.length) {
    popup.style.display = "flex";
    popup.querySelector(".popup").className = "popup lose";
    message_el.innerText = "Kaybettiniz! Kelime: " + selectedWord;
  }
}

function resetGame() {
  // Dizileri temizle
  correctLetters.length = 0;
  wrongLetters.length = 0;

  // Yeni kelime seç
  selectedWord = getRandomWord();

  // Popup'ı gizle
  popup.style.display = "none";
  popup.querySelector(".popup").className = "popup";

  // Adam asmaca parçalarını gizle
  items.forEach((item) => {
    item.style.display = "none";
  });

  // Yanlış harfler listesini temizle
  wrongLettersEl.innerHTML = "";

  // Kelimeyi yeniden göster
  displayWord();
}

// Klavye dinleyicisi
window.addEventListener("keydown", function (e) {
  const letter = e.key.toLowerCase();

  // Sadece harfler kabul et
  if (letter >= "a" && letter <= "z") {
    // Daha önce girilmiş mi kontrol et
    if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
      return;
    }

    // Doğru harf mi kontrol et
    if (selectedWord.includes(letter)) {
      correctLetters.push(letter);
      displayWord();
    } else {
      wrongLetters.push(letter);
      updateWrongLetters();
    }
  }
});

// Tekrar Oyna butonu
playAgainBtn.addEventListener("click", resetGame);

// Oyunu başlat
selectedWord = getRandomWord();
displayWord();

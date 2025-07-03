// UI vars

const form = document.querySelector("form");
const girdi = document.querySelector("#txtGörevİsmi");
const btnHepsiniSil = document.querySelector("#btnHepsiniSil");
const görevListesi = document.querySelector("#görev-listesi");
const btnYeniGörevEkle = document.querySelector("#btnYeniGörevEkle");
let elemanlar;

elemanlarıYükle();

eventListeners();

function elemanlarıYükle() {
  elemanlar = elemanlarıLocalStoragedanAl();

  elemanlar.forEach(function (eleman) {
    itemOluştur(eleman);
  });
}

function elemanlarıLocalStoragedanAl() {
  if (localStorage.getItem("elemanlar") === null) {
    elemanlar = [];
  } else {
    elemanlar = JSON.parse(localStorage.getItem("elemanlar"));
  }
  return elemanlar;
}

function setItemToLocalStorage(text) {
  elemanlar = elemanlarıLocalStoragedanAl();
  elemanlar.push(text);
  localStorage.setItem("elemanlar", JSON.stringify(elemanlar));
}
function itemiLocalStoragedanSil(text) {
  elemanlar = elemanlarıLocalStoragedanAl();
  elemanlar.forEach(function (eleman, index) {
    if (eleman === text) {
      elemanlar.splice(index, 1);
    }
  });
  localStorage.setItem("elemanlar", JSON.stringify(elemanlar));
}
function itemOluştur(text) {
  // create li
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text));

  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';

  // a yı li'ye ekle
  li.appendChild(a);

  // liyi ul'ye ekle
  görevListesi.appendChild(li);
}

function eventListeners() {
  // element submitle
  btnYeniGörevEkle.addEventListener("click", yeniİtemEkle);

  // bir eleman sil
  görevListesi.addEventListener("click", itemSil);

  // tüm elemanları sil
  btnHepsiniSil.addEventListener("click", tümElemanlarıSİl);
}
function yeniİtemEkle(e) {
  if (girdi.value === "") {
    alert("Yeni item ekleyiniz.");
    return;
  }
  // Yeni item ekle
  itemOluştur(girdi.value);

  // Local storagea kaydet
  setItemToLocalStorage(girdi.value);

  // Girdiyi temizle
  girdi.value = "";

  e.preventDefault();
}
function itemSil(e) {
  if (e.target.className === "fas fa-times") {
    if (confirm("Eminmisiniz ?")) {
      e.target.parentElement.parentElement.remove();

      // elemanı local storegadan sil

      itemiLocalStoragedanSil(e.target.parentElement.parentElement.textContent);
    }
  }

  e.preventDefault();
}

function tümElemanlarıSİl(e) {
  if (confirm("Eminmisiniz ?")) {
    görevListesi.innerHTML = "";
  }
  localStorage.clear();

  e.preventDefault();
}

const container = document.querySelector(".container");
const sayı = document.getElementById("sayı");
const miktar = document.getElementById("miktar");
const select = document.getElementById("film");
const koltuklar = document.querySelectorAll(".koltuk");

LocalStoregedanAl();
hesapla();

// Film seçimi değiştiğinde hesaplamayı güncelle
select.addEventListener("change", hesapla);

container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("koltuk") &&
    !e.target.classList.contains("alınmış")
  ) {
    e.target.classList.toggle("seçilmiş");
    hesapla();
  }
});

function hesapla() {
  const seçilmişKoltuklar = container.querySelectorAll(".koltuk.seçilmiş");
  const seçilmişKoltukArr = [];
  const koltukArr = [];

  seçilmişKoltuklar.forEach(function (seat) {
    seçilmişKoltukArr.push(seat);
  });

  koltuklar.forEach(function (seat) {
    koltukArr.push(seat);
  });

  let seçilmişKoltuklarınİndexleri = seçilmişKoltukArr.map(function (seat) {
    return koltukArr.indexOf(seat);
  });

  console.log(seçilmişKoltuklarınİndexleri);

  let seçilmişKoltukSayısı =
    container.querySelectorAll(".koltuk.seçilmiş").length;
  let price = +select.value || 0;

  sayı.innerText = seçilmişKoltukSayısı;
  miktar.innerText = seçilmişKoltukSayısı * price;

  localStorageaKaydet(seçilmişKoltuklarınİndexleri);
}

function localStorageaKaydet(indexs) {
  localStorage.setItem("seçilmişKoltuklar", JSON.stringify(indexs));
  localStorage.setItem("selectedMovieIndex", select.selectedIndex);
}

function LocalStoregedanAl() {
  const selectedSeats = JSON.parse(localStorage.getItem("seçilmişKoltuklar"));
  if (selectedSeats != null && selectedSeats.length > 0) {
    koltuklar.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("seçilmiş");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
  }
}
